const Subscribe = require("../Model/subscribeModel");
const centralController = require("./centreController");
const catchAsync = require("../Utils/catchAsync");
const Email = require("../Utils/Email");

exports.getAllSubscribe = centralController.getAll(Subscribe);
exports.removeSubscribe = centralController.deleteData(Subscribe);

exports.signSubscribe = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const newData = await Subscribe.create(req.body);
  const subscribeData = {
    email,
    name: "there subscriber",
  };

  await new Email(subscribeData, "http://localhost:3000/catalog").sendSubscribe("News of Uptown");

  res.status(200).json({
    status: "success",
    newData,
  });
});
