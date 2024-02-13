const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const { checkPermissions } = require('../middleware/permissionMiddleware');

// Example route that requires 'upload' and 'delete' permissions
router.post('/upload-image', authenticateUser, checkPermissions(['upload', 'delete']), (req, res) => {
  // Your route logic here
  res.json({ message: 'Image uploaded successfully' });
});

module.exports = router;
