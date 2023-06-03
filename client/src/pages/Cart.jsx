import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/shopping-cart/cartItemsSlide";
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
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState(getCartItemsInfo(products, cartItems));
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    setCartProducts(getCartItemsInfo(products, cartItems));
  }, [products, cartItems]);

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0)
    );

    setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
  }, [cartProducts, cartItems, totalProducts]);

  const sendOrder = async (cartData) => {
    try {
      const res = await fetch("http://localhost:4000/api/booking/checkout-session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: cartData,
      });
      const data = await res.json();
      if (data.status !== 200) throw new Error(data.message);
      console.log(data);
      dispatch(clearCart());
      setOpen(false);
      alert("Success!");
    } catch (error) {
      alert(error.message);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const checkOut = () => {
    if (!address || totalProducts === 0) return alert("address or cart can not be empty");

    const cartData = {
      total: totalPrice,
      items: cartProducts,
      address,
    };
    const dataString = JSON.stringify(cartData);
    sendOrder(dataString);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleOk = () => {
    showModal();
  };

  const handleInputChange = (e) => {
    const address = e.target.value.trim();
    setAddress(address);
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
          <Modal
            title="Please enter your Address"
            open={open}
            onOk={checkOut}
            onCancel={handleCancel}
          >
            <Input onChange={handleInputChange} />
          </Modal>
          <div className="cart__info__btn">
            <Button onClick={handleOk} size="block">
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
