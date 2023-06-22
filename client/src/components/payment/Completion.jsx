import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import sendJsonData from "../../utils/sendJsonData";

function Completion() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [status, setStatus] = useState("Updating");
  const history = useHistory();

  let queryParams = {};

  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  useEffect(() => {
    const result = JSON.stringify(queryParams);
    if (result === "{}") return history.push("/");

    const updatePayment = async () => {
      try {
        const data = await sendJsonData(
          "http://localhost:4000/api/order/update-order-status/",
          queryParams
        );
        if (data.status !== "success") throw new Error(data.message);
        setStatus("Complete");
        queryParams = {};
        // setTimeout(() => {
        //   history.push("/");
        // }, 5000);
      } catch (error) {
        console.log(error);
      }
    };

    updatePayment();
  }, [queryParams]);

  // console.log(queryParams);

  return (
    <Fragment>
      {status === "Updating" && (
        <h1 className="order-status-hint">Please wait, we are updating your order status...</h1>
      )}
      {status === "Complete" && (
        <div>
          <h1 className="order-status-hint">Order completed! You will be direct to home page</h1>
          <p className="order-status-hint">You will receive an email about the order soon</p>
          <img src={`${process.env.PUBLIC_URL}/images/Thankyou.jpg`} alt="Thankyou image" />
        </div>
      )}
    </Fragment>
  );
}

export default Completion;
