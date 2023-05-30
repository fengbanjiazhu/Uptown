const express = require("express");
const productController = require("../Controller/productController");
const authController = require("../Controller/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    productController.getAllProduct
  )
  .post(productController.createProduct)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    productController.deleteProduct
  );

router.route("/:id").get(productController.getProduct);

router.route("/changePriceBy").patch(productController.updatePrice);

module.exports = router;
