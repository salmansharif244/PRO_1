const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username is required and must be unique
  email: { type: String, required: true, unique: true }, // Email is required and must be unique
  password: { type: String, required: true }, // Password is required
});

// Export the User model
module.exports = mongoose.model('User', UserSchema); // Removed extra space in 'User'
