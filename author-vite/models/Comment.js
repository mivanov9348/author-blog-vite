const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  comment: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
