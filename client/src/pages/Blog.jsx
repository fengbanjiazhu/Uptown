import React from "react";
import Helmet from "../components/Helmet";
import { Card, Space, Layout, Typography } from "antd";
const { Title, Paragraph, Text, Link } = Typography;

const { Sider, Content } = Layout;

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const strong =
  "In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.";

const images = [
  "Uptown_Pr_Denim0001.jpeg",
  "Uptown_Pr_Glasses0006.jpeg",
  "Uptown_Pr_Sneakers0016.jpg",
  "Uptown_Pr_Denim0004.jpg",
];

const contentStyle = {
  textAlign: "center",
  lineHeight: "20px",
  backgroundColor: "white",
};
const siderStyle = {
  backgroundColor: "#989393",
};

function Blog() {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        paddingTop: "1rem",
        display: "flex",
      }}
    >
      {images.map((image, index) => (
        <Card title={`Date ${index + 1}`} size="small" key={index}>
          <Layout>
            <Sider style={siderStyle}>
              <img
                src={`${process.env.PUBLIC_URL}/images/blog/${image}`}
                alt={`story image ${index}`}
              />
            </Sider>
            <Content style={contentStyle}>
              <Typography>
                <Title>News Title</Title>
                <Paragraph>{text}</Paragraph>
                <Paragraph>
                  <Text strong>{strong}</Text>
                </Paragraph>
              </Typography>
            </Content>
          </Layout>
        </Card>
      ))}
    </Space>
  );
}

export default Blog;
