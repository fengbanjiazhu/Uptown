const dialogflow = require("@google-cloud/dialogflow");
const fs = require("fs");
const path = require("path");
const catchAsync = require("../Utils/catchAsync");

const filePath = path.join(__dirname, "../uptown-572a8-6e247701ed02.json");
const CREDENTIALS = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const PROJECID = CREDENTIALS.project_id;

const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: languageCode,
      },
    },
  };
  console.log("This is", request);

  try {
    const responses = await sessionClient.detectIntent(request);
    // console.log("This is response:", responses);
    const result = responses[0].queryResult;
    return {
      status: 1,
      text: result.fulfillmentText,
    };
  } catch (error) {
    console.log(`Error at dialogflow-api.js detectIntent --> ${error}`);
    return {
      status: 0,
      text: "Error at dialogflow detect intent.",
    };
  }
};

exports.createRes = catchAsync(async (req, res, next) => {
  let text = req.body.text;
  let sessionId = req.body.mySession;

  // console.log("A request came.");
  // console.log(`Query text --> ${text}`);
  // console.log(`Session id --> ${sessionId}`);

  let intentData = await detectIntent("en", text, sessionId);

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (intentData.status == 1) {
    res.status(200).json({
      status: "success",
      text: intentData.text,
    });
  } else {
    res.send("Chatbot is having problem. Try again after sometime.");
  }
});
