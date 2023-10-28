import React from "react";
import sendJsonData from "../../utils/sendJsonData";

import { Widget, addResponseMessage, addLinkSnippet } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import avatar from "../../assets/avatar.png";

import { urlChatbot } from "../../api";

function ChatBox() {
  const handleNewUserMessage = async (newMessage) => {
    const res = await sendJsonData(urlChatbot, { text: newMessage });
    if (!res || res.status === "error") {
      return addResponseMessage("Sorry, something went wrong, please try again later");
    }

    if (res.response) {
      const resData = JSON.parse(res.response);
      const dataConfig = {
        title: resData.text.stringValue,
        link: `http://uptown-server.onrender.com${resData.link.stringValue}`,
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
