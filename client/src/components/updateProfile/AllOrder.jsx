import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { urlOrder } from "../../api";
import { useGetData } from "../../hooks/useFetchData";
import LoadingSpinner from "../LoadingSpinner";
import { Alert } from "antd";

function AllOrders() {
  const { token } = useSelector((state) => state.userInfo.value);

  const { data, isLoading, error } = useGetData(urlOrder, token);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Alert message={error} type="error" />;

  const orders = data?.datas;
  const emptyOrders = orders?.length < 1;

  return (
    <Fragment>
      {orders &&
        orders.map((order, index) => (
          <OrderCard key={index} index={index} order={order} showEmail={true}>
            Got order
          </OrderCard>
        ))}
      {emptyOrders && <h2>There are no orders</h2>}
    </Fragment>
  );
}

export default AllOrders;
