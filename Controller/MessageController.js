const Conversation = require("../Model/Conversation.js");
const Message = require("../Model/Message.js");
const createSocketInstance = require("../socket.js");

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body; // Added `receiverType` to indicate if the receiver is an Artist or Client
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
      conversation = await Conversation.create({
        participants: [
          {
            user: senderId,
            docModel: senderType == "artist" ? "artist" : "client",
          },
          {
            user: receiverId,
            docModel: senderType == "artist" ? "client" : "artist",
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

    console.log(loggedInUserId);

    if (!loggedInUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find conversations where the logged-in user is a participant
    const conversations = await Conversation.find({
      "participants.user": loggedInUserId,
    }).populate("participants.user messages", "-password"); // Populate user data excluding the password

    // get last message of conversation
    const lastMessages = conversations.map((conversation) => {
      return conversation.messages[conversation.messages.length - 1];
    });

    const participants = conversations.map((conversation) => {
      return {
        participants: conversation.participants,
        lastMessages: conversation.messages[conversation.messages.length - 1],
      };
    });

    const result = [];

    if (req.user.user_type === "client") {
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].participants[0].user !== loggedInUserId) {
          result.push({
            participants: participants[i].participants[0],
            lastMessage: participants[i].lastMessages,
          });
        }
      }
    } else {
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].participants[1].user !== loggedInUserId) {
          result.push({
            participants: participants[i].participants[1],
            lastMessage: participants[i].lastMessages,
          });
        }
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { sendMessage, getMessages, getUsersForSidebar };
