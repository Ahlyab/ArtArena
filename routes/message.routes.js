const authenticateToken = require("../middleware/auth.middleware.js");
const express = require("express");
const router = express.Router();
const {
  getMessages,
  sendMessage,
  getUsersForSidebar,
} = require("../controllers/Message/MessageController.js");

router.get("/users", authenticateToken, getUsersForSidebar);
router.get("/:id", authenticateToken, getMessages);
router.post("/send/:id", authenticateToken, sendMessage);

module.exports = router;
