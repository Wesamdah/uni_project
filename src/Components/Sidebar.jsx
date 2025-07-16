import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-60 bg-white shadow-lg flex flex-col p-4">
      <h1 className="text-xl font-bold text-blue-700 mb-6">Sensor Dashboard</h1>

      <nav className="flex flex-col gap-4 text-gray-700 text-sm">
        <NavLink
          to="/dashboard/chart"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          📊 Live Chart
        </NavLink>

        <NavLink
          to="/dashboard/stats"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          📈 Stats
        </NavLink>

        <NavLink
          to="/dashboard/alerts"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          🚨 Alert Logs
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          ⚙️ Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
