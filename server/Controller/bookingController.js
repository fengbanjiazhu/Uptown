const Booking = require("../Model/bookingModel");
const catchAsync = require("../Utils/catchAsync");

exports.updateOrder = catchAsync(async (req, res, next) => {
  // this is only temporary, unsecure

  res.redirect(req.originalUrl.split("?")[0]);
});

// exports.createBooking = factory.createOne(Booking);
// exports.getBooking = factory.getOne(Booking);
// exports.getAllBooking = factory.getAll(Booking);
// exports.updateBooking = factory.updateOne(Booking);
// exports.deleteBooking = factory.deleteOne(Booking);
