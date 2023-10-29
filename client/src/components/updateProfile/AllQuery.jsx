import React from "react";
import { useSelector } from "react-redux";
import QueryCard from "./QueryCard";
import { urlBooking } from "../../api";

import { useGetData } from "../../hooks/useFetchData";
import LoadingSpinner from "../LoadingSpinner";
import { Alert } from "antd";

function AllQuery(prop) {
  const { token } = useSelector((state) => state.userInfo.value);
  const { data, isLoading, error } = useGetData(`${urlBooking}/?session=query`, token);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Alert message={error} type="error" />;

  const queries = data?.datas;
  const emptyQueries = queries?.length < 1;

  return (
    <>
      {queries &&
        !emptyQueries &&
        queries.map((query, index) => (
          <QueryCard key={index} index={index} query={query} showBtn={true}></QueryCard>
        ))}
      {emptyQueries && <h2>There are no Queries</h2>}
    </>
  );
}
export default AllQuery;
