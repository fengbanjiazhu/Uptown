import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Completion() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [status, setStatus] = useState("Updating");

  const queryParams = {};
  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  useEffect(() => {
    const result = JSON.stringify(queryParams);
    if (result === "{}") return;

    const updatePayment = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/order/update-order-status/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: result,
        });
        const data = await res.json();
        if (data.status !== "success") throw new Error(data.message);

        setStatus("Complete");
      } catch (error) {
        alert(error.message);
      }
    };

    updatePayment();
    console.log("Fetch!");
  }, [queryParams]);

  console.log(queryParams);

  return (
    <Fragment>
      {status === "Updating" && (
        <h1 className="order-status-hint">Please wait, we are updating your order status...</h1>
      )}
      {status === "Complete" && (
        <div>
          <h1 className="order-status-hint">Order completed! You will receive an email soon</h1>
          <img src={`${process.env.PUBLIC_URL}/images/Thankyou.jpg`} alt="Thankyou image" />
        </div>
      )}
    </Fragment>
  );
}

export default Completion;
