const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog must have a title"],
  },
  text: [
    {
      type: String,
      required: [true, "Blog must have content"],
    },
  ],
  image: [
    {
      type: String,
      required: [true, "Blog must have images"],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
