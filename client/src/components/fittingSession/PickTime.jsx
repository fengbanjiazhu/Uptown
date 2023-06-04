import { useState } from "react";
import { TimePicker } from "antd";

const PickTime = () => {
  const [time, setTime] = useState();

  // ["10-20", "11-40","15-00"]
  const disableHelper = function (selectedHour) {};
  const handleSetTime = function (value, timeString) {
    console.log(timeString);
  };

  const disabledTime = () => {
    const disabledHours = () => {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 18, 19, 20, 21, 22, 23];
    };
    const disabledMinutes = () => {
      return [];
    };
    return {
      disabledHours,
      disabledMinutes,
    };
  };

  return (
    <TimePicker
      onChange={handleSetTime}
      disabledTime={disabledTime}
      format={"HH:mm"}
      minuteStep={20}
      hourStep={1}
    />
  );
};

export default PickTime;
