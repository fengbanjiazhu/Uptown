import React from "react";
import Helmet from "../components/Helmet";
import { useSearchParams } from "react-router-dom";
import { Menu, Layout } from "antd";

import StoryInfo from "../components/about/StoryInfo";
import MeasuringInfo from "../components/about/MeasuringInfo";
import PoliciesInfo from "../components/about/PoliciesInfo";
import ShippingInfo from "../components/about/ShippingInfo";

const { Content } = Layout;
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
      <Menu
        theme="light"
        mode="horizontal"
        style={{ justifyContent: "center" }}
        items={navs.map((nav, index) => {
          const key = index + 1;
          return {
            key,
            label: `${nav}`,
            onClick: () => handleMenuClick(nav),
          };
        })}
      />

      <Layout
        style={{
          backgroundColor: "white",
          marginTop: "1.5rem",
        }}
      >
        <Content>{currentParam === "Story" && <StoryInfo></StoryInfo>}</Content>
        <Content>{currentParam === "Measuring" && <MeasuringInfo></MeasuringInfo>}</Content>
        <Content>{currentParam === "Policies" && <PoliciesInfo></PoliciesInfo>}</Content>
        <Content>{currentParam === "Shipping" && <ShippingInfo></ShippingInfo>}</Content>
      </Layout>
    </Helmet>
  );
}

export default About;
