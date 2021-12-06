const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token fron header
  const token = req.header('x-auth-token');

  //If no token provided
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is denied.' });
  }
};
