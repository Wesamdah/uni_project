import React from "react";
import LatestSensorValues from "../Components/LatestSensorValues";

export default function StatsPage() {
  return (
    <div className="flex-1 p-6 bg-gradient-to-tr from-[#e3f2fd] via-[#dcedc8] to-[#ffffff]">
      <h2 className="text-xl font-bold mb-4 text-gray-700">📈 Sensor Stats</h2>
      <LatestSensorValues />
    </div>
  );
}
