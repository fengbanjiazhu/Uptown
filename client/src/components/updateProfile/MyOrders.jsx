import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";

function MyOrders() {
  const [orders, setOrders] = useState(null);
  const { token } = useSelector((state) => state.userInfo.value);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/api/order/myOrder", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data.datas);
      setOrders(data.datas);
    };
    fetchData();
    console.log(orders);
  }, [token]);

  return (
    <Fragment>
      {/* {orders && <OrderCard order={orders[0]}>Got order</OrderCard>} */}
      {orders &&
        orders.map((order, index) => (
          <OrderCard index={index} order={order}>
            Got order
          </OrderCard>
        ))}
      {!orders && <h2>You have no orders</h2>}
    </Fragment>
  );
}

export default MyOrders;
