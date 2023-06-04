import Helmet from "../components/Helmet";
import React, { useState } from "react";

// import DateTimePicker from "react-datetime-picker";
import PickDate from "../components/fittingSession/PickDate";
import PickTime from "../components/fittingSession/PickTime";

function Booking() {
  const [value, onChange] = useState(new Date());
  return (
    <Helmet title="Booking">
      <PickDate></PickDate>
      <PickTime></PickTime>
    </Helmet>
  );
}

export default Booking;
