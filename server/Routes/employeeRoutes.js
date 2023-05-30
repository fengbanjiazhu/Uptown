const express = require("express");
const employeeController = require("../Controller/employeeController");
const authController = require("../Controller/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    employeeController.getAllEmployee
  )
  .post(employeeController.createEmployee)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    employeeController.updateEmployee
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    employeeController.deleteEmployee
  );

router
  .route("/Me")
  .get(authController.protect, employeeController.getMe)
  .patch(authController.protect, employeeController.updateMe);

router.route("/login").post(authController.login);

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    employeeController.getEmployee
  );

module.exports = router;
