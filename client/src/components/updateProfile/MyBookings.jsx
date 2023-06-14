import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";

function MyBookings() {
  const [bookings, setBookings] = useState(null);
  const { token } = useSelector((state) => state.userInfo.value);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/api/getMyBooking/?session=measuring", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBookings(data.datas);
    };
    fetchData();
  }, [token]);

  return (
    <Fragment>
      {bookings &&
        bookings.map((booking, index) => (
          <BookCard key={index} index={index} measure={booking}></BookCard>
        ))}
      {!bookings && <h2>There are no bookings</h2>}
    </Fragment>
  );
}

export default MyBookings;
