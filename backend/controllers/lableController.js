const Label = require('../models/Label');

exports.createLabel = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Label name is required' });
    }

    const existingLabel = await Label.findOne({ name });

    if (existingLabel) {
      return res.status(400).json({ message: 'Label already exists' });
    }

    const newLabel = new Label({ name });
    await newLabel.save();

    res.status(201).json({ message: 'Label created successfully', label: newLabel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllLabels = async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

