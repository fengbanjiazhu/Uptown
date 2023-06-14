import { useState } from "react";
import { Button, Descriptions, Modal, Input } from "antd";
import timeStrTransfer from "../../utils/timeStrToyTime";
import sendJsonData from "../../utils/sendJsonData";

const QueryCard = (prop) => {
  const [showForm, setShowForm] = useState(false);
  const [reply, setReply] = useState(null);
  const { _id: id, email, name, message, createdAt: queryTime, bookingStatus: status } = prop.query;
  const { showBtn } = prop;

  const time = timeStrTransfer(queryTime);
  const title = `Query${prop.index + 1} -- ${!status ? "Pending" : "Completed"} `;

  const handleOk = async () => {
    const replyData = {
      reply,
      name,
      email,
    };
    const res = await sendJsonData(`http://localhost:4000/api/booking/${id}`, replyData);
    console.log(res);
    setShowForm(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setShowForm(false);
  };

  const handleBtnClick = () => {
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
        title={title}
        size={"small"}
        style={{ marginBottom: "1rem" }}
        contentStyle={status ? { color: "grey" } : {}}
        extra={
          showBtn && (
            <Button
              onClick={() => {
                handleBtnClick();
              }}
              type="primary"
            >
              Reply
            </Button>
          )
        }
      >
        <Descriptions.Item label="Name">{name}</Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          {email}
        </Descriptions.Item>
        <Descriptions.Item label="Time">{time}</Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          {!status ? "Waiting Reply" : "Replied"}
        </Descriptions.Item>
        <Descriptions.Item label="Query Content" span={3}>
          {message}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
export default QueryCard;
