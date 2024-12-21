const Notification = require("../../models/notification.model");
module.exports.updateNotification = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Notification id is required" });
    }

    try {
        const notification = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );

        const notifications = await Notification.find({ recipient: req.user.id });
        let count = 0;
        notifications.forEach((noti) => {
            if (!noti.read) {
                count++;
            }
        });

        return res
            .status(200)
            .json({ notification, status: 200, unseen_count: count });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};
