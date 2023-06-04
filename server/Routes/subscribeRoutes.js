const express = require("express");
const subscribeController = require("../Controller/subscribeController");
const authController = require("../Controller/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("manager", "admin"),
    subscribeController.getAllSubscribe
  )
  .post(subscribeController.signSubscribe)
  .delete(subscribeController.removeSubscribe);

module.exports = router;
