import React from "react";
import { Alert, Spin } from "antd";

function LoadingSpinner() {
  return (
    <Spin tip="Loading...">
      <Alert
        message="Fetching data..."
        description="Render could be really slow, please wait a few seconds.."
        type="info"
      />
    </Spin>
  );
}

export default LoadingSpinner;
