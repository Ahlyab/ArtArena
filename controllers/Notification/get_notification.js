const Notification = require("../../models/notification.model");
module.exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            recipient: req.user.id,
        }).sort({ createdAt: -1 });
        let count = 0;
        notifications.forEach((notification) => {
            if (!notification.read) {
                count++;
            }
        });
        return res
            .status(200)
            .json({ notifications, status: 200, unseen_count: count });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};
