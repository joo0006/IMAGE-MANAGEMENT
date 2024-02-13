const Image = require('../models/Image');
const mongoose = require('mongoose');

exports.uploadImage = async (req, res) => {
  try {
    // Add logic for handling image upload here
    // You might want to save the image to your server or cloud storage
    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.labelImage = async (req, res) => {
  try {
    const { imageId, labelIds } = req.body;

    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Ensure labelIds are valid labels in the database
    const validLabelIds = labelIds.filter((labelId) => mongoose.Types.ObjectId.isValid(labelId));
    image.labels = validLabelIds;

    await image.save();
    res.json({ message: 'Image labeled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    await image.remove();
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

