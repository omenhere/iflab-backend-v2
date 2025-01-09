const bcrypt = require('bcryptjs'); 
const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');  



exports.createUser = async (nim, passwordHash, name, prodi, mentor) => {
  const { data, error } = await supabase
    .from('users')
    .insert([ 
      { nim, password_hash: passwordHash, name, prodi, mentor }
    ])
    .single(); 

  if (error) {
    throw error;
  }
  return data;
};


exports.getUserByNim = async (nim) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('nim', nim) 
    .single(); 

  if (error) {
    throw error;  
  }

  return data;  
};


exports.getUserByID = async (id) => {
  try {

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id) 
      .single();

    if (error) {
      throw new Error('User not found');
    }

    return user;
  } catch (err) {
    throw new Error('Invalid token or token expired');
  }
};


exports.login = async (nim, password) => {
  const user = await exports.getUserByNim(nim);
  if (!user) {
    throw new Error('NIM not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return user; 
};
