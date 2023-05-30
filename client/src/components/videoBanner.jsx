import React, { Fragment, useEffect, useRef } from "react";

import video from "../assets/images/banner/Uptown-banner.mp4";
import topLeft from "../assets/images/banner/left-top.png";
import topRight from "../assets/images/banner/right-top.png";
import bottomImg from "../assets/images/banner/bottom.png";

export default function VideoBanner() {
  const divRef = useRef(null);
  const videoRef = useRef(null);

  const setMinHeight = () => {
    const videoHeight = videoRef.current.offsetHeight;
    const videoWidth = videoRef.current.offsetWidth;
    divRef.current.style.height = `${videoHeight}px`;
    divRef.current.style.width = `${videoWidth}px`;
  };

  useEffect(() => {
    const images = document.querySelectorAll(".bannerImg");
    const videoContainer = document.querySelector(".videoBanner");

    videoContainer.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX - videoContainer.offsetLeft;
      const translateX = (mouseX / videoContainer.offsetWidth) * 0.8;
      images.forEach((image) => (image.style.transform = `translate(${translateX}%)`));
    });

    setMinHeight();
    window.addEventListener("load", setMinHeight);
    window.addEventListener("resize", setMinHeight);
    return () => {
      window.removeEventListener("resize", setMinHeight);
    };
  }, []);

  return (
    <Fragment>
      <div ref={divRef} className="videoBanner">
        <video ref={videoRef} autoPlay muted loop id="myVideo">
          <source src={video} type="video/mp4" />
        </video>
        <img className="bannerImg" id="topLeftImg" src={topLeft} alt="" />
        <img className="bannerImg" id="topRightImg" src={topRight} alt="" />
        <img className="bannerImg" id="bottomImg" src={bottomImg} alt="" />
      </div>
    </Fragment>
  );
}
