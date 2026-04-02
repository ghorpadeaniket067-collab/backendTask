const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  image: { type: String },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);