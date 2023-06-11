const Blog = require("../Model/blogModel");
const centralController = require("./centreController");

exports.getAllBlog = centralController.getAll(Blog);
exports.getBlog = centralController.getOne(Blog);
exports.createBlog = centralController.createData(Blog);
exports.updateBlog = centralController.updateData(Blog);
exports.deleteBlog = centralController.deleteData(Blog);
