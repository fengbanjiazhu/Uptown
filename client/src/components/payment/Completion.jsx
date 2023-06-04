import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Completion() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const queryParams = {};
  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  useEffect(() => {
    const result = JSON.stringify(queryParams);
    if (result === "{}") return;

    // const updatePayment = async () => {
    //   const data = await fetch();
    // };
    console.log("Fetch!");
  }, [queryParams]);

  console.log(queryParams);

  return <div>Completion! </div>;
}

export default Completion;
