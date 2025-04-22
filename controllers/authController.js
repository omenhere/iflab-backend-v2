const { getAslabByNim, createAslab,getAslabById } = require('../models/aslabModel');
const { createUser, getUserByNim, getUserByID } = require('../models/userModel');
const { generateToken, setTokenCookie, verifyToken } = require('../utils/jwtUtils');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { nim, password, name, prodi, mentor } = req.body;

  if (!nim || !password || !name || !prodi || !mentor) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(nim, hashedPassword, name, prodi, mentor);

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.registerAslab = async (req, res) => {
  const { nim, password, name, code } = req.body;

  if (!nim || !password || !name || !code ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createAslab(nim, hashedPassword, name, code);

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.login = async (req, res) => {
  const { nim, password } = req.body;

  if (!nim || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await getUserByNim(nim);
    if (!user) {
      return res.status(401).json({ error: 'NIM not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(user.id);

    setTokenCookie(res, token);

    res.status(200).json({ message: 'Login successful', user: { ...user, role: 'mahasiswa' }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.loginAslab = async (req, res) => {
  const { nim, password } = req.body;

  if (!nim || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await getAslabByNim(nim);
    if (!user) {
      return res.status(401).json({ error: 'NIM not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(user.id);

    setTokenCookie(res, token);

    res.status(200).json({ message: 'Login successful', user: { ...user, role: 'aslab' }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logout successful' });
};

exports.getUserByToken = async (req, res) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];  
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  try {
    const userId = await verifyToken(token);

    // Coba cari user di tabel users
    let user = null;
    let role = 'user';
    try {
      user = await getUserByID(userId);
    } catch (err) {
      // Jika tidak ditemukan, coba cari di tabel as
      // 
      // lab
      try {
        user = await getAslabById(userId);
        role = 'aslab';
      } catch (innerErr) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    res.status(200).json({ message: 'User found', user, role });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message || 'Unauthorized: Invalid token' });
  }
};
