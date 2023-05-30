const Order = require("../Model/orderModel");
const centralController = require("./centreController");

exports.getAllOrder = centralController.getAll(Order);
exports.getOrder = centralController.getOne(Order);
exports.createOrder = centralController.createData(Order);
exports.updateOrder = centralController.updateData(Order);
exports.deleteOrder = centralController.deleteData(Order);
