const authenticateToken = require("../Middleware/AuthMiddleware.js");
const express = require("express");
const router = express.Router();
const {
  getMessages,
  sendMessage,
} = require("../Controller/MessageController.js");

router.get("/:id", authenticateToken, getMessages);
router.post("/send/:id", authenticateToken, sendMessage);

module.exports = router;
