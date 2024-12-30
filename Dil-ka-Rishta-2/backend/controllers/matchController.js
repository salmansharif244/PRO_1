const Profile = require('../models/Profile');

// Function to find matches based on interests, location, gender, and age range
const findMatches = async (userId) => {
  try {
    // Ensure userId is a valid ObjectId
    if (!userId) {
      throw new Error('User  ID is required');
    }

    // Get the user's profile
    const userProfile = await Profile.findOne({ userId });

    if (!userProfile) {
      throw new Error('User  profile not found');
    }

    // Find profiles that match interests, location, gender, and age range
    const matches = await Profile.find({
      userId: { $ne: userId }, // Exclude the current user
      interests: { $in: userProfile.interests }, // Match interests
      location: userProfile.location, // Match location
      gender: userProfile.gender, // Match gender
      preferredGender: userProfile.preferredGender, // Match preferred gender
      birthYear: {
        $gte: new Date().getFullYear() - userProfile.ageRange.max, // Max age
        $lte: new Date().getFullYear() - userProfile.ageRange.min, // Min age
      },
    })
    .populate('userId', 'username') // Populate the username from the User model
    .select('userId interests location gender preferredGender birthYear'); // Select fields to return

    // Map the matches to include the username
    const matchesWithUsernames = matches.map(match => ({
      userId: match.userId._id,
      username: match.userId.username, // Get the username from the populated User model
      interests: match.interests,
      location: match.location,
      gender: match.gender,
      preferredGender: match.preferredGender,
      birthYear: match.birthYear,
    }));

    console.log('Matches found:', matchesWithUsernames); // Log the matches data for debugging
    return matchesWithUsernames;
  } catch (error) {
    console.error('Error in findMatches:', error); // Log the error for debugging
    return []; // Return an empty array in case of error
  }
};

module.exports = { findMatches };