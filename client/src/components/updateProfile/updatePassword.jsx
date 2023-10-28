import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import useLogout from "../../hooks/useLogout";
import { urlUser } from "../../api";

const UpdatePassword = () => {
  const userToken = useSelector((state) => state.userInfo.value.token);
  const logout = useLogout();

  const onUpdatePassword = async (values) => {
    try {
      const updateData = JSON.stringify(values);
      const res = await fetch(`${urlUser}/updateMyPassword`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
        body: updateData,
      });
      const data = await res.json();
      if (data.status === 400) throw new Error(data.message);

      alert("Update successful!");
      logout();
    } catch (error) {
      alert(error.message);
    }
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
