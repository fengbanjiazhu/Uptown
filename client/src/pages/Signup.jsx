import React from "react";
import { useHistory, Link } from "react-router-dom";

import { Button, Checkbox, Form, Input, Select } from "antd";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const dataString = JSON.stringify(values);
      const res = await fetch("http://localhost:4000/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataString,
      });
      const data = await res.json();
      if (data.status === "error") throw new Error(data.message);
      alert("Sign-up successful! You will be transfer into login page shortly...");
      history.push("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="61">+61</Option>
        <Option value="64">+64</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: "61",
      }}
      style={{
        maxWidth: 600,
        margin: "10rem auto",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        tooltip="Please include 1 uppercase, 1 number, and larger than 8 characters"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          ({}) => ({
            validator(_, value) {
              const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
              if (regex.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"
                )
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The two passwords that you entered do not match!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the{" "}
          <a className="black" href="">
            agreement
          </a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>{" "}
        Already have an account?{" "}
        <Link to="/login">
          <a className="blue" href="">
            login
          </a>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default Signup;
