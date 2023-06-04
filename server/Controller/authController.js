const jwt = require("jsonwebtoken");
const catchAsync = require("../Utils/catchAsync");
const User = require("../Model/userModel");
const AppError = require("../Utils/appError");
const Email = require("../Utils/Email");

// sign json web token function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// send token to user function
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error("please provide email and password", 400));
  }

  // check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  const correct = await user?.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new Error("incorrect email or password", 401));
  }

  // if all correct, send token back to user
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer"))
    next(new Error("You are not logged in, please login first"), 401);

  token = token.split(" ")[1];

  const result = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(result.id);
  if (!currentUser) {
    return next(new Error("The user no longer exist", 401));
  }

  // Grand Access to Protected Route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error("You do not have permission to perform this action", 403));
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1 get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2 check input password is correct
  const currentPassword = req.body.passwordCurrent;
  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError("your current password is wrong", 401));
  }

  // 3 if its correct, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4 log user in, send JWT
  createSendToken(user, 200, res);
});
