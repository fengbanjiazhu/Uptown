const dialogflow = require("@google-cloud/dialogflow");
const fs = require("fs");
const path = require("path");
const catchAsync = require("../Utils/catchAsync");
const appErr = require("../Utils/appError");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../uptown-572a8-6e247701ed02.json");
const CREDENTIALS = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const PROJECTID = CREDENTIALS.project_id;

const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};
require("dotenv").config();

// console.log("test:", process.env.PROJECT_ID);

// const PROJECTID = JSON.parse(process.env.PROJECT_ID);
// const CONFIGURATION = {
//   credentials: {
//     private_key: `${process.env.PRIVATE_KEY}`,
//     client_email: process.env.CLIENT_EMAIL,
//   },
// };

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

const detectIntent = async function (sessionId, queryText, contexts, languageCode) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(PROJECTID, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
};

exports.createRes = catchAsync(async (req, res, next) => {
  let text = req.body.text;
  const uuid = uuidv4();
  let context = "";

  let intentData = await detectIntent(uuid, text, context, "en-US");

  if (!intentData) return next(new appErr("Chatbot is having problem. Try again later", 404));

  const { fulfillmentMessages: customRespone } = intentData.queryResult;

  const responseData = customRespone[0];
  // console.log(responseData);

  if (responseData.payload) {
    return res.status(200).json({
      status: "success",
      response: JSON.stringify(responseData.payload.fields),
    });
  }

  res.status(200).json({
    status: "success",
    text: responseData.text.text[0],
  });
});
