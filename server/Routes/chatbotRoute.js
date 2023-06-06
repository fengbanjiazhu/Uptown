const express = require("express");
const chatbotController = require("../Controller/chatbotController");

const router = express.Router();

router.route("/").post(chatbotController.createRes);

module.exports = router;
