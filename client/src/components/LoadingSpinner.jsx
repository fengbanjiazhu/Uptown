import React from "react";
import { Alert, Spin } from "antd";

function LoadingSpinner({
  tip = "Loading",
  message = "Fetching data...",
  description = "Render could be really slow, please wait a few seconds..",
}) {
  return (
    <Spin tip={tip}>
      <Alert message={message} description={description} type="info" />
    </Spin>
  );
}

export default LoadingSpinner;
