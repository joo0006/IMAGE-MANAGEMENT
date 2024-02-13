const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  labels: [{ type: Schema.Types.ObjectId, ref: 'Label' }],
});

// Index on the filename field
imageSchema.index({ filename: 1 });

module.exports = mongoose.model('Image', imageSchema);
