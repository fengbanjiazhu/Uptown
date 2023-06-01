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
    required: [true, "order must belong to a User!"],
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
    default: true,
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
