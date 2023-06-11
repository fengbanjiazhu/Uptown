const express = require("express");
const authController = require("../Controller/authController");
const blogController = require("../Controller/blogController");

const router = express.Router();

application.use(authController.protect, authController.restrictTo("admin"));

router
  .route("/")
  .get(blogController.getAllBlog)
  .post(blogController.createBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

router.route("/:id").get(blogController.getBlog);

module.exports = router;
