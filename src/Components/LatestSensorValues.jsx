import React, { useContext } from "react";
import { SensorContext } from "../Context/SensorContext";

export default function LatestSensorValues() {
  const { latestData } = useContext(SensorContext);

  return (
    <div className="bg-white shadow-md rounded p-4 text-sm">
      <h2 className="text-lg font-bold mb-3">Latest Sensor Values</h2>
      {latestData ? (
        <ul className="space-y-1">
          {Object.entries(latestData)
            .filter(([key]) => key.startsWith("sensor"))
            .map(([sensor, value]) => (
              <li
                key={sensor}
                className="flex gap-3 items-center justify-start"
              >
                <span className="font-semibold p-2">
                  {sensor.toUpperCase()} :
                </span>{" "}
                {value.toFixed(2)} cm
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-gray-500">Waiting for data...</p>
      )}
    </div>
  );
}
