import React, { useRef, useEffect, useState, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Badge } from "antd";

import { set } from "../redux/product-modal/productModalSlice";
import { userAction } from "../redux/user/userInfoSlice";
import { fetchAllProducts } from "../api/productAPI";

import useLogout from "../hooks/useLogout";

import logo from "../assets/images/Logo-2.png";

const mainNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Collections",
    path: "/catalog",
  },
  {
    display: "Blog",
    path: "/blog",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const [count, setCount] = useState(0);

  const { token } = useSelector((state) => state.userInfo.value);
  const cartItems = useSelector((state) => state.cartItems.value);

  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const logout = useLogout();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) dispatch(userAction.setUser({ token }));
  }, []);

  useEffect(() => {
    setCount(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
  }, [cartItems, count]);

  useEffect(() => {
    const fetchDataHandler = async () => {
      const data = await fetchAllProducts();
      dispatch(set(data.datas));
    };

    fetchDataHandler();
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            {/* <div className="header__menu__item header__menu__right__item pointer">
              <i className="bx bx-search"></i>
            </div> */}
            <div className="header__menu__item header__menu__right__item pointer">
              <Link to="/about">
                <i className="bx bx-info-circle"></i>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item pointer">
              <Link to="/booking">
                <i className="bx bx-calendar"></i>
              </Link>
            </div>

            <div className="header__menu__item header__menu__right__item">
              <Badge size="small" color="#d9bca3" offset={[-1, 3]} count={count}>
                <Link to="/cart">
                  <i style={{ fontSize: "2.25rem" }} className="bx bx-shopping-bag"></i>
                </Link>
              </Badge>
            </div>
            {!token && (
              <Fragment>
                <div className="header__menu__item header__menu__right__item">
                  <Link to="/signup">
                    <i className="bx bx-edit"></i>
                  </Link>
                </div>
                <div className="header__menu__item header__menu__right__item">
                  <Link to="/login">
                    <i className="bx bx-log-in"></i>
                  </Link>
                </div>
              </Fragment>
            )}
            {token && (
              <Fragment>
                <div
                  className="header__menu__item header__menu__right__item pointer"
                  onClick={logout}
                >
                  <i className="bx bx-log-out"></i>
                </div>
                <div className="header__menu__item header__menu__right__item">
                  <Link to="/me">
                    <i className="bx bx-user"></i>
                  </Link>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
