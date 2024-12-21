const Conversation = require("../../models/conversation.model.js");
const Message = require("../../models/message.model.js");
const createSocketInstance = require("../../socket.js");

const sendMessage = async (req, res) => {
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

const getMessages = async (req, res) => {
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

const getUsersForSidebar = async (req, res) => {
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

module.exports = { sendMessage, getMessages, getUsersForSidebar };
