import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import Button from "../components/Button";

import numberWithCommas from "../utils/numberWithCommas";

const getCartItemsInfo = (products, cartItems) => {
  let res = [];
  if (cartItems.length > 0 && products.length > 0) {
    cartItems.forEach((item) => {
      let product = products.find((product) => product.slug === item.slug);
      res.push({
        ...item,
        product: product,
      });
    });
  }
  return res.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
};

const Cart = () => {
  const products = useSelector((state) => state.productModal.value);
  const cartItems = useSelector((state) => state.cartItems.value);
  const [cartProducts, setCartProducts] = useState(getCartItemsInfo(products, cartItems));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  // console.log(token);

  useEffect(() => {
    setCartProducts(getCartItemsInfo(products, cartItems));
  }, [products]);

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0)
    );

    setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
  }, [cartProducts, cartItems]);

  const sendOrder = async (cartData) => {
    const res = await fetch("http://localhost:4000/api/booking/checkout-session/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: cartData,
    });
    const data = await res.json();
    console.log(data);
  };

  const checkOut = () => {
    const cartData = {
      total: totalPrice,
      items: cartProducts,
    };
    // console.log(cartData);
    const dataString = JSON.stringify(cartData);
    sendOrder(dataString);
  };

  return (
    <Helmet title="Uptown | Cart">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>You have {totalProducts} in your cart</p>
            <div className="cart__info__txt__price">
              <span>Total Price:</span> <span>{numberWithCommas(Number(totalPrice))}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button onClick={checkOut} size="block">
              Place order
            </Button>
            <Link to="/catalog">
              <Button size="block">Continue shopping</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartProducts && cartProducts.map((item, index) => <CartItem item={item} key={index} />)}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
