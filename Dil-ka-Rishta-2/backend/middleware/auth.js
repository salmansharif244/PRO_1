const jwt = require('jsonwebtoken');

// Authentication middleware to verify JWT tokens
const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, respond with an unauthorized status
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    // Verify the token using the secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the verified user information to the request object
    req.user = verified;
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, respond with a bad request status
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
