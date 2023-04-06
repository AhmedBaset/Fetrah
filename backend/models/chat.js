const mongoose = require("mongoose");
// Define the chat message schema
const chatMessageSchema = new mongoose.Schema({
  senderUserName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  responseTo: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Define the private room schema
const privateRoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  clients: [
    {
      type: String,
      required: true,
    },
  ],
  messages: {
    type: [chatMessageSchema],
    default: [],
  },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
// Create the Mongoose model for the private room
const PrivateRoom = mongoose.model("PrivateRoom", privateRoomSchema);

module.exports = {
  PrivateRoom,
  ChatMessage,
};
