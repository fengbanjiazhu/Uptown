import React, { useEffect, useState } from "react";
import { Modal, Input, Form, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearCart } from "../redux/shopping-cart/cartItemsSlide";
import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import checkLength from "../utils/checkLength";
import sendJsonData from "../utils/sendJsonData";

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
  const { _id } = useSelector((state) => state.userInfo.value);
  const cartItems = useSelector((state) => state.cartItems.value);
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState(getCartItemsInfo(products, cartItems));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);

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
      const data = await sendJsonData("http://localhost:4000/api/order/checkout-intent/", cartData);
      if (data.status !== "success") throw new Error(data.message);
      dispatch(clearCart());
      setCartProducts(null);
      localStorage.removeItem("cartItems");
      history.push(`/payment/${data.clientSecret}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const checkOut = () => {
    if (!name || !email || !address || totalProducts === 0)
      return alert("detail or cart can not be empty");

    const cartData = {
      total: totalPrice,
      items: cartProducts,
      name,
      email,
      address,
    };
    if (_id) {
      cartData.user = _id;
    }
    sendOrder(cartData);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleOk = () => {
    showModal();
  };

  const handleAddress = (e) => {
    const address = checkLength(e.target.value);
    setAddress(address);
  };

  const handleEmail = (e) => {
    const email = checkLength(e.target.value);
    setEmail(email);
  };
  const handleName = (e) => {
    const name = checkLength(e.target.value);
    setName(name);
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
            <Form layout="horizontal">
              <Form.Item name="name" label="Name">
                <Input onChange={handleName} placeholder="enter Name" />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input onChange={handleEmail} type="email" placeholder="enter Email" />
              </Form.Item>
              <Form.Item name="address" label="Address">
                <Input onChange={handleAddress} placeholder="Enter Address" />
              </Form.Item>
            </Form>
          </Modal>

          <div className="cart__info__btn">
            <Button
              onClick={handleOk}
              size="large"
              type="primary"
              block
              disabled={Boolean(totalProducts === 0)}
            >
              PLACE ORDER
            </Button>
            <Link to="/catalog">
              <Button block size="large" type="primary">
                CONTINUE SHOPPING
              </Button>
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
