const express = require("express");
const measuringController = require("../Controller/measuringController");
const authController = require("../Controller/authController");

const router = express.Router();

router.route("/").get(measuringController.getAllMeasureBook);

// router.route("/:id").get(bookingController.getBooking);

module.exports = router;
