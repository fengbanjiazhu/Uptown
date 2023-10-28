import React from "react";
import { useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { userAction } from "../redux/user/userInfoSlice";
import sendJsonData from "../utils/sendJsonData";
import { urlUser } from "../api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const data = await sendJsonData(`${urlUser}/login`, values);
      console.log(data);
      if (data.status !== "success") throw new Error(data.message);
      alert("Login successful!");

      const userData = {
        name: data.data.user.name,
        _id: data.data.user._id,
        role: data.data.user.role,
        token: data.token,
      };
      if (values.remember) localStorage.setItem("jwtToken", data.token);
      dispatch(userAction.setUser(userData));
      navigate("/");
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
      <Form.Item>
        <h1 style={{ textAlign: "center" }}>Login</h1>
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
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
        label="Password"
        tooltip="Password include at least 1 uppercase, 1 number, and larger than 8 characters"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot blue" href="">
          Forgot password
        </a> */}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>{" "}
        Or{" "}
        <Link to="/signup">
          <a className="blue" href="">
            register now!
          </a>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
