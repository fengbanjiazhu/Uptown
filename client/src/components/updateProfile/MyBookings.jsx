import React from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";
import { urlBooking } from "../../api";
import { useGetData } from "../../hooks/useFetchData";
import LoadingSpinner from "../LoadingSpinner";
import { Alert } from "antd";

function MyBookings() {
  const { token } = useSelector((state) => state.userInfo.value);
  const { data, isLoading, error } = useGetData(
    `${urlBooking}/getMyBooking?session=measuring`,
    token
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Alert message={error} type="error" />;

  const bookings = data?.bookings;
  const emptyBookings = bookings?.length < 1;

  return (
    <>
      {bookings &&
        !emptyBookings &&
        bookings.map((booking, index) => (
          <BookCard key={index} index={index} measure={booking}></BookCard>
        ))}

      {emptyBookings && <h2>There are no bookings</h2>}
    </>
  );
}

export default MyBookings;
