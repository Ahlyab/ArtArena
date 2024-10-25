const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Assuming your JWT is stored in a cookie named 'token'

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user; // Save the user information from the token for use in other routes
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
