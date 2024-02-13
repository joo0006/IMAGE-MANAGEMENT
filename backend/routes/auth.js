const express = require('express');
const router = express.Router();
const { login, register } = require('../backend/controllers/authController');
const { body, validationResult } = require('express-validator');

// Validation middleware for registration
const registrationValidation = [
  body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Validation middleware for login
const loginValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/login', loginValidation, handleValidationErrors, login);
router.post('/register', registrationValidation, handleValidationErrors, register);

module.exports = router;
