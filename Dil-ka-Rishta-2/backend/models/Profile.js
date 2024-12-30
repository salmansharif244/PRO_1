const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true, // Ensure that userId is required
  },
  bio: {
    type: String,
    default: '', // Default to an empty string
  },
  interests: {
    type: [String],
    default: [], // Default to an empty array
  },
  location: {
    type: String,
    default: '', // Default to an empty string
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'], // Enum for gender options
    default: null, // Default to null if not specified
  },
  preferredGender: {
    type: String,
    enum: ['male', 'female', 'other'], // Enum for preferred gender options
    default: null, // Default to null if not specified
  },
  birthYear: {
    type: Number,
    // Removed required constraint
  },
  ageRange: {
    min: {
      type: Number,
      validate: {
        validator: function(value) {
          // Validation: Check if value is a valid number and non-negative
          return value >= 0;
        },
        message: 'Min age must be a non-negative number',
      },
    },
    max: {
      type: Number,
      validate: {
        validator: function(value) {
          // Validation: Check if value is a valid number and non-negative
          return value >= 0;
        },
        message: 'Max age must be a non-negative number',
      },
    },
  },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Profile', ProfileSchema);