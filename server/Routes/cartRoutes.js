const express = require("express");
const cartController = require("../Controller/cartController");

const router = express.Router();

router
  .route("/")
  .get(cartController.getAllCart)
  .post(cartController.createCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);

router.route("/:id").get(cartController.getCart);

module.exports = router;
