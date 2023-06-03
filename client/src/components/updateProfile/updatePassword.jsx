import React, { Fragment } from "react";

import { Button, Form, Input } from "antd";

const UpdatePassword = () => {
  const onUpdatePassword = async (values) => {
    console.log(values);
  };
  return (
    <Fragment>
      <h2 className="heading-secondary ma-bt-md">Password change</h2>
      <Form
        name="update-password"
        className="login-form"
        onFinish={onUpdatePassword}
        style={{
          maxWidth: 600,
          margin: "2rem auto",
        }}
      >
        <Form.Item
          name="passwordCurrent"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Please input your current password!",
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
          name="password"
          label="New Password"
          tooltip="Your new password please include 1 uppercase, 1 number, and larger than 8 characters"
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
          name="passwordConfirm"
          label="Confirm New Password"
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
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Save Change
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default UpdatePassword;
