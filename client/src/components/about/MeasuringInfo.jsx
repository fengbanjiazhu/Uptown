import React, { Fragment } from "react";
import { Card, Col, Row } from "antd";
import { useState } from "react";

const { Meta } = Card;

// const containerStyle = { display: "flex", maxWidth: "100%" };
const cardStyle = { width: 320, marginBottom: "1rem" };

const measureData = [
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_back_shoulder.jpeg`,
    title: "Back Shoulder Width",
    description:
      "Place the tape on 'top' of the shoulders. Measure from the edge of the left shoulder across to the prominent neck bone located at the center of the back of the neck continuing to the edge of the right shoulder",
  },
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_bust.jpeg`,
    title: "Bust",
    description:
      "Wrap the tape around the fullest part of your bust and center the tape on your back so it's levelled all the way around.",
  },
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_under_bust.jpeg`,
    title: "Under Bust",
    description:
      "Wrap the tape around your ribcage right below your bust. Make sure the tape is levelled all the way around.",
  },
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_mid_shoulder_singleton.jpeg`,
    title: "Mid-Shoulder to Bust Point",
    description:
      "With shoulders and arms relaxed, measure from mid-shoulder point down to the nipple. Please wear your bras when taking this measurement.",
  },
  //
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_waist.jpeg`,
    title: "Waist",
    description:
      " Run tape around natural waistline, keeping tape parallel with floor. Bend to one side to find natural indentation in torso. This is your natural waist.",
  },
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_hips.jpeg`,
    title: "Hips",
    description:
      "Wrap tape around the fullest part of your hips, which is usually 7-9' below your natural waistline. Keep tape parallel with floor all the way around.",
  },
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_hollow_to_hem.jpeg`,
    title: "Hollow to Floor",
    description:
      "Stand straight with bare fee together and measure from the center of the collarbone to somewhere depending on the dress style.",
  },
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_arm_circumference.jpeg`,
    title: "Arm Circumference",
    description:
      "This is a measurement around the fullest part of your upper arm, measure with the muscle relaxed.",
  },
  //
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_armscye.jpeg`,
    title: "Armscye",
    description:
      "In order to take your armscye measurement, you must wrap the measuring tape over the top of your shoulder and around under your armpit.",
  },
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_sleeve_length.jpeg`,
    title: "Sleeve Length",
    description:
      "Measure from your shoulder seam to desired sleeve length with your arm relaxed by your side to get the best possible measurement.",
  },
  {
    imgSrc: `${process.env.PUBLIC_URL}/images/about/measuring/measuring_wrist.jpeg`,
    title: "Wrist",
    description: "This is a measurement around the fullest part of your wrist.",
  },
];

function MeasuringInfo() {
  return (
    // <div className="measureContainer" style={containerStyle}>
    <Row justify="space-around" align="middle">
      {measureData.map((step, index) => (
        <Col xs={24} sm={20} md={16} lg={12} xl={8} key={index}>
          <Card
            hoverable
            style={cardStyle}
            key={index}
            cover={<img alt="example" src={`${step.imgSrc}`} />}
          >
            <Meta title={step.title} description={step.description} />
          </Card>
        </Col>
      ))}
    </Row>
    // </div>
  );
}

export default MeasuringInfo;
