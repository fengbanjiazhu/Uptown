import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { urlUser } from "../api";

import { UserOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Layout, Menu, Divider } from "antd";
const { Content, Sider } = Layout;
const { Item } = Menu;

import Profile from "../components/Profile";
import MyOrders from "../components/updateProfile/MyOrders";
import MyQueries from "../components/updateProfile/MyQueries";
import MyBookings from "../components/updateProfile/MyBookings";

import AllOrders from "../components/updateProfile/AllOrder";
import AllBooking from "../components/updateProfile/AllBooking";
import AllQuery from "../components/updateProfile/AllQuery";

export default function Me() {
  const userToken = useSelector((state) => state.userInfo.value.token);
  const [component, setComponent] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!userToken) return;
    const fetchUser = async () => {
      const res = await fetch(`${urlUser}/Me`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const data = await res.json();
      if (data.currentUser.role === "admin") {
        setIsAdmin(true);
      }

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
          <Divider orientation="left">Member</Divider>
          <Item
            key={1}
            onClick={() => {
              handleClick("profile");
            }}
          >
            <UserOutlined />
            My Profile
          </Item>
          <Item
            key={2}
            onClick={() => {
              handleClick("order");
            }}
          >
            <SnippetsOutlined />
            My Orders
          </Item>
          <Item
            key={3}
            onClick={() => {
              handleClick("queries");
            }}
          >
            <SnippetsOutlined />
            My Queries
          </Item>
          <Item
            key={4}
            onClick={() => {
              handleClick("bookings");
            }}
          >
            <SnippetsOutlined />
            My Bookings
          </Item>

          {/* Admin area */}
          {isAdmin && (
            <>
              <Divider orientation="left">Admin area</Divider>
              <Item
                key={30}
                onClick={() => {
                  handleClick("allOrder");
                }}
              >
                <SnippetsOutlined />
                All Orders
              </Item>
              <Item
                key={31}
                onClick={() => {
                  handleClick("allBookings");
                }}
              >
                <SnippetsOutlined />
                All Bookings
              </Item>
              <Item
                key={32}
                onClick={() => {
                  handleClick("allQueries");
                }}
              >
                <SnippetsOutlined />
                All Queries
              </Item>
            </>
          )}
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
            {component === "queries" && userData && <MyQueries></MyQueries>}
            {component === "bookings" && userData && <MyBookings></MyBookings>}

            {component === "allOrder" && isAdmin && <AllOrders></AllOrders>}
            {component === "allBookings" && isAdmin && <AllBooking></AllBooking>}
            {component === "allQueries" && isAdmin && <AllQuery></AllQuery>}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
