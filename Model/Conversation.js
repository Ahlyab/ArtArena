const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // participant can be client or artist
        refPath: "docModel",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Message",
        default: [],
      },
    ],
    docModel: {
      type: String,
      required: true,
      enum: ["Client", "Artist"],
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
