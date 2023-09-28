import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Space } from "antd";
import Grid from "./Grid";
import logo from "../assets/images/Logo-2.png";

const footerAboutLinks = [
  {
    display: "Delivery",
    path: "/about/Shipping",
  },
  {
    display: "Measuring",
    path: "/about/Measuring",
  },
  {
    display: "Returns & Exchanges",
    path: "/about/Policies",
  },
  {
    display: "Privacy Policy",
    path: "/about/Policies",
  },
];

const footerCustomerLinks = [
  {
    display: "Story",
    path: "/about",
  },
  {
    display: "Our Process",
    path: "/about",
  },
  {
    display: "Blog & News",
    path: "/blog",
  },
];
const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const navigate = useNavigate();

  const handleSetSubscribeEmail = (e) => {
    const email = e.target.value;
    setSubscribeEmail(email);
  };

  const handleSubscribe = async () => {
    console.log(subscribeEmail);
    try {
      const res = await fetch("http://localhost:4000/api/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: subscribeEmail }),
      });
      const data = await res.json();
      if (data.status === "error") throw new Error(data.message);
      alert("Subscribe successful!🥳");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">Uptown</div>
            <div className="footer__content">
              <p>
                Address <strong>Surry Hills NSW 2010</strong>
              </p>
              <p>
                Phone <strong>02 0000 0000</strong>
              </p>
              <p>
                Email <strong>uptown@gmail.com</strong>
              </p>
            </div>
            <div>
              <Space.Compact size="small">
                <Input
                  type="email"
                  name="email"
                  onChange={handleSetSubscribeEmail}
                  placeholder="Email address"
                />
                <Button
                  style={{
                    color: "#d9bca3",
                  }}
                  ghost
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
              </Space.Compact>
            </div>
          </div>
          <div>
            <div className="footer__title">Terms</div>
            <div className="footer__content">
              {footerAboutLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">About Us</div>
            <div className="footer__content">
              {footerCustomerLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
              <div className="outsideLinks">
                <a href="https://www.instagram.com/">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="https://www.facebook.com/">
                  <i className="bx bxl-facebook-circle"></i>
                </a>
                <a href="https://twitter.com/">
                  <i className="bx bxl-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="footer__about">
            <p>
              <Link to="/">
                <img src={logo} className="footer__logo" alt="" />
              </Link>
            </p>
            <p>
              Uptown, founded in 2015 by Pierre and Mia, is a pioneering fashion brand that creates
              stylish designs using re-used materials with a focus on sustainability.
            </p>

            <p>{/* <i> &copy; Jeffrey & team members</i> */}</p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
