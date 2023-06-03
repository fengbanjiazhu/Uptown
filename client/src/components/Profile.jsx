import React, { Fragment } from "react";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { userAction } from "../redux/user/userInfoSlice";

const Profile = (props) => {
  const currentUser = props.user;
  console.log(currentUser);

  const onFinish = async (values) => {
    console.log(values);
  };

  return (
    <Fragment>
      <div className="user-view__content">
        <div className="user-view__form-container">
          <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              email: currentUser.email,
              name: currentUser.name,
              phone: currentUser.phone,
            }}
            onFinish={onFinish}
            style={{
              maxWidth: 600,
              margin: "2rem auto",
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
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder={currentUser.email}
              />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your full name" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="text"
                placeholder={currentUser.name}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Please input your phone number" }]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                type="number"
                placeholder={currentUser.phone}
              />
            </Form.Item>

            <Form.Item name="address">
              <Input
                prefix={<HomeOutlined className="site-form-item-icon" />}
                type="text"
                placeholder="Please enter your address"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Save Change
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="user-view__form-container">
          <h2 className="heading-secondary ma-bt-md">Password change</h2>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
