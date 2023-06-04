const Subscribe = require("../Model/subscribeModel");
const centralController = require("./centreController");

exports.getAllSubscribe = centralController.getAll(Subscribe);
exports.signSubscribe = centralController.createData(Subscribe);
exports.removeSubscribe = centralController.deleteData(Subscribe);
