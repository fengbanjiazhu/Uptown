import React from "react";

import { Link } from "react-router-dom";
import button from "./Button";

import Grid from "./Grid";

import logo from "../assets/images/Logo-2.png";

const footerAboutLinks = [
  {
    display: "Delivery",
    path: "/about",
  },
  {
    display: "Measuring",
    path: "/about",
  },
  {
    display: "Returns & Exchanges",
    path: "/about",
  },
  {
    display: "Returns & Exchanges",
    path: "/about",
  },
  {
    display: "Privacy Policy",
    path: "/about",
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
    path: "/about",
  },
];
const Footer = () => {
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
              <input></input> <button className="subscribeBtn">Subscribe</button>
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
              stylish designs using re-used materials. With a focus on sustainability, Uptown
              revolutionizes the industry by reducing waste and minimizing environmental impact.
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
