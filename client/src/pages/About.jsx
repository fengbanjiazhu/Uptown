import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import { useHistory, Link } from "react-router-dom";
import { Breadcrumb, Menu, Button, Modal, Layout } from "antd";
const { Content, Sider } = Layout;

const navs = ["Story", "Privacy", "Shipping", "Return", "Measuring"];

function About() {
  const [session, setSession] = useState("Story");
  const history = useHistory();

  const handleMenuClick = (nav) => {
    setSession(nav);
    console.log(session);
  };

  return (
    <Helmet title="About">
      <Layout
        style={{
          backgroundColor: "white",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>About</Breadcrumb.Item>
        </Breadcrumb>
      </Layout>
      <Layout>
        <Sider>
          <Menu
            theme="light"
            mode="vertical"
            style={{
              width: 180,
            }}
            items={navs.map((nav, index) => {
              const key = index + 1;
              return {
                key,
                label: `${nav}`,
                onClick: () => handleMenuClick(nav),
              };
            })}
          />
        </Sider>
        <Layout
          style={{
            backgroundColor: "white",
          }}
        >
          <Content>Test -- components</Content>
        </Layout>
      </Layout>
    </Helmet>
  );
}

export default About;
