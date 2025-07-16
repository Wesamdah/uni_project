import React, { useState, useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { SensorContext } from "../Context/SensorContext";

const SensorChart = () => {
  const [visibleSensor, setVisibleSensor] = useState("all");
  const { sensorHistory } = useContext(SensorContext);
  const slicedHistory = sensorHistory.slice(-30);

  // ✅ تصدير PDF
  const exportToPdf = async () => {
    const chartElement = document.getElementById("chart-container");
    if (!chartElement) return;

    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("sensor_chart.pdf");
  };

  return (
    <div className="w-[calc(100vw_-_256px)] h-screen bg-gradient-to-t from-[#d1c4e9] via-[#bbdefb] to-[#e3f2fd] p-4">
      <div className="flex gap-4 mb-4 text-sm font-medium text-gray-800 justify-evenly w-full h-5">
        <label className="cursor-pointer">
          <input
            type="radio"
            value="all"
            checked={visibleSensor === "all"}
            onChange={(e) => setVisibleSensor(e.target.value)}
            className="mr-1 cursor-pointer"
          />
          All
        </label>
        {[1, 2, 3, 4, 5].map((num) => (
          <label key={num} className="cursor-pointer">
            <input
              type="radio"
              value={`sensor${num}`}
              checked={visibleSensor === `sensor${num}`}
              onChange={(e) => setVisibleSensor(e.target.value)}
              className="mr-1 cursor-pointer"
            />
            Sensor {num}
          </label>
        ))}
        <button
          onClick={exportToPdf}
          className="p-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition flex justify-between items-center"
        >
          Export as PDF
        </button>
      </div>

      <div id="chart-container" className="w-full h-[calc(100%_-_30px)]">
        <ResponsiveContainer>
          <AreaChart data={slicedHistory}>
            <defs>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <linearGradient
                  id={`g${num}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  key={num}
                >
                  <stop offset="0%" stopColor="#000" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#000" stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              interval={2}
              tick={{ fontSize: 12, fontWeight: "bold", fill: "#000" }}
              angle={0}
              textAnchor="end"
            />
            <YAxis
              domain={[5, 20]}
              unit=" cm"
              tick={{ fontSize: 14, fontWeight: "bold", fill: "#000" }}
            />
            <Tooltip />
            {[1, 2, 3, 4, 5, 6].map(
              (num) =>
                (visibleSensor === "all" ||
                  visibleSensor === `sensor${num}`) && (
                  <Area
                    key={num}
                    type="monotone"
                    dataKey={`sensor${num}`}
                    stroke={
                      ["#ff0000", "#0000ff", "#00ff00", "#ffff00", "#ff00ff"][
                        num - 1
                      ]
                    }
                    fill={`url(#g${num})`}
                  />
                )
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorChart;
