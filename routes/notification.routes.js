const express = require("express");
const {getNotifications} = require("../controllers/Notification/get_notification");
const {updateNotification} = require("../controllers/Notification/update_notification");
const router = express.Router();


// Define routes for Art
router.get("/get_notifications", getNotifications);
router.post("/read_notification", updateNotification);

module.exports = router;
