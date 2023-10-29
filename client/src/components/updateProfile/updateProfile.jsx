import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { urlUser } from "../../api";
import { usePostJsonData } from "../../hooks/useFetchData";
import { Spin } from "antd";

function UpdateProfile(props) {
  const userToken = useSelector((state) => state.userInfo.value.token);
  const { currentUser } = props;
  const { isLoading, fetchPostData } = usePostJsonData();

  const onFinish = async (values) => {
    try {
      const res = await fetchPostData(`${urlUser}/Me`, values, "PATCH", userToken);
      if (res.status !== "success") throw new Error(res.message);
      alert("Update successful!");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Fragment>
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
      <Form
        name="update-Profile"
        className="login-form"
        initialValues={{
          email: currentUser.email,
          name: currentUser.name,
          phone: currentUser.phone,
          address: currentUser.address ? currentUser.address : "",
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

        <Form.Item name="name" rules={[{ required: true, message: "Please input your full name" }]}>
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
          <Button
            disabled={isLoading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {isLoading ? <Spin /> : "Update Profile"}
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default UpdateProfile;
