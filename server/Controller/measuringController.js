const BookMeasure = require("../Model/bookMeasureModel");
const centralController = require("./centreController");

exports.getAllMeasureBook = centralController.getAll(BookMeasure);
