const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "order must belong to a Product!"],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: function () {
      return !this.email;
    },
  },
  email: {
    type: String,
    required: function () {
      return !this.user;
    },
  },
  address: {
    type: String,
    required: function () {
      return !this.user;
    },
  },
  name: {
    type: String,
    required: function () {
      return !this.user;
    },
  },
  price: {
    type: Number,
    required: [true, "order must have a price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: false,
    required: [true],
  },
  payment_intent_client_secret: {
    type: String,
  },
  payment_intent: {
    type: String,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "title price",
  });
  next();
});

orderSchema.index({ payment_intent: 1 });

const order = mongoose.model("order", orderSchema);

module.exports = order;
