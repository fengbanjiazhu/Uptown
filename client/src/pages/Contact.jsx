import Helmet from "../components/Helmet";
import { Button, Form, Input } from "antd";
import ContactMap from "../components/contact/ContactMap";
import ContactCard from "../components/contact/ContactCard";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

const onFinish = (values) => {
  console.log(values);
};

const Contact = () => {
  return (
    <Helmet title="Uptown | Contact">
      <div className="mapContainer">
        <ContactMap></ContactMap>
      </div>
      <div className="functionalContainer">
        <ContactCard></ContactCard>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
            margin: "1rem auto 0",
          }}
          validateMessages={validateMessages}
        >
          <Form.Item>
            <h3 className="contactTitle">Having problems? Contact us now</h3>
          </Form.Item>

          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name={"Message"} label="Message">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Helmet>
  );
};

export default Contact;
