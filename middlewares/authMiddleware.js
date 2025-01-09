const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.userId = decoded.id;
    next();
  });
};
