import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function LeafLetMap() {
  return (
    <MapContainer
      center={[-33.88071693135796, 151.21478717372344]}
      zoom={18}
      scrollWheelZoom={false}
      style={{ height: "100%", zIndex: 90 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-33.8801169313596, 151.21478717372344]}>
        <Popup>We are here</Popup>
      </Marker>
    </MapContainer>
  );
}

export default LeafLetMap;
