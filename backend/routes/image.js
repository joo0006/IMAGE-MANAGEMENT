// backend/routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const imageController = require('../controllers/imageController');

// Use authentication middleware for all routes
router.use(authMiddleware.authenticateUser);

// Use authorization middleware for specific routes
router.post('/upload', authMiddleware.authorizeUser('admin'), imageController.uploadImage);
router.get('/all', imageController.getAllImages);
router.post('/label', authMiddleware.authorizeUser('user'), imageController.labelImage);
router.delete('/:imageId', authMiddleware.authorizeUser('admin'), imageController.deleteImage);

// Error handling middleware (handle errors globally)
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = router;
