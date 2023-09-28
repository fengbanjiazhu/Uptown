import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Me from "../pages/Me";
import About from "../pages/About";
import Booking from "../pages/Booking";
import Payment from "./payment/Payment";
import Completion from "./payment/Completion";
import Blog from "../pages/Blog";

const Layout = () => {
  return (
    <>
      <Header {...props} />
      <div className="container">
        <div className="main">
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={Home} />
              <Route path="/catalog/:slug" element={Product} />
              <Route path="/catalog" element={Catalog} />
              <Route path="/cart" element={Cart} />
              <Route path="/signup" element={Signup} />
              <Route path="/login" element={Login} />
              <Route path="/contact" element={Contact} />
              <Route path="/me" element={Me} />
              <Route path="/about/:section" element={About} />
              <Route path="/about" element={About} />
              <Route path="/booking" element={Booking} />
              <Route path="/payment/:clientSecret" element={Payment} />
              <Route path="/completion" element={Completion} />
              <Route path="/blog" element={Blog} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <Footer />
      <ProductViewModal />
    </>
  );
};

export default Layout;
