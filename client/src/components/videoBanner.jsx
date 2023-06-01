import React, { Fragment, useEffect, useRef } from "react";

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
          <source
            src={`${process.env.PUBLIC_URL}/images/banner/Uptown-banner.mp4`}
            type="video/mp4"
          />
        </video>
        <img
          className="bannerImg"
          id="topLeftImg"
          src={`${process.env.PUBLIC_URL}/images/banner/left-top.png`}
          alt=""
        />
        <img
          className="bannerImg"
          id="topRightImg"
          src={`${process.env.PUBLIC_URL}/images/banner/right-top.png`}
          alt=""
        />
        <img
          className="bannerImg"
          id="bottomImg"
          src={`${process.env.PUBLIC_URL}/images/banner/bottom.png`}
          alt=""
        />
      </div>
    </Fragment>
  );
}
