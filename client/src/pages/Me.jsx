import React, { Fragment, useEffect, useState } from "react";

import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;
const { Item } = Menu;

import Profile from "../components/Profile";
import { useSelector } from "react-redux";

export default function Me() {
  const userToken = useSelector((state) => state.userInfo.value.token);
  const [component, setComponent] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  // const items = [
  //   getItem("Profile 1", "1", <UserOutlined />),
  //   getItem("Option 2", "2", <DesktopOutlined />),
  //   // getItem("User", "sub1", <UserOutlined />, [
  //   //   getItem("Tom", "3"),
  //   //   getItem("Bill", "4"),
  //   //   getItem("Alex", "5"),
  //   // ]),
  //   getItem("Team", "sub2", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8")]),
  //   getItem("Files", "9", <FileOutlined />),
  // ];

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

  const setProfile = () => {
    setComponent("profile");
  };

  const setOrder = () => {
    setComponent("order");
  };

  return (
    <Layout
      style={{
        minHeight: "50vh",
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Item key={"profile"} onClick={setProfile}>
            <UserOutlined /> Profile
          </Item>
          <Item key={"order"} onClick={setOrder}>
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
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
