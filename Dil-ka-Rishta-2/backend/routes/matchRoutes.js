const express = require('express');
const { findMatches } = require('../controllers/matchController'); // Ensure this path is correct
const authMiddleware = require('../middleware/auth');

const router = express.Router();


// Get Matches for a specific user
router.get('/:userId', authMiddleware, async (req, res) => {
  console.log('Received request for user ID:', req.params.userId); // Log the user ID
  try {
    const userId = req.params.userId; // Get the userId from the request parameters
    const matches = await findMatches(userId); // Fetch matches for the specified user
    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error); // Log the error
    res.status(400).json({ error: error.message });
  }
});

// ptionally, you can keep the original route to fetch matches for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const matches = await findMatches(req.user.id); // Fetch matches for the logged-in user
    res.json(matches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;