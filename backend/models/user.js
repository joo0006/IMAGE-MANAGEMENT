const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures that each username is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['normal', 'admin'], // Enumerated roles for better validation
    default: 'normal', // Default role is 'normal'
  },
});

// Add a pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    // Hash the password only if it's modified or a new user
    if (!this.isModified('password')) {
      return next();
    }

    // Generate a salt and hash the password with it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace the plaintext password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
