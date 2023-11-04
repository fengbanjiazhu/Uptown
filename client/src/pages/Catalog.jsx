import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getAllProduct } from "../redux/product-modal/productModalSlice";

import { Button } from "antd";
import { filterArr, filterStr } from "../utils/filterHelper";

import Filter from "../components/Filter";
import Helmet from "../components/Helmet";
import LoadingSpinner from "../components/LoadingSpinner";
import InfinityList from "../components/InfinityList";

const Catalog = () => {
  const allProduct = useSelector(getAllProduct);
  const [searchParams, setSearchParams] = useSearchParams();

  const loaded = allProduct && allProduct.length > 1;

  const filterCategory = searchParams.get("category") || "all";
  const filterColor = searchParams.get("color") || "all";
  const filterSize = searchParams.get("size") || "all";

  const productAfterFilterCategory = filterStr(allProduct, filterCategory, "categorySlug");
  const productAfterFilterColor = filterArr(productAfterFilterCategory, filterColor, "colors");
  const productAfterFilterSize = filterArr(productAfterFilterColor, filterSize, "size");

  const clearFilter = () => {
    setSearchParams("color", "all");
    setSearchParams("size", "all");
    setSearchParams("category", "all");
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

          <div style={{ marginTop: 20 }}>
            <Button onClick={clearFilter}>Clear filed</Button>
          </div>
        </div>

        <div className="catalog__content">
          {!loaded && <LoadingSpinner />}
          {loaded && <InfinityList data={productAfterFilterSize} />}
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
