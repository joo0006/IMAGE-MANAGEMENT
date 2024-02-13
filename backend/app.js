// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/config');
const imageRoutes = require('./routes/imageRoutes');
const labelRoutes = require('./routes/labelRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/images', imageRoutes);
app.use('/labels', labelRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
