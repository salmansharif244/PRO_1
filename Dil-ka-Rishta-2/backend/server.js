const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Require the cors package
const http = require('http'); // Import http module
const socketIo = require('socket.io'); // Import socket.io
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const matchRoutes = require('./routes/matchRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080', // Frontend's origin
    methods: ['GET', 'POST'], // Allowed methods
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: 'http://localhost:8080', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true // Allow credentials (if needed)
}));

app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes); // Ensure the route matches your profile route definition
app.use('/api', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/matches', matchRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming messages
  socket.on('sendMessage', async (message) => {
    console.log('Message received:', message);
    
    // Emit the message to the intended recipient
    socket.to(message.receiverId).emit('receiveMessage', message); // Send to specific user

    // Optionally, you can also broadcast to all clients
    // io.emit('receiveMessage', message); // Uncomment to broadcast to all clients

    // Save the message to the database
    try {
      const newMessage = new Message(message); // Assuming you have a Message model
      await newMessage.save(); // Save to the database
      console.log('Message saved to database:', newMessage);
    } catch (error) {
      console.error('Error saving message to database:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error('Error:', err); // Log the error for debugging
  const status = err.status || 500; // Use specific status if available
  const message = err.message || 'Internal server error'; // Use specific message if available
  res.status(status).json({ message }); // Send the error response
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});