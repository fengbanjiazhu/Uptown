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
    enum: ["query", "measuring"],
  },
  date: {
    type: Date,
    required: function () {
      return this.session === "measuring";
    },
  },
  time: {
    type: String,
    required: function () {
      return this.session === "measuring";
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
    // 2 month
    expires: 5184000,
    default: Date.now(),
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.sort({ date: 1 }); // 按照name字段进行升序排序
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
