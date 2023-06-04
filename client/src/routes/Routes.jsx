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

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/contact" component={Contact} />
      <Route path="/me" component={Me} />
      <Route path="/about" component={About} />
      <Route path="/booking" component={Booking} />
      <Route path="/payment/:clientSecret" component={Payment} />
      <Route path="/completion" component={Completion} />
    </Switch>
  );
};

export default Routes;
