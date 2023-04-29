import { Map } from "leaflet";
import React, { useRef } from "react";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useGeoLocation from "../../hooks/useGeoLocation";

const markerIcon = new L.Icon({
  iconUrl: require("../../assets/images/marker.png"),
  iconSize: [45, 45],
  iconAnchor: [17, 46],
  popupAnchor: [3, -46],
});

const Basic = () => {
  const [center, setCenter] = useState({ lat: 35.699711, lng: 51.33758 });
  const ZOOM_LEVEL = 16;
  const mapRef = useRef();
  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.leafletElement.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  return (
    <div>
      <MapContainer
        style={{ height: "400px" }}
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />

        {location.loaded && !location.error && (
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={markerIcon}
          >
            <Popup>
              <b>First Marker</b>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <div>
        <div>
          <button onClick={showMyLocation}>Locate Me</button>
        </div>
      </div>
    </div>
  );
};

export default Basic;
