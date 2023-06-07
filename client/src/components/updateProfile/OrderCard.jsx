import React from "react";
import { Descriptions, Card } from "antd";
import timeStrTransfer from "../../utils/timeStrToyTime";

function OrderCard(prop) {
  console.log(prop);
  const {
    address,
    createdAt,
    name,
    paid,
    payment_intent: paymentNo,
    price,
    product,
    _id: orderId,
  } = prop.order;
  const orderTime = timeStrTransfer(createdAt);

  return (
    <Descriptions style={{ marginBottom: "1rem" }} title={`Order ${prop.index + 1}`} bordered>
      <Descriptions.Item label="Customer Name">{name}</Descriptions.Item>
      <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
      <Descriptions.Item label="Payment Status">{paid ? "Done" : "Undone"}</Descriptions.Item>
      <Descriptions.Item label="Order time">{orderTime}</Descriptions.Item>
      <Descriptions.Item label="Payment Number" span={2}>
        {paymentNo}
      </Descriptions.Item>
      <Descriptions.Item label="Amount">${price}</Descriptions.Item>
      <Descriptions.Item label="Order Number" span={2}>
        {orderId}
      </Descriptions.Item>
      <Descriptions.Item label="Shipping Address" span={3}>
        {address}
      </Descriptions.Item>
      <Descriptions.Item label="Config Info">
        {product.map((el, index) => (
          <div key={index}>
            <p>
              Product {index + 1} Name: {el.title}
            </p>
            <p>
              Product {index + 1} Price: ${el.price}
            </p>
          </div>
        ))}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default OrderCard;
