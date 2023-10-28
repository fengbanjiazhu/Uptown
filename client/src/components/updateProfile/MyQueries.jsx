import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QueryCard from "./QueryCard";
import { urlBooking } from "../../api";

function MyQueries() {
  const [queries, setQueries] = useState(null);
  const { token } = useSelector((state) => state.userInfo.value);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${urlBooking}/getMyBooking?session=query`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setQueries(data.bookings);
    };
    fetchData();
  }, [token]);

  return (
    <Fragment>
      {queries &&
        queries.map((query, index) => (
          <QueryCard key={index} index={index} query={query} showBtn={false}></QueryCard>
        ))}
      {!queries && <h2>You have no Query</h2>}
    </Fragment>
  );
}

export default MyQueries;
