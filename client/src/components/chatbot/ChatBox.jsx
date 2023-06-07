import React, { useEffect } from "react";
import sendJsonData from "../../utils/sendJsonData";

import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

function ChatBox() {
  useEffect(() => {
    addResponseMessage("Hi there, what can I help you today? 😊");
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    const res = await sendJsonData();
    console.log(`New message incoming! ${newMessage}`);
    addResponseMessage("Hi");
  };
  return (
    <Widget
      title="Welcome to Uptown"
      subtitle="I am here to help"
      handleNewUserMessage={handleNewUserMessage}
    />
  );
}

export default ChatBox;
