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
  res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
};
