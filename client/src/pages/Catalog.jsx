import React, { useCallback, useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import Helmet from "../components/Helmet";
import Filter from "../components/Filter";
import { filterArr, filterStr } from "../utils/filterHelper";

import InfinityList from "../components/InfinityList";
import { useSearchParams } from "react-router-dom";

const Catalog = () => {
  const productRedux = useSelector((state) => state.productModal.value);

  const [searchParams] = useSearchParams();

  const filterCategory = searchParams.get("category") || "all";
  const filterColor = searchParams.get("color") || "all";
  const filterSize = searchParams.get("size") || "all";

  const filterCate = filterStr(productRedux, filterCategory, "categorySlug");
  const filterCo = filterArr(filterCate, filterColor, "colors");
  const filterS = filterArr(filterCo, filterSize, "size");

  const clearFilter = () => {
    setProducts(productRedux);
  };

  return (
    <Helmet title="Uptown | Products">
      <div className="catalog">
        <div className="catalog__filter">
          <Filter
            filterField="category"
            options={[
              { value: "all", label: "All" },
              { value: "T-shirt", label: "T-shirt" },
              { value: "shirt", label: "Shirt" },
              { value: "jean", label: "Jean" },
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
