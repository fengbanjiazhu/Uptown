const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a user!"],
  },
  time: {
    type: Date,
    required: [true, "Booking must have a time!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Booking = mongoose.model("Cart", bookingSchema);

module.exports = Booking;
