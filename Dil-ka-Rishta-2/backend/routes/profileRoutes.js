const express = require('express');
const Profile = require('../models/Profile');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Create or Update Profile with POST
router.post('/', authMiddleware, async (req, res) => {
    const { bio, interests, location, gender, preferredGender, birthYear, ageRange } = req.body;

    if (!bio || !interests || !location || !gender || !preferredGender || !birthYear || !ageRange) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const profileData = { 
        userId: req.user.id, 
        bio, 
        interests, 
        location, 
        gender, 
        preferredGender,
        birthYear ,
        ageRange
        
    };

    try {
        const profile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            profileData,
            { new: true, upsert: true }
        );
        return res.status(200).json({ success: true, data: profile });
    } catch (error) {
        console.error('Error creating or updating profile:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Update Profile with PUT
router.put('/', authMiddleware, async (req, res) => {
    const { bio, interests, location, gender, preferredGender, birthYear, ageRange } = req.body;

    if (!bio || !interests || !location || !gender || !preferredGender || !birthYear|| !ageRange ) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const profileData = { 
        bio, 
        interests, 
        location, 
        gender, 
        preferredGender, 
        birthYear ,
        ageRange 
         
    };

    try {
        const profile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            profileData,
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        return res.status(200).json({ success: true, data: profile });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Get User Profile
router.get('/', authMiddleware, async (req, res) => { 
    console.log('Fetching profile for user ID:', req.user.id);
    try {
        const profile = await Profile.findOne({ userId: req.user.id }).populate('userId', 'username email');
        
        if (!profile) {
            console.log('Profile not found');
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        console.log('Profile found:', profile);
        return res.status(200).json({ success: true, data: profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Delete User Profile (Optional)
router.delete('/', authMiddleware, async (req, res) => {
    try {
        const deletedProfile = await Profile.findOneAndDelete({ userId: req.user.id });
        if (!deletedProfile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }
        return res.status(200).json({ success: true, message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting profile:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

module.exports = router;