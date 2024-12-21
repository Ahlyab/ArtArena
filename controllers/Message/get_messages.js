const Conversation = require("../../models/conversation.model");
module.exports.getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;

        if (!senderId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!userToChatId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const conversation = await Conversation.findOne({
            participants: {
                $all: [
                    { $elemMatch: { user: senderId } },
                    { $elemMatch: { user: userToChatId } },
                ],
            },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error in getMessages", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
