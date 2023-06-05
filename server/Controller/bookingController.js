const Booking = require("../Model/bookingModel");
const BookMeasure = require("../Model/bookMeasureModel");
const centralController = require("./centreController");
const catchAsync = require("../Utils/catchAsync");
const appErr = require("../Utils/appError");

exports.createBooking = catchAsync(async (req, res, next) => {
  const { email, date, session, time } = req.body;

  if (session === "measuring") {
    const bookOnDate = await BookMeasure.findOne({ date });
    if (!bookOnDate) {
      await BookMeasure.create({ email, date, time });
    } else {
      const existingBook = await BookMeasure.findOne({ date, time });
      if (existingBook) return next(new appErr("Sorry, this section has already been booked"));

      await BookMeasure.findOneAndUpdate({ date }, { $push: { time } });
    }
  }
  const newData = await Booking.create(req.body);

  res.status(200).json({
    status: "success",
    newData,
  });
});

exports.getBooking = centralController.getOne(Booking);
exports.getAllBooking = centralController.getAll(Booking);
exports.updateBooking = centralController.updateData(Booking);
exports.deleteBooking = centralController.deleteData(Booking);
