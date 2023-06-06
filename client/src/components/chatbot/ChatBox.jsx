import React, { useEffect } from "react";

import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

function ChatBox() {
  useEffect(() => {
    addResponseMessage("Hi there, what can I help you today? 😊");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
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
