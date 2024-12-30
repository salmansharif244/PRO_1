const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Assuming you have a Message model
const Notification = require('../models/Notification'); // Import Notification model
const User = require('../models/User'); // Import User model

// Define the POST route for sending messages
router.post('/', async (req, res) => { // Changed to '/' for consistency
  const { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      content,
    });

    const savedMessage = await newMessage.save();

    // Fetch the username of the sender
    const sender = await User.findById(senderId);
    const notificationContent = `${sender.username} sent you a message: "${content}"`; // Customize the notification message

    const notification = new Notification({
      userId: receiverId, // The user receiving the notification
      messageId: savedMessage._id, // Reference to the message
      content: notificationContent,
      username: sender.username, // Add the sender's username to the notification
    });

    await notification.save(); // Save the notification

    res.status(201).json({ message: 'Message sent successfully', data: savedMessage });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch notifications for a specific user
router.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId }).populate('messageId').sort({ timestamp: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define the route for fetching a message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id); // Fetch message by ID
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message); // Respond with the message
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
});

module.exports = router;