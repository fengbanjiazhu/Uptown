import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { urlOrder } from "../../api";

function AllOrders() {
  const [orders, setOrders] = useState(null);
  const { token } = useSelector((state) => state.userInfo.value);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(urlOrder, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOrders(data.datas);
    };
    fetchData();
  }, [token]);

  return (
    <Fragment>
      {orders &&
        orders.map((order, index) => (
          <OrderCard key={index} index={index} order={order} showEmail={true}>
            Got order
          </OrderCard>
        ))}
      {!orders && <h2>There are no orders</h2>}
    </Fragment>
  );
}

export default AllOrders;
