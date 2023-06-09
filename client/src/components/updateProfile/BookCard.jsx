import React from "react";
import { Descriptions } from "antd";
import timeStrTransfer from "../../utils/timeStrToyTime";

function BookCard(prop) {
  const { name, email, date, time } = prop.measure;
  const bookDate = timeStrTransfer(date).split(" ")[0];

  return (
    <Descriptions style={{ marginBottom: "1rem" }} title={`Measure ${prop.index + 1}`} bordered>
      <Descriptions.Item label="Customer Name">{name}</Descriptions.Item>
      <Descriptions.Item label="Email" span={2}>
        {email}
      </Descriptions.Item>
      <Descriptions.Item label="Date">{bookDate}</Descriptions.Item>
      <Descriptions.Item label="Time">{time}</Descriptions.Item>
    </Descriptions>
  );
}

export default BookCard;
