const Message = require('../models/Message'); // Assuming you have a Message model

// Fetch a message by ID
exports.getMessageById = async (req, res) => {
  const { id } = req.params; // Extract message ID from the route parameters
  try {
    const message = await Message.findById(id); // Find the message in the database
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message); // Respond with the found message
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
