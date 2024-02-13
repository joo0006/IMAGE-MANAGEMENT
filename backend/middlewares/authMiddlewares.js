const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {  // Add 'async' here
  // Extract the token from the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Fetch user details from the database based on the decoded token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach user information to the request for future use
    req.user = user;

    // Continue to the next middleware or route
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

const authorizeUser = (role) => (req, res, next) => {
  // Check if the user has the required role
  if (req.user && req.user.role === role) {
    // Continue to the next middleware or route
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
  }
};

module.exports = {
  authenticateUser,
  authorizeUser,
};
