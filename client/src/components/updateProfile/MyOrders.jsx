import React from "react";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { urlOrder } from "../../api";

import { useGetData } from "../../hooks/useFetchData";
import LoadingSpinner from "../LoadingSpinner";
import { Alert } from "antd";

function MyOrders() {
  const { token } = useSelector((state) => state.userInfo.value);
  const { data, isLoading, error } = useGetData(`${urlOrder}/myOrder`, token);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Alert message={error} type="error" />;

  const orders = data?.datas;
  const emptyOrders = orders?.length < 1;

  return (
    <>
      {orders &&
        !emptyOrders &&
        orders.map((order, index) => (
          <OrderCard key={index} index={index} order={order}>
            Got order
          </OrderCard>
        ))}

      {emptyOrders && <h2>You have no orders</h2>}
    </>
  );
}

export default MyOrders;
