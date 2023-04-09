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

const USERS_STATUS = {
  PENDING: 0,
  ACCEPTED: 1,
  REJECTED: 2,
};

const RoomStatusSchema = new mongoose.Schema(
  {
    manStatus: {
      type: String,
      default: USERS_STATUS.PENDING,
    },
    womanStatus: {
      type: String,
      default: USERS_STATUS.PENDING,
    },
    rejectionReason: {
      type: String,
    },
  },
  { timestamps: true, collection: "usersinfo" }
);

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
  roomStatus: {
    type: RoomStatusSchema,
  },
  messages: {
    type: [chatMessageSchema],
    default: [],
  },
});

const RoomStatus = mongoose.model("RoomStatus", RoomStatusSchema);

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
// Create the Mongoose model for the private room
const PrivateRoom = mongoose.model("PrivateRoom", privateRoomSchema);

module.exports = {
  PrivateRoom,
  ChatMessage,
  RoomStatus,
};
