import React from "react";
import PropTypes from "prop-types";
import ChatBox from "./chatbot/ChatBox";

const Helmet = (props) => {
  document.title = props.title;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>{props.children}</div>
      <ChatBox></ChatBox>
    </>
  );
};

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Helmet;
