import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Me from "../pages/Me";
import Payment from "../components/payment/Payment";
import Completion from "../components/payment/Completion";
import About from "../pages/About";
import Booking from "../pages/Booking";
import Blog from "../pages/Blog";

const Routes = () => {
  return (
    <Switch>
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
    </Switch>
  );
};

export default Routes;
