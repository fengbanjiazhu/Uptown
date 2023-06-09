const getSevenDays = function () {
  const dates = [];
  const today = new Date();
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  for (let i = 1; i < 8; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000); // 每次增加一天的时间间隔
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const weekDay = weekdays[date.getDay()];

    const formattedDate = `${year}-${month}-${day} ${weekDay}`;
    dates.push(formattedDate);
  }
  return dates;
};

export default getSevenDays;
