import React from "react";
import PropTypes from "prop-types";

import { Link, useNavigate } from "react-router-dom";

import Button from "./Button";

import numberWithCommas from "../utils/numberWithCommas";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/catalog/${props.id}`);
  };

  return (
    <div className="product-card">
      <Link to={`/catalog/${props.id}`}>
        <div className="product-card__image">
          <img src={`${process.env.PUBLIC_URL}/images/products/${props.img01}`} alt="" />
          <img src={`${process.env.PUBLIC_URL}/images/products/${props.img02}`} alt="" />
        </div>
        <h3 className="product-card__name">{props.name}</h3>
        <div className="product-card__price">${numberWithCommas(props.price)}</div>
      </Link>
      <div className="product-card__btn">
        <Button size="sm" icon="bx bx-cart" animate={true} onClick={handleClick}>
          <Link to={`/catalog/${props.id}`}>Add to cart</Link>
        </Button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductCard;
