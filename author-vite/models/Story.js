const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: "Fantasy" },
  datePosted: { type: Date, default: Date.now },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  upvotes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  mainPost: { type: Boolean, defaule: false },
});

const Story = mongoose.model("Story", StorySchema);

module.exports = Story;
