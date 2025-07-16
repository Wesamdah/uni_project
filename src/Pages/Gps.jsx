import React, { useContext, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import { SensorContext } from "../Context/SensorContext";
import L from "leaflet";

// ✅ لتحريك الخريطة تلقائيًا للآخر نقطة
function MapAutoFocus({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);

  return null;
}

// ✅ آيكونات مخصصة حسب المصدر
const espIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 25],
});

const apiIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png",
  iconSize: [25, 25],
});

export default function Gps() {
  const { gpsPoints } = useContext(SensorContext);

  const validPoints = gpsPoints.filter((p) => p.lat && p.lng);
  const last = validPoints.at(-1);

  useEffect(() => {
    if (last) {
      console.log(
        "📍 Current Location:",
        last.lat,
        last.lng,
        "source:",
        last.source
      );
    }
  }, [last]);

  return (
    <div className="w-screen h-screen ">
      <h2 className="text-xl font-bold">📍 GPS Track</h2>

      <MapContainer
        center={last ? [last.lat, last.lng] : [52.3676, 4.9041]}
        zoom={20}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {last && <MapAutoFocus lat={last.lat} lng={last.lng} />}

        {validPoints.length > 0 && (
          <>
            <Polyline
              positions={validPoints.map((p) => [p.lat, p.lng])}
              color="blue"
            />
            {validPoints.map((point, index) => (
              <Marker
                key={index}
                position={[point.lat, point.lng]}
                icon={point.source === "esp" ? espIcon : apiIcon}
              >
                <Popup>
                  <div>
                    <strong>Time:</strong> {point.time}
                    <br />
                    <strong>Distance:</strong> {point.distance?.toFixed(2) ?? 0}{" "}
                    m
                    <br />
                    <strong>Source:</strong> {point.source}
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>

      <div className="text-sm mt-2">
        <strong>Total Points:</strong> {validPoints.length} |{" "}
        <strong>Distance Travelled:</strong>{" "}
        {last ? last.distance.toFixed(2) : "0"} m
      </div>
    </div>
  );
}
