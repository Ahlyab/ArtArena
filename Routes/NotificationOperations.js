const express = require("express");
const router = express.Router();
const { getNotifications } = require("../Controller/NotificationController");

// Define routes for Art
router.get("/get_notifications", getNotifications);

module.exports = router;
