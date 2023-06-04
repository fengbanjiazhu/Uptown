import React from "react";
import GoogleMapReact from "google-map-react";

export default function ContactMap() {
  const defaultProps = {
    center: {
      lat: -33.88071693135796,
      lng: 151.21478717372344,
    },
    zoom: 16,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* <Marker position={{ lat: -33.88071693135796, lng: 151.21478717372344 }} /> */}
      </GoogleMapReact>
    </div>
  );
}
