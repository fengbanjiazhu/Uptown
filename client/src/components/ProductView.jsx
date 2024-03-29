import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import { addItem } from "../redux/shopping-cart/cartItemsSlide";

import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";

const ProductView = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let product = props.product;

  if (product === undefined)
    product = {
      title: "",
      price: "",
      image01: null,
      image02: null,
      categorySlug: "",
      colors: [],
      slug: "",
      size: [],
      description: "",
    };

  const [previewImg, setPreviewImg] = useState(product.img01);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);

  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.img01);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
  }, [product]);

  const check = () => {
    if (color === undefined) {
      alert("Please select a color");
      return false;
    }

    if (size === undefined) {
      alert("Please select a size");
      return false;
    }

    return true;
  };

  const addToCart = () => {
    if (check()) {
      let newItem = {
        slug: product.slug,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        console.log("success");
      } else {
        alert("Something went wrong, please try again later");
      }
    }
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div className="product__images__list__item" onClick={() => setPreviewImg(product.img01)}>
            <img src={`${process.env.PUBLIC_URL}/images/products/${product.img01}`} alt="" />
          </div>
          <div className="product__images__list__item" onClick={() => setPreviewImg(product.img02)}>
            <img src={`${process.env.PUBLIC_URL}/images/products/${product.img02}`} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={`${process.env.PUBLIC_URL}/images/products/${previewImg}`} alt="" />
        </div>
        <div className={`product-description ${descriptionExpand ? "expand" : ""}`}>
          <div className="product-description__title">Product details</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
              {descriptionExpand ? "Show less" : "Show more"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">{numberWithCommas(product.price)}</span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Color</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${color === item ? "active" : ""}`}
                onClick={() => setColor(item)}
              >
                <div className={`circle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Size</div>
          <div className="product__info__item__list">
            {product.size.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${size === item ? "active" : ""}`}
                onClick={() => setSize(item)}
              >
                <span className="product__info__item__list__item__size">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Quantity</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">{quantity}</div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={() => addToCart()}>Add to cart</Button>
          <Button onClick={() => goToCart()}>Go to cart</Button>
        </div>
      </div>
      <div className={`product-description mobile ${descriptionExpand ? "expand" : ""}`}>
        <div className="product-description__title">Product details</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <div className="product-description__toggle">
          <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
            {descriptionExpand ? "Show Less" : "Show more"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
