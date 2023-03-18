const mongoose = require("mongoose");
const crypto = require("crypto");

const CONFIRMATIONS_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
};

const userSchema = mongoose.Schema(
  {
    gender: {
      type: String,
      //   required: true,
    },
    phone: {
      type: String,
      //   required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },

    profile: {
      type: String,
      required: true,
    },

    hashed_password: {
      type: String,
      required: true,
    },

    salt: String,

    idNumber: {
      type: String,
    },

    role: {
      type: Number,
      default: 0,
    },

    idPhoto1: {
      type: String,
    },

    idPhoto2: {
      type: String,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    confirmed: {
      type: Number,
      default: CONFIRMATIONS_STATUS.PENDING,
    },

    resetPasswordLink: {
      data: String,
      default: "",
    },

    questions: {
      type: Map,
      of: String,
    },

    sentRequests: [
      { type: mongoose.ObjectId, ref: "Request", required: false },
    ],

    recievedRequests: [
      { type: mongoose.ObjectId, ref: "Request", required: false },
    ],

    favourites: [
      { type: mongoose.ObjectId, ref: "User", required: false },
    ],
  },
  { timestamps: true, collection: "usersinfo" }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;

    // generate salt
    this.salt = this.makeSalt();

    //encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
