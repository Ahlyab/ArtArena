const Conversation = require("../../models/conversation.model");
module.exports.getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user.id; // Current user's ID

        console.log("Logged-in User ID:", loggedInUserId);

        if (!loggedInUserId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Find conversations where the logged-in user is a participant
        const conversations = await Conversation.find({
            "participants.user": loggedInUserId,
        }).populate("participants.user messages", "-password");

        const result = [];

        for (const conversation of conversations) {
            const otherParticipant = conversation.participants.find(
                (participant) => !participant.user._id.equals(loggedInUserId)
            );

            if (otherParticipant) {
                const lastMessage =
                    conversation.messages[conversation.messages.length - 1];
                result.push({
                    participants: otherParticipant,
                    lastMessage,
                });
            }
        }

        // Sort by last message updatedAt timestamp
        result.sort(
            (a, b) =>
                new Date(b.lastMessage.updatedAt) - new Date(a.lastMessage.updatedAt)
        );

        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
