const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; 


exports.generateToken = (userId) => {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' }); 
};

exports.verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, secret); 
    return decoded.userId;  
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

exports.setTokenCookie = (res, token) => {
    res.cookie('jwt', token, {
      httpOnly: true, // Agar cookie tidak bisa diakses oleh JavaScript
      secure: process.env.NODE_ENV === 'production', // Hanya kirimkan cookie jika menggunakan HTTPS
      sameSite: 'Lax', // Agar cookie bisa dikirimkan ke domain lain (cross-site)
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set cookie expired 1 hari
      path: '/', // Cookie berlaku untuk seluruh domain
    });
};
  
