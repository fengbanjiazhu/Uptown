import React from "react";
import { Typography } from "antd";
const { Title, Paragraph, Text } = Typography;

function ShippingInfo() {
  return (
    <Typography>
      <Title>Free Express shipping Australia wide</Title>
      <Paragraph>
        <Text strong>The following are just text template, I am too lazy to write</Text>
      </Paragraph>
      <Paragraph>
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved, which might cause designers and developers difficulties
        and duplication and reduce the efficiency of development.
      </Paragraph>
      <Paragraph>
        After massive project practice and summaries, Ant Design, a design language for background
        applications, is refined by Ant UED Team, which aims to uniform the user interface specs for
        internal background projects, lower the unnecessary cost of design differences and
        implementation and liberate the resources of design and front-end development.
      </Paragraph>
      <Title level={2}>3-day super fast delivery</Title>
      <Paragraph>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book.(<Text code>Sketch</Text> and{" "}
        <Text code>Axure</Text>) It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
        desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Paragraph>

      <Title level={2}>Free return</Title>
      <Paragraph>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </Paragraph>
    </Typography>
  );
}

export default ShippingInfo;
