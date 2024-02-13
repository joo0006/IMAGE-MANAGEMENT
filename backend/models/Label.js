const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures that each label has a unique name
  },
});

module.exports = mongoose.model('Label', labelSchema);
