const mongoose = require("mongoose");

const userBehaviorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  action: String,
  data: Object,
});

const UserBehavior = mongoose.model("UserBehavior", userBehaviorSchema);

module.exports = UserBehavior;
