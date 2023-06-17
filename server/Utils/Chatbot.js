const dialogflow = require("@google-cloud/dialogflow");

module.exports = class Chatbot {
  constructor(projectId, privateKey, clientEmail) {
    this.projectId = projectId;
    this.CONFIGURATION = {
      credentials: {
        private_key: privateKey,
        client_email: clientEmail,
      },
    };
  }

  detectIntent = async function (sessionId, queryText, contexts, languageCode) {
    const sessionClient = new dialogflow.SessionsClient(this.CONFIGURATION);
    // The path to identify the agent that owns the created intent.
    const sessionPath = this.sessionClient.projectAgentSessionPath(this.projectId, sessionId);

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
};
