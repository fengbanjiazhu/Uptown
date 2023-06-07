import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { UserOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;
const { Item } = Menu;

import Profile from "../components/Profile";
import MyOrders from "../components/updateProfile/MyOrders";

export default function Me() {
  const userToken = useSelector((state) => state.userInfo.value.token);
  const [component, setComponent] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!userToken) return;
    const fetchUser = async () => {
      const res = await fetch("http://localhost:4000/api/user/Me", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const data = await res.json();
      setUserData(data.currentUser);
    };
    fetchUser();
  }, [userToken]);

  const handleClick = (component) => {
    setComponent(component);
  };

  return (
    <Layout
      style={{
        minHeight: "50vh",
      }}
    >
      <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Item
            key={"profile"}
            onClick={() => {
              handleClick("profile");
            }}
          >
            <UserOutlined /> Profile
          </Item>
          <Item
            key={"order"}
            onClick={() => {
              handleClick("order");
            }}
          >
            <SnippetsOutlined /> Orders
          </Item>
          {/* <Item key={"update"}>1</Item> */}
          {/* <Item key={"update"}>1</Item> */}
        </Menu>
      </Sider>

      <Layout>
        <Content
          style={{
            padding: "1rem",
            background: "white",
          }}
        >
          <div
            style={{
              minHeight: 360,
              background: "white",
            }}
          >
            {component === "profile" && userData && <Profile user={userData}></Profile>}
            {component === "order" && userData && <MyOrders></MyOrders>}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
