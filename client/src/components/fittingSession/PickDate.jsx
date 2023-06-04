import { DatePicker, theme } from "antd";
import moment from "moment";

const disabledDate = (current) => {
  const currentDate = moment().startOf("day");
  const twoWeeksLater = moment().add(2, "weeks").endOf("day");
  return current.isBefore(currentDate) || current.isAfter(twoWeeksLater);
};

const onPanelChange = (value, dateString) => {
  console.log(dateString);
};

const PickDate = () => {
  return (
    <div>
      <DatePicker disabledDate={disabledDate} fullscreen={false} onChange={onPanelChange} />
    </div>
  );
};
export default PickDate;
