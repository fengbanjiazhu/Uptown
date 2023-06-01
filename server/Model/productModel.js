const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have a name"],
  },
  price: {
    type: Number,
    required: [true, "Product must have a price"],
  },
  images: [
    {
      type: String,
      required: [true, "A tour must have images"],
    },
  ],
  description: {
    type: String,
    required: [true, "Product must have a name"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
