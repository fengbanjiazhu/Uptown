const getAvailableTime = function (selectedTime) {
  const allTime = [
    "10:00",
    "10:20",
    "10:40",
    "11:00",
    "11:20",
    "11:40",
    "12:00",
    "12:20",
    "12:40",
    "13:00",
    "13:20",
    "13:40",
    "14:00",
    "14:20",
    "14:40",
    "15:00",
    "15:20",
    "15:40",
    "16:00",
    "16:20",
    "16:40",
    "17:00",
    "17:20",
    "17:40",
  ];
  const availableTime = allTime.filter((time) => !selectedTime.includes(time));
  return availableTime;
};
export default getAvailableTime;
