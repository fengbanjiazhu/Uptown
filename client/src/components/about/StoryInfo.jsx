import React, { Fragment } from "react";
import { Carousel, Timeline } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
const contentStyle = {
  margin: "0 auto",
  width: "60vw",
};
const containerStyle = {
  textAlign: "center",
  marginBottom: "2rem",
};

function StoryInfo() {
  return (
    <Fragment>
      {/* images */}
      <Carousel style={containerStyle} autoplay>
        <div>
          <img
            style={contentStyle}
            src={`${process.env.PUBLIC_URL}/images/about/story-1.jpg`}
            alt="story image 1"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src={`${process.env.PUBLIC_URL}/images/about/story-2.jpg`}
            alt="story image 2"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src={`${process.env.PUBLIC_URL}/images/about/story-3.jpg`}
            alt="story image 3"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src={`${process.env.PUBLIC_URL}/images/about/story-4.jpg`}
            alt="story image 4"
          />
        </div>
      </Carousel>
      {/* Timeline  */}
      <Timeline
        mode="alternate"
        items={[
          {
            children:
              "2014, Uptown is founded by Mia and Pierre with a focus on sustainable fashion and recycling materials.",
          },
          {
            children:
              "2015 Uptown launches its first collection of clothing made from recycled materials.",
            color: "green",
          },
          {
            dot: (
              <ClockCircleOutlined
                style={{
                  fontSize: "16px",
                }}
              />
            ),
            children: `The end of 2015, The first Uptown store opens, featuring a range of trendy and eco-friendly fashion items. `,
          },
          {
            color: "red",
            children:
              "Uptown expands its product line to include accessories and footwear, all made from recycled and upcycled materials.",
          },
          {
            children:
              "Uptown collaborates with local designers to create limited-edition collections that showcase innovative use of recycled materials.",
          },
          {
            dot: (
              <ClockCircleOutlined
                style={{
                  fontSize: "16px",
                }}
              />
            ),
            children:
              "Uptown continues to grow its customer base, promoting sustainable fashion and raising awareness about recycling in the industry.",
          },
        ]}
      />
    </Fragment>
  );
}

export default StoryInfo;
