const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ msg: 'No token, not authorized' });
  }
};

module.exports = protect;
