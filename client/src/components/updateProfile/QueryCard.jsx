import { Button, Descriptions } from "antd";
import { useState } from "react";
import timeStrTransfer from "../../utils/timeStrToyTime";

const QueryCard = (prop) => {
  // email,name,message,time,status
  const [showForm, setShowForm] = useState(false);
  const [queryId, setQueryId] = useState(null);

  const time = timeStrTransfer("2023-06-06T05:54:09.005Z");

  const handleBtnClick = (id) => {
    setQueryId(id);
    setShowForm(true);
  };

  return (
    <Descriptions
      bordered
      title="Custom Size"
      size={"small"}
      extra={
        <Button
          onClick={() => {
            handleBtnClick(1);
          }}
          type="primary"
        >
          Reply
        </Button>
      }
    >
      <Descriptions.Item label="Name">show Oiwa</Descriptions.Item>
      <Descriptions.Item label="Email">1234@gmail.com</Descriptions.Item>
      <Descriptions.Item label="time">{time}</Descriptions.Item>
      <Descriptions.Item label="Query Content">Hi I need help</Descriptions.Item>
    </Descriptions>
  );
};
export default QueryCard;
