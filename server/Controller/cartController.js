const Cart = require("../Model/cartModel");
const centralController = require("./centreController");

exports.getAllCart = centralController.getAll(Cart);
exports.getCart = centralController.getOne(Cart);
exports.createCart = centralController.createData(Cart);
exports.updateCart = centralController.updateData(Cart);
exports.deleteCart = centralController.deleteData(Cart);
