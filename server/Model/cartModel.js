const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "order must belong to a User!"],
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "order must belong to a Product!"],
    },
  ],
  total: {
    type: Number,
    required: [true, "Cart must have a customer name"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
