const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Subscribe must belong to an email!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

subscribeSchema.index({ email: 1 });

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

module.exports = Subscribe;
