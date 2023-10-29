import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { urlUser } from "../api";

import { UserOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Layout, Menu, Divider } from "antd";
const { Content, Sider } = Layout;
const { Item } = Menu;

import { useGetData } from "../hooks/useFetchData";
import { Alert } from "antd";

import Profile from "../components/Profile";
import MyOrders from "../components/updateProfile/MyOrders";
import MyQueries from "../components/updateProfile/MyQueries";
import MyBookings from "../components/updateProfile/MyBookings";

import AllOrders from "../components/updateProfile/AllOrder";
import AllBooking from "../components/updateProfile/AllBooking";
import AllQuery from "../components/updateProfile/AllQuery";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Me() {
  const userToken = useSelector((state) => state.userInfo.value.token);
  const [component, setComponent] = useState("profile");
  const [collapsed, setCollapsed] = useState(false);

  const { data, isLoading, error } = useGetData(`${urlUser}/Me`, userToken);
  if (!userToken || error) return <Alert message={"Please Check your login status"} type="error" />;

  const isAdmin = data?.currentUser.role === "admin";
  const userData = data?.currentUser;

  const handleClick = (component) => {
    setComponent(component);
  };
  const userMenu = [
    {
      title: "profile",
      icon: <UserOutlined />,
      label: "My Profile",
    },
    {
      title: "order",
      icon: <SnippetsOutlined />,
      label: "My Orders",
    },
    {
      title: "queries",
      icon: <SnippetsOutlined />,
      label: "My Queries",
    },
    {
      title: "bookings",
      icon: <SnippetsOutlined />,
      label: " My Bookings",
    },
  ];
  const adminMenu = [
    {
      title: "allOrder",
      icon: <SnippetsOutlined />,
      label: "All Orders",
    },
    {
      title: "allBookings",
      icon: <SnippetsOutlined />,
      label: " All Bookings",
    },
    {
      title: "allQueries",
      icon: <SnippetsOutlined />,
      label: " All allQueries",
    },
  ];

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
          {userMenu.map((item, index) => {
            return (
              <Item
                key={index + 1}
                onClick={() => {
                  handleClick(item.title);
                }}
              >
                {item.icon}
                {item.label}
              </Item>
            );
          })}

          {/* Admin area */}
          {isAdmin && (
            <>
              <Divider orientation="left">Admin area</Divider>
              {adminMenu.map((item, index) => {
                return (
                  <Item
                    key={index + 10}
                    onClick={() => {
                      handleClick(item.title);
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Item>
                );
              })}
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
            {isLoading && <LoadingSpinner />}

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
