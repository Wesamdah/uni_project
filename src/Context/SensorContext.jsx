import React, { createContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getDistance } from "geolib";

export const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
  const [latestData, setLatestData] = useState(null);
  const [sensorHistory, setSensorHistory] = useState([]);
  const [alertLogs, setAlertLogs] = useState([]);
  const [gpsPoints, setGpsPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastGpsTime = useRef(0);

  useEffect(() => {
    let socket;
    let retries = 1;

    const connect = () => {
      console.log("🔄 Trying to connect to WebSocket...");
      toast.info("🔄 جاري محاولة الاتصال بالحساس...");

      socket = new WebSocket("ws://192.168.3.122:81");

      socket.onopen = () => {
        console.log("✅ WebSocket connected");
        toast.success("✅ تم الاتصال بالحساس بنجاح");
        setLoading(false);
      };

      socket.onmessage = (event) => {
        const [payload, error] = event.data.split("|");
        if (!payload) return;

        const [sensorPart, gpsPart] = payload.split(";");
        if (!sensorPart || !gpsPart) return;

        const sensorValues = sensorPart.split(",").map(Number);
        const [lat, lng] = gpsPart.split(",").map(Number);
        const time = new Date().toLocaleTimeString("en-GB");

        const next = {
          time,
          sensor1: sensorValues[0],
          sensor2: sensorValues[1],
          sensor3: sensorValues[2],
          sensor4: sensorValues[3],
          sensor5: sensorValues[4],
          sensor6: sensorValues[5],
        };

        setLatestData(next);
        setSensorHistory((prev) => [...prev, { ...next }]);

        // ✅ إذا الموقع صالح من ESP نخزنه ونحدث وقت آخر تحديث
        if (lat && lng && !(lat === 0.0 && lng === 0.0)) {
          lastGpsTime.current = Date.now();
          setGpsPoints((prev) => {
            const last = prev.at(-1);
            const stepDistance = last
              ? getDistance(
                  { latitude: last.lat, longitude: last.lng },
                  { latitude: lat, longitude: lng }
                )
              : 0;

            return [
              ...prev,
              {
                lat,
                lng,
                time,
                distance: (last?.distance ?? 0) + stepDistance,
                source: "esp",
              },
            ];
          });
        }

        // ✅ سجل التنبيهات
        Object.entries(next).forEach(([sensor, value]) => {
          if (value > 15 || value < 10) {
            setAlertLogs((prev) => [
              {
                time,
                sensor,
                value,
                status: value > 15 ? "high" : "low",
                lat,
                lng,
              },
              ...prev,
            ]);
          }
        });
      };

      socket.onerror = () => console.error("❌ WebSocket error");
      socket.onclose = () => {
        setLoading(true);
        setTimeout(() => {
          retries += 1;
          connect();
          toast.info(`📡 إعادة محاولة الاتصال رقم ${retries}`);
        }, 5000);
      };
    };

    connect();
    return () => socket && socket.close();
  }, []);

  // ✅ احصل على الموقع من API كل 10 ثواني إذا ما في GPS من ESP
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = Date.now();
      const tenSecondsAgo = now - 10000;

      if (lastGpsTime.current < tenSecondsAgo) {
        try {
          const res = await axios.get("https://ipapi.co/json/");
          const { latitude: lat, longitude: lng } = res.data;
          const time = new Date().toLocaleTimeString("en-GB");

          lastGpsTime.current = now;

          setGpsPoints((prev) => {
            const last = prev.at(-1);
            const stepDistance = last
              ? getDistance(
                  { latitude: last.lat, longitude: last.lng },
                  { latitude: lat, longitude: lng }
                )
              : 0;

            return [
              ...prev,
              {
                lat,
                lng,
                time,
                distance: (last?.distance ?? 0) + stepDistance,
                source: "api",
              },
            ];
          });

          console.log("📍 الموقع من IP API:", lat, lng);
        } catch (err) {
          console.warn("❌ فشل API الموقع:", err.message);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SensorContext.Provider
      value={{
        latestData,
        sensorHistory,
        alertLogs,
        gpsPoints,
        setLatestData,
        setAlertLogs,
        setGpsPoints,
        loading,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
};
