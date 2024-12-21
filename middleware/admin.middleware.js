const jwt = require("jsonwebtoken");

// middleware to verify JWT
const adminValidator = (req, res, next) => {
  // req.user

  if (req.user.user_type !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

module.exports = adminValidator;
