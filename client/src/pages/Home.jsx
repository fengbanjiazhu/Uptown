import React from "react";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import Section, { SectionBody } from "../components/Section";
import PolicyCard from "../components/PolicyCard";
import Grid from "../components/Grid";

import policy from "../assets/fake-data/policy";

import VideoBanner from "../components/videoBanner";

const Home = () => {
  const currentProtocol = window.location.href;
  console.log(currentProtocol);

  return (
    <div style={{ overflowX: "hidden" }} id="homeContainer">
      <Helmet title="Home">
        <VideoBanner />

        {/* policy section */}
        <Section>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {policy.map((item, index) => (
                <Link key={index} to="/about">
                  <PolicyCard name={item.name} description={item.description} icon={item.icon} />
                </Link>
              ))}
            </Grid>
          </SectionBody>
        </Section>
        {/* end policy section */}
      </Helmet>
    </div>
  );
};

export default Home;
