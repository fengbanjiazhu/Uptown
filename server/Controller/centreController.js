const catchAsync = require("../Utils/catchAsync");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const datas = await Model.find(req.query);

    res.status(200).json({
      status: "success",
      count: datas.length,
      datas,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.find({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.createData = (Model) =>
  catchAsync(async (req, res, next) => {
    const newData = await Model.create(req.body);

    res.status(200).json({
      status: "success",
      newData,
    });
  });

exports.updateData = (Model) =>
  catchAsync(async (req, res, next) => {
    let updatedData;
    if (req.query.updateMany === "true") {
      delete req.query.updateMany;
      updatedData = await Model.updateMany(req.query, { $set: req.body });
    } else {
      updatedData = await Model.findOneAndUpdate(req.query, { $set: req.body });
    }

    res.status(200).json({
      status: "success",
      updatedData,
    });
  });

exports.deleteData = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.query.deleteMany === "true") {
      delete req.query.deleteMany;
      await Model.deleteMany(req.query);
    } else {
      await Model.deleteOne(req.query);
    }

    res.status(200).json({
      status: "success",
      message: "data successful deleted",
    });
  });
