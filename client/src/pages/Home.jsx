import React from "react";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import PolicyCard from "../components/PolicyCard";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";

import heroSliderData from "../assets/fake-data/hero-slider";
import policy from "../assets/fake-data/policy";
import productData from "../assets/fake-data/products";

import VideoBanner from "../components/videoBanner";

import banner from "../assets/images/banner.png";

const Home = () => {
  return (
    <Helmet title="Home">
      {/* <HeroSlider data={heroSliderData} control={true} auto={false} timeOut={5000} /> */}
      <VideoBanner />

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to="/policy">
                <PolicyCard name={item.name} description={item.description} icon={item.icon} />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}
    </Helmet>
  );
};

export default Home;
