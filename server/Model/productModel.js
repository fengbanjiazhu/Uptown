const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product must have a name"],
  },
  price: {
    type: Number,
    required: [true, "Product must have a price"],
  },
  categorySlug: {
    type: String,
    required: [true, "Product must have a name"],
  },
  slug: {
    type: String,
    required: [true, "Product must have a name"],
  },
  img01: {
    type: String,
    required: [true, "A tour must have image 01 "],
  },
  img02: {
    type: String,
    required: [true, "A tour must have image 02 "],
  },
  description: {
    type: String,
    required: [true, "Product must have a description"],
  },
  size: [
    {
      type: String,
      enum: ["s", "m", "l", "xl"],
      required: [true, "A product must have sizes "],
    },
  ],
  colors: [
    {
      type: String,
      required: [true, "A product must have colors "],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

productSchema.index({ slug: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
