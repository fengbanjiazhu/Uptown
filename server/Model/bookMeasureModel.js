const mongoose = require("mongoose");

const bookMeasureSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, "Booking measuring must have a date"],
  },
  time: [
    {
      type: String,
      required: [true, "Booking measuring must have a time"],
    },
  ],
  createdAt: {
    type: Date,
    expires: 5184000,
    default: Date.now(),
  },
});

const BookMeasure = mongoose.model("BookMeasure", bookMeasureSchema);

module.exports = BookMeasure;
