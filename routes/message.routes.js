const authenticateToken = require("../middleware/auth.middleware.js");
const express = require("express");
const {getMessages} = require("../controllers/Message/get_messages");
const {sendMessage} = require("../controllers/Message/send_message");
const {getUsersForSidebar} = require("../controllers/Message/get_user_for_sidebar");
const router = express.Router();


router.get("/users", authenticateToken, getUsersForSidebar);
router.get("/:id", authenticateToken, getMessages);
router.post("/send/:id", authenticateToken, sendMessage);

module.exports = router;
