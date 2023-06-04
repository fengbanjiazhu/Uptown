const Booking = require("../Model/bookingModel");
const centralController = require("./centreController");
const catchAsync = require("../Utils/catchAsync");

exports.createBooking = centralController.createData(Booking);
exports.getBooking = centralController.getOne(Booking);
exports.getAllBooking = centralController.getAll(Booking);
exports.updateBooking = centralController.updateData(Booking);
exports.deleteBooking = centralController.deleteData(Booking);
