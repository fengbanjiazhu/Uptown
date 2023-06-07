const express = require("express");
const orderController = require("../Controller/orderController");
const authController = require("../Controller/authController");

const router = express.Router();

router.post("/checkout-intent/", orderController.getCheckoutIntent);
router.post("/update-order-status/", orderController.updateOrderStatus);
// updateOrderStatus

router
  .route("/")
  .get(authController.protect, orderController.getAllOrder)
  .post(orderController.createOrder)
  .patch(authController.protect, orderController.updateOrder)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    orderController.deleteOrder
  );

router
  .route("/myOrder")
  .get(authController.protect, orderController.getAllMyOrder, orderController.getAllOrder);

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    orderController.getOrder
  );

module.exports = router;
