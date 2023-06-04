const express = require("express");
const bookingController = require("../Controller/bookingController");
// const authController = require("../Controller/authController");

const router = express.Router();

router.post("/checkout-intent/", bookingController.getCheckoutIntent);

// router.use(authController.protect);
// router.use(authController.restrictTo('lead-guide', 'admin'));

// router.route("/").get(bookingController.getAllBooking).post(bookingController.createBooking);

// router
//   .route("/:id")
//   .get(bookingController.getBooking)
//   .patch(bookingController.updateBooking)
//   .delete(bookingController.deleteBooking);

module.exports = router;
