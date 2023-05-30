const Product = require("../Model/productModel");
const centralController = require("./centreController");

exports.getAllProduct = centralController.getAll(Product);
exports.getProduct = centralController.getOne(Product);
exports.createProduct = centralController.createData(Product);
exports.updateProduct = centralController.updateData(Product);
exports.deleteProduct = centralController.deleteData(Product);

const catchAsync = require("../Utils/catchAsync");

exports.updatePrice = catchAsync(async (req, res, next) => {
  let updatedData;
  if (req.query.updateMany === "true") {
    delete req.query.updateMany;
    updatedData = await Product.updateMany(req.query, { $inc: req.body });
  } else {
    updatedData = await Product.findOneAndUpdate(req.query, { $inc: req.body });
  }

  res.status(200).json({
    status: "success",
    updatedData,
  });
});
