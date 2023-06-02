import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import ProductView from "./ProductView";

import Button from "./Button";

import productData from "../assets/fake-data/products";

const ProductViewModal = () => {
  const productSlug = useSelector((state) => state.productModal.value);

  // console.log(productSlug);
  // const dispatch = useDispatch();

  const [product, setProduct] = useState(undefined);

  // useEffect(() => {
  //   setProduct(productData.getProductBySlug(productSlug));
  // }, [productSlug]);

  return (
    <div className={`product-view__modal ${product === undefined ? "" : "active"}`}>
      <div className="product-view__modal__content">
        <ProductView product={product} />
        <div className="product-view__modal__content__close"></div>
      </div>
    </div>
  );
};

export default ProductViewModal;
