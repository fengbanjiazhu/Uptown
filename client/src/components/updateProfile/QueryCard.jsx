import { useState } from "react";
import { Button, Descriptions, Modal, Input } from "antd";
import timeStrTransfer from "../../utils/timeStrToyTime";
import sendJsonData from "../../utils/sendJsonData";

const QueryCard = (prop) => {
  // email,name,message,time,status
  const [showForm, setShowForm] = useState(false);
  const [queryId, setQueryId] = useState(null);
  const [reply, setReply] = useState(null);
  const { TextArea } = Input;

  const time = timeStrTransfer("2023-06-06T05:54:09.005Z");

  const handleOk = (e) => {
    console.log(e);
    setShowForm(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setShowForm(false);
  };

  const handleBtnClick = (id) => {
    setQueryId(id);
    setShowForm(true);
  };

  const onTextChange = (e) => {
    setReply(e.target.value);
  };

  return (
    <>
      <Modal title="Input Reply" open={showForm} onOk={handleOk} onCancel={handleCancel}>
        <Input onChange={onTextChange} />
      </Modal>

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
    </>
  );
};
export default QueryCard;
