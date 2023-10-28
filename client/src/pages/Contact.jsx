import Helmet from "../components/Helmet";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import ContactCard from "../components/contact/ContactCard";
import sendJsonData from "../utils/sendJsonData";
import LeafLetMap from "../components/contact/LeafLetMap";
import { urlBooking } from "../api";

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

const Contact = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const query = {
      ...values,
      session: "query",
    };
    try {
      const data = await sendJsonData(urlBooking, query);
      if (data.status !== "success") throw new Error(data.message);
      alert("Successful send query! We will contact you soon😊");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Helmet title="Uptown | Contact">
      <div id="map">
        <LeafLetMap></LeafLetMap>
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

          <Form.Item
            name={"message"}
            label="Message"
            rules={[
              {
                required: true,
              },
            ]}
          >
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
