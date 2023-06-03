const express = require("express");
const userController = require("../Controller/userController");
const authController = require("../Controller/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    userController.getAllUser
  )
  .post(userController.createUser)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    userController.deleteUser
  );

router
  .route("/Me")
  .get(authController.protect, userController.getMe)
  .patch(authController.protect, userController.updateMe);

router.route("/login").post(authController.login);

router.route("/updateMyPassword").patch(authController.protect, authController.updatePassword);

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    userController.getUser
  );

module.exports = router;
