import React, { useEffect, useState } from "react";
import sendJsonData from "../../utils/sendJsonData";

import { Widget, addResponseMessage, addLinkSnippet } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import avatar from "../../assets/avatar.png";

function ChatBox() {
  // useEffect(() => {
  //   addResponseMessage("Hi there, what can I help you today? 😊");
  // }, []);

  const handleNewUserMessage = async (newMessage) => {
    const res = await sendJsonData("http://localhost:4000/api/chatbot", { text: newMessage });
    if (!res || res.status === "error") {
      return addResponseMessage("Sorry, something went wrong, please try again later");
    }

    if (res.response) {
      const resData = JSON.parse(res.response);
      const dataConfig = {
        title: resData.text.stringValue,
        link: `http://localhost:3000${resData.link.stringValue}`,
        target: "_self",
      };
      return addLinkSnippet(dataConfig);
    } else {
      return addResponseMessage(res.text);
    }
  };
  return (
    <Widget
      title="Welcome to Uptown"
      subtitle="I am here to help 😊"
      profileAvatar={avatar}
      handleNewUserMessage={handleNewUserMessage}
    />
  );
}

export default ChatBox;
