// backend/routes/labelRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const labelController = require('../controllers/labelController');

// Use authentication middleware for all routes
router.use(authMiddleware.authenticateUser);

// Use authorization middleware for specific routes
router.post('/create', authMiddleware.authorizeUser('admin'), labelController.createLabel);
router.get('/all', labelController.getAllLabels);

// Error handling middleware (handle errors globally)
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = router;
