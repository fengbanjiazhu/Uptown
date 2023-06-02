import React from "react";
import { useDispatch } from "react-redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import { userAction } from "../redux/user/userInfoSlice";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const dataString = JSON.stringify(values);
      const res = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataString,
      });
      const data = await res.json();
      if (data.status === "error") throw new Error(data.message);
      alert("Login successful!");
      console.log();
      console.log();
      const userData = {
        user: data.data.user,
        token: data.token,
      };

      dispatch(userAction.setUser(userData));

      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        margin: "10rem auto",
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          { required: true, message: "Please input your Email!" },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>{" "}
        Or{" "}
        <a className="black" href="">
          register now!
        </a>
      </Form.Item>
    </Form>
  );
};

export default Login;
