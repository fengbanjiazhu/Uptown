const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: function () {
      return !this.user;
    },
  },
  session: {
    type: String,
    required: [true, "A booking must have a type"],
    enum: ["query", "fitting"],
  },
  time: {
    type: Date,
    required: function () {
      return this.session === "fitting";
    },
  },
  message: {
    type: String,
    required: function () {
      return this.session === "query";
    },
  },
  bookingStatus: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // 2 month
    expires: 2 * 30 * 24 * 60 * 60,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
