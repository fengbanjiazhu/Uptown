import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";

function AllBooking() {
  const [bookings, setBookings] = useState(null);
  const { token } = useSelector((state) => state.userInfo.value);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/api/booking/?session=measuring", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data.datas);
      setBookings(data.datas);
    };
    fetchData();
  }, [token]);

  return (
    <Fragment>
      {bookings &&
        bookings.map((booking, index) => <BookCard index={index} measure={booking}></BookCard>)}
      {!bookings && <h2>There are no bookings</h2>}
    </Fragment>
  );
}

export default AllBooking;
