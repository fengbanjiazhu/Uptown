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

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/catalog" component={Catalog} />
      {/* <Route path="/blog" component={Catalog} /> */}
      <Route path="/cart" component={Cart} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/contact" component={Contact} />
      <Route path="/me" component={Me} />
    </Switch>
  );
};

export default Routes;
