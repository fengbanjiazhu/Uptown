import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import QueryCard from "./QueryCard";

const AllQuery = (prop) => {
  const [queries, setQueries] = useState(undefined);
  const { token } = useSelector((state) => state.userInfo.value);
  const [showForm, setShowForm] = useState(false);
  const [queryId, setQueryId] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("http://localhost:4000/api/booking/?session=query", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await res.json();
  //     console.log(data.datas);
  //     setQueries(data.datas);
  //   };
  //   fetchData();
  // }, [token]);

  return (
    <Fragment>
      <QueryCard></QueryCard>
      {/* 
      {queries &&
        queries.map((booking, index) => <BookCard index={index} measure={booking}></BookCard>)}
      {!queries && <h2>There are no Queries</h2>} */}
    </Fragment>
  );
};
export default AllQuery;
