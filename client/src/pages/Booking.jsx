import Helmet from "../components/Helmet";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Col, Divider, Row, Menu, Button, Modal, Input, Form } from "antd";
import getAvailableTime from "../utils/getAvailableTime";
import getSevenDays from "../utils/getNextSevenDays";
import checkLength from "../utils/checkLength";
import sendJsonData from "../utils/sendJsonData";

const dates = getSevenDays();

function Booking() {
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [availableTime, setAvailableTime] = useState();
  const history = useHistory();

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getBookedTime = async () => {
      const res = await fetch(`http://127.0.0.1:4000/api/measuring?date=${selectedDate}`);
      const data = await res.json();
      let times;
      times = data.datas[0] ? getAvailableTime(data.datas[0].time) : getAvailableTime([]);
      setAvailableTime(times);
    };

    getBookedTime();
  }, [selectedDate]);

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const bookMeasure = async () => {
    const bookingInfo = {
      email,
      name,
      session: "measuring",
      date: selectedDate,
      time: selectedTime,
    };
    const res = await sendJsonData("http://127.0.0.1:4000/api/booking", bookingInfo);
    if (res.status === "success") {
      setEmail(null);
      setName(null);
      setOpen(false);
      setSelectedDate(dates[0]);
      alert("Successful book a session!");
      history.push("/");
    } else {
      alert("Looks like someone else got the session first, please try another time");
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleEmail = (e) => {
    const email = checkLength(e.target.value);
    setEmail(email);
  };
  const handleName = (e) => {
    const name = checkLength(e.target.value);
    setName(name);
  };

  const handleMenuClick = (date) => {
    setSelectedDate(date);
  };

  const handleButtonClick = (time) => {
    setSelectedTime(time);
    showModal();
  };

  return (
    <Helmet title="Booking">
      {/* get all dates for next 7 days */}
      <Menu
        theme="light"
        mode="horizontal"
        items={dates.map((date, index) => {
          const key = index + 1;
          return {
            key,
            label: `${date}`,
            onClick: () => handleMenuClick(date),
          };
        })}
      />
      <Divider orientation="left">Select from available time :</Divider>

      {/* render selections */}
      <Row gutter={[16, 24]}>
        {availableTime &&
          availableTime.map((time, index) => (
            <Col className="gutter-row" key={index} span={6}>
              <Button
                block
                size="large"
                onClick={() => {
                  handleButtonClick(time);
                }}
              >
                {time}
              </Button>
            </Col>
          ))}
      </Row>

      {/* hiding modal and form */}

      <Modal
        title="Please enter your Detail"
        open={open}
        onOk={bookMeasure}
        onCancel={handleCancel}
      >
        <Form layout="horizontal">
          <Form.Item name="name" label="Name">
            <Input onChange={handleName} placeholder="enter Name" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input onChange={handleEmail} type="email" placeholder="enter Email" />
          </Form.Item>
        </Form>
      </Modal>
    </Helmet>
  );
}

export default Booking;
