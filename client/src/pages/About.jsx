import React from "react";
import Helmet from "../components/Helmet";
import { Link, useSearchParams } from "react-router-dom";
import { Breadcrumb, Menu, Layout } from "antd";

import StoryInfo from "../components/about/StoryInfo";
import MeasuringInfo from "../components/about/MeasuringInfo";
import PoliciesInfo from "../components/about/PoliciesInfo";
import ShippingInfo from "../components/about/ShippingInfo";

const { Content, Sider } = Layout;
const navs = ["Story", "Policies", "Shipping", "Measuring"];

function About() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParam = searchParams.get("about") || "Story";

  const handleMenuClick = (nav) => {
    searchParams.set("about", nav);
    setSearchParams(searchParams);
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
          <Content>{currentParam === "Story" && <StoryInfo></StoryInfo>}</Content>
          <Content>{currentParam === "Measuring" && <MeasuringInfo></MeasuringInfo>}</Content>
          <Content>{currentParam === "Policies" && <PoliciesInfo></PoliciesInfo>}</Content>
          <Content>{currentParam === "Shipping" && <ShippingInfo></ShippingInfo>}</Content>
        </Layout>
      </Layout>
    </Helmet>
  );
}

export default About;
