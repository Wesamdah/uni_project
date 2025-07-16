import React, { useContext, useEffect, useRef, useState } from "react";
import { SensorContext } from "../Context/SensorContext";

export default function AlertsLog() {
  const { latestData, alertLogs, setAlertLogs, gpsPoints } =
    useContext(SensorContext);

  const [selectedLog, setSelectedLog] = useState(null);
  const previousValues = useRef({});

  useEffect(() => {
    if (!latestData || gpsPoints.length === 0) return;

    const time = new Date().toLocaleTimeString("en-GB");
    // نبحث أولاً عن إحداثيات مصدرها ESP
    let latestCoord = [...gpsPoints].reverse().find((p) => p.source === "esp");

    // وإذا ما في، مناخد من API
    if (!latestCoord) {
      latestCoord = gpsPoints.at(-1);
    }

    Object.entries(latestData).forEach(([sensor, value]) => {
      const previous = previousValues.current[sensor];

      if (
        (value > 15 || value < 10) &&
        (previous === undefined || (previous >= 10 && previous <= 15))
      ) {
        const newAlert = {
          time,
          sensor,
          value: value.toFixed(2),
          status: value > 15 ? "high" : "low",
          lat: latestCoord.lat,
          lng: latestCoord.lng,
        };

        setAlertLogs((prev) => [newAlert, ...prev]);
        console.log("🔔 Alert Triggered:", newAlert);
      }

      previousValues.current[sensor] = value;
    });
  }, [latestData, gpsPoints]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">⚠️ Alerts Log</h2>

      <table className="w-full table-auto border border-collapse border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Sensor</th>
            <th className="p-2 border">Value</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Coordinates</th>
            <th className="p-2 border">Details</th>
          </tr>
        </thead>
        <tbody>
          {alertLogs.map((log, index) => (
            <tr
              key={index}
              className={
                log.status === "high"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }
            >
              <td className="p-2 border">{log.time}</td>
              <td className="p-2 border">{log.sensor.toUpperCase()}</td>
              <td className="p-2 border">{log.value} cm</td>
              <td className="p-2 border">
                {log.status === "high" ? "High ⚠️" : "Low ⚠️"}
              </td>
              <td className="p-2 border">
                {log.lat?.toFixed(6)}, {log.lng?.toFixed(6)}
              </td>
              <td className="p-2 border">
                <button
                  className="text-blue-600 underline hover:text-blue-900"
                  onClick={() => setSelectedLog(log)}
                >
                  Details 🔍
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ كارت التفاصيل */}
      {selectedLog && (
        <div className="mt-6 p-6 rounded-2xl shadow-lg bg-[#1b0b33] border border-[#2d1150] text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] text-center ">
          <div className="flex items-center justify-center w-full ">
            <div className=" mb-4 mr-2 w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 19.778l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Alert Details</h3>
          </div>

          <div className="text-gray-300 text-sm leading-relaxed">
            <p>
              <strong>Time:</strong> {selectedLog.time}
            </p>
            <p>
              <strong>Sensor:</strong> {selectedLog.sensor}
            </p>
            <p>
              <strong>Value:</strong> {selectedLog.value} cm
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedLog.status === "high" ? "High ⚠️" : "Low ⚠️"}
            </p>
            <p>
              <strong>Location:</strong> {selectedLog.lat?.toFixed(6)},{" "}
              {selectedLog.lng?.toFixed(6)}
            </p>
          </div>
          <button
            className="mt-3 px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={() => setSelectedLog(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
