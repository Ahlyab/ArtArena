const Conversation = require("../Model/Conversation.js");
const Message = require("../Model/Message.js");
const createSocketInstance = require("../socket.js");

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message, receiverType } = req.body; // Added `receiverType` to indicate if the receiver is an Artist or Client
    const senderId = req.user.id;
    const senderType = req.user.user_type; // Assuming `req.user` contains a `userType` field indicating "Artist" or "Client"

    console.log("senderId", senderId);
    // Check for existing conversation
    let conversation = await Conversation.findOne({
      "participants.user": { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [
          {
            user: senderId,
            docModel: senderType == "Artist" ? "Artist" : "Client",
          },
          {
            user: receiverId,
            docModel: senderType == "Artist" ? "Client" : "Artist",
          },
        ],
        messages: [],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save both the message and the conversation
    await Promise.all([newMessage.save(), conversation.save()]);

    // SOCKET.IO functionality (optional, adjust as needed)
    const io = createSocketInstance(); // Ensure `createSocketInstance` is implemented correctly
    io.to(receiverId).emit("newMessage", newMessage);

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

    console.log(loggedInUserId);

    // Find conversations where the logged-in user is a participant
    const conversations = await Conversation.find({
      "participants.user": loggedInUserId,
    }).populate("participants.user", "-password"); // Populate user data excluding the password

    // Extract the other participants for the sidebar
    const users = conversations
      .map((conversation) => {
        const otherParticipant = conversation.participants.find(
          (participant) =>
            participant.user.toString() !== loggedInUserId.toString()
        );
        return otherParticipant ? otherParticipant.user : null;
      })
      .filter(Boolean); // Filter out any null values

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { sendMessage, getMessages, getUsersForSidebar };
