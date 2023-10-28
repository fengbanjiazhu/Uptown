const User = require("../Model/userModel");
const catchAsync = require("../Utils/catchAsync");
const centralController = require("./centreController");
// const Email = require("../Utils/Email");

exports.getAllUser = centralController.getAll(User);
exports.getUser = centralController.getOne(User);

exports.createUser = catchAsync(async (req, res, next) => {
  if (!req.body.agreement) return;
  // console.log(req.body);
  const dataFilter = {
    name: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.confirm,
    role: "user",
    phone: req.body.phone,
  };

  const user = await User.create(dataFilter);

  // const url = "http://localhost:3000/login";
  // await new Email(user, url).sendWelcome();

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  let updatedUser;
  if (req.query.updateMany === "true") {
    delete req.query.updateMany;
    updatedUser = await User.updateMany(req.query, { $set: req.body });
  } else {
    updatedUser = await User.findOneAndUpdate(req.query, { $set: req.body });
  }

  res.status(200).json({
    status: "success",
    updatedUser,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  currentUser = await User.findById(req.user._id);
  res.status(200).json({
    status: "success",
    currentUser,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: req.body });
  if (updatedUser.length < 1) return next(new Error("User can only update their own profile"));

  res.status(200).json({
    status: "success",
    updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (req.query.deleteMany === "true") {
    delete req.query.deleteMany;
    await User.deleteMany(req.query);
  } else {
    await User.deleteOne(req.query);
  }

  res.status(200).json({
    status: "success",
    message: "data successful deleted",
  });
});
