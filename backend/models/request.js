const mongoose = require("mongoose");

const REQUEST_STATUS = {
  PENDING: 0,
  READED: 1,
  ACCEPTED: 2,
  REJECTED: 3,
  TIMEOVER: 4,
  CANCELED: 5,
};

const requestSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    reciever: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: Number,
      default: REQUEST_STATUS.PENDING,
    },
    token: {
      type: String,
    },
    privateRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrivateRoom",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
