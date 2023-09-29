import React, { useCallback, useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import Helmet from "../components/Helmet";
import Filter from "../components/Filter";

import InfinityList from "../components/InfinityList";
import { useSearchParams } from "react-router-dom";

const initFilter = {
  category: [],
  color: [],
  size: [],
};

const Catalog = () => {
  const productRedux = useSelector((state) => state.productModal.value);
  const [products, setProducts] = useState(productRedux);
  const [filter, setFilter] = useState(initFilter);
  const [searchParams] = useSearchParams();

  const filterCategory = searchParams.get("category") || "all";
  const filterColor = searchParams.get("color") || "all";
  const filterSize = searchParams.get("size") || "all";

  let filterCate;

  if (filterCategory === "all") filterCate = productRedux;
  if (filterCategory === "t-shirt")
    filterCate = productRedux.filter((item) => item.categorySlug === "T-shirt");
  if (filterCategory === "shirt")
    filterCate = productRedux.filter((item) => item.categorySlug === "shirt");
  if (filterCategory === "jeans")
    filterCate = productRedux.filter((item) => item.categorySlug === "jean");

  let filterCo;

  if (filterColor === "all") filterCo = filterCate;
  if (filterColor === "white")
    filterCo = filterCate.filter((item) => item.colors.includes("white"));
  if (filterColor === "pink") filterCo = filterCate.filter((item) => item.colors.includes("pink"));
  if (filterColor === "red") filterCo = filterCate.filter((item) => item.colors.includes("red"));
  if (filterColor === "yellow")
    filterCo = filterCate.filter((item) => item.colors.includes("yellow"));
  if (filterColor === "blue") filterCo = filterCate.filter((item) => item.colors.includes("blue"));
  if (filterColor === "orange")
    filterCo = filterCate.filter((item) => item.colors.includes("orange"));
  if (filterColor === "black")
    filterCo = filterCate.filter((item) => item.colors.includes("black"));

  let filterS;

  if (filterSize === "all") filterS = filterCo;
  if (filterSize === "s") filterS = filterCo.filter((item) => item.size.includes("s"));
  if (filterSize === "m") filterS = filterCo.filter((item) => item.size.includes("m"));
  if (filterSize === "l") filterS = filterCo.filter((item) => item.size.includes("l"));
  if (filterSize === "xl") filterS = filterCo.filter((item) => item.size.includes("xl"));
  if (filterSize === "xxl") filterS = filterCo.filter((item) => item.size.includes("xxl"));

  const clearFilter = () => {
    setFilter(initFilter);
    setProducts(productRedux);
  };

  const updateProducts = useCallback(() => {
    let temp = products;

    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categorySlug));
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) => filter.color.includes(color));
        return check !== undefined;
      });
    }

    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((size) => filter.size.includes(size));
        return check !== undefined;
      });
    }

    setProducts(temp);
  }, [filter]);

  useEffect(() => {
    setProducts(productRedux);
  }, [productRedux]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  return (
    <Helmet title="Uptown | Products">
      <div className="catalog">
        <div className="catalog__filter">
          <Filter
            filterField="category"
            options={[
              { value: "all", label: "All" },
              { value: "t-shirt", label: "T-shirt" },
              { value: "shirt", label: "Shirt" },
              { value: "jeans", label: "Jeans" },
            ]}
          />
          <Filter
            filterField="color"
            options={[
              { value: "all", label: "All" },
              { value: "white", label: "white" },
              { value: "pink", label: "pink" },
              { value: "black", label: "black" },
              { value: "yellow", label: "yellow" },
              { value: "orange", label: "orange" },
              { value: "blue", label: "blue" },
            ]}
          />

          <Filter
            filterField="size"
            options={[
              { value: "all", label: "All" },
              { value: "s", label: "S" },
              { value: "m", label: "M" },
              { value: "l", label: "L" },
              { value: "xl", label: "XL" },
              { value: "xxl", label: "XXL" },
            ]}
          />
        </div>

        <div className="catalog__content">
          <InfinityList data={filterS} />
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
