const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    body: {
      type: {},
      required: true,
      unique: true,
      min: 200,
      max: 20000000,
      lowercase: true,
    },
    excerpt: {
      type: String,
      max: 1000,
    },
    mTitle: {
      type: String,
    },
    mDescription: {
      type: String,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    categories: [{ type: mongoose.ObjectId, ref: "Category", required: true }],
    tags: [{ type: mongoose.ObjectId, ref: "Tag", required: true }],
    postedBy: {
      type: mongoose.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
