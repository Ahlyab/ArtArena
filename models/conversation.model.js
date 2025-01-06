const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "participants.docModel",
          required: true,
        },

        docModel: {
          type: String,
          required: true,
          enum: ["Client", "Artist"],
        },
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model("Conversation", conversationSchema);
module.exports = ConversationModel;
