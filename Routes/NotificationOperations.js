const express = require("express");
const router = express.Router();
const {
  getNotifications,
  updateNotification,
} = require("../Controller/NotificationController");

// Define routes for Art
router.get("/get_notifications", getNotifications);
router.post("/read_notification", updateNotification);

module.exports = router;
