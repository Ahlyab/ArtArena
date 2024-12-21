const Conversation = require("../../models/conversation.model");
const Message = require("../../models/message.model");
const createSocketInstance = require("../../socket/socket");
module.exports.sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message, isImage } = req.body; // Added `receiverType` to indicate if the receiver is an Artist or Client
        const senderId = req.user.id;
        const senderType = req.user.user_type; // Assuming `req.user` contains a `userType` field indicating "Artist" or "Client"

        if (!senderId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        // Check for existing conversation
        let conversation = await Conversation.findOne({
            "participants.user": { $all: [senderId, receiverId] },
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            console.log("Sender id: ", senderId);
            console.log("Receiver id: ", receiverId);
            console.log("req comming : ", req.user.id);
            conversation = await Conversation.create({
                participants: [
                    {
                        user: senderId,
                        docModel: senderType == "artist" ? "Artist" : "Client",
                    },
                    {
                        user: receiverId,
                        docModel: senderType == "artist" ? "Client" : "Artist",
                    },
                ],
                messages: [],
                isImage: isImage ? true : false,
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            isImage: isImage ? true : false,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        console.log("Sender id: ", senderId);
        console.log("Receiver id: ", receiverId);
        console.log("req comming : ", req.user.id);

        // Save both the message and the conversation
        await Promise.all([newMessage.save(), conversation.save()]);

        // SOCKET.IO functionality (optional, adjust as needed)
        const io = createSocketInstance(); // Ensure `createSocketInstance` is implemented correctly
        io.to(receiverId).emit("newMessage", newMessage);

        console.log("conversation created : ", conversation);
        // Respond with the newly created message
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
