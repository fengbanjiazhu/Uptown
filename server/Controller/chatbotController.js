const Chatbot = require("../Utils/Chatbot");
const catchAsync = require("../Utils/catchAsync");
const appErr = require("../Utils/appError");
const { v4: uuidv4 } = require("uuid");

exports.createRes = catchAsync(async (req, res, next) => {
  // const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
  // const chatbot = new Chatbot(process.env.PROJECT_ID, privateKey, process.env.CLIENT_EMAIL);

  // let text = req.body.text;
  // const uuid = uuidv4();
  // let context = "";

  // let intentData = await chatbot.detectIntent(uuid, text, context, "en-US");

  // if (!intentData) return next(new appErr("Chatbot is having problem. Try again later", 404));

  // const { fulfillmentMessages: customRespone } = intentData.queryResult;

  // const responseData = customRespone[0];

  // if (responseData.payload) {
  //   return res.status(200).json({
  //     status: "success",
  //     response: JSON.stringify(responseData.payload.fields),
  //   });
  // }

  // res.status(200).json({
  //   status: "success",
  //   text: responseData.text.text[0],
  // });

  const tempResponseData = "We currently closed chatbot API, please try again later";

  res.status(200).json({
    status: "success",
    text: tempResponseData,
  });
});
