const express = require("express");
const bookingController = require("../Controller/bookingController");
// const measuringController = require("../Controller/measuringController");
const authController = require("../Controller/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("manager", "admin"),
    bookingController.getAllBooking
  )
  .post(bookingController.createBooking);

router.route("/:id").get(bookingController.getBooking);

module.exports = router;
