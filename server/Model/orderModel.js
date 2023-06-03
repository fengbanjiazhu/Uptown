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
  },
});

// orderSchema.pre(/^find/, function (next) {
//   this.populate("user").populate({
//     path: "product",
//     select: "name",
//   });
//   next();
// });

const order = mongoose.model("order", orderSchema);

module.exports = order;
