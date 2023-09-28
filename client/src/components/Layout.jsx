import React from "react";

import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";

const Layout = ({ props }) => {
  return (
    <>
      <Header {...props} />
      <div className="container">
        <div className="main">
          <Outlet />
        </div>
      </div>
      <Footer />
      <ProductViewModal />
    </>
  );
};

export default Layout;
