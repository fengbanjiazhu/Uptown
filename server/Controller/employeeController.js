const Employee = require("../Model/employeeModel");
const catchAsync = require("../Utils/catchAsync");
const centralController = require("./centreController");

exports.getAllEmployee = centralController.getAll(Employee);
exports.getEmployee = centralController.getOne(Employee);

exports.createEmployee = catchAsync(async (req, res, next) => {
  const dataFilter = {
    ...req.body,
    role: "employee",
  };

  const employee = await Employee.create(dataFilter);

  res.status(200).json({
    status: "success",
    employee,
  });
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  let updatedEmployee;
  if (req.query.updateMany === "true") {
    delete req.query.updateMany;
    updatedEmployee = await Employee.updateMany(req.query, { $set: req.body });
  } else {
    updatedEmployee = await Employee.findOneAndUpdate(req.query, { $set: req.body });
  }

  res.status(200).json({
    status: "success",
    updatedEmployee,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  currentEmployee = await Employee.findById(req.user._id);
  res.status(200).json({
    status: "success",
    currentEmployee,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  updatedEmployee = await Employee.findByIdAndUpdate(req.user._id, { $set: req.body });
  if (updatedEmployee.length < 1)
    return next(new Error("Employee can only update their own profile"));

  res.status(200).json({
    status: "success",
    updatedEmployee,
  });
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  if (req.query.deleteMany === "true") {
    delete req.query.deleteMany;
    await Employee.deleteMany(req.query);
  } else {
    await Employee.deleteOne(req.query);
  }

  res.status(200).json({
    status: "success",
    message: "data successful deleted",
  });
});
