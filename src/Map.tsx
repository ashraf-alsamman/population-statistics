import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { State } from "./Reducer";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";

function Map() {
  const data = useSelector<State, State["data"]>(
    (state) => state.data,
    shallowEqual,
  );

  return (
    <>
      <MapContainer
        className="markercluster-map"
        center={[0, 0]}
        zoom={1}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Loop to get markers from redux updated by search by country or by region */}
        {data?.map((v) => (
          <Marker position={[v.lat, v.lng]} key={v.lng}>
            <Tooltip direction="right" offset={[-8, -2]} opacity={1} permanent>
              <span>{v.label} </span>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default Map;