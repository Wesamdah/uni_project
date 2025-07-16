import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SensorContext } from "../../Context/SensorContext";
import LoadingOverlay from "./LoadingOverlay";

const navItems = [
  { label: "Live Chart", path: "/dashboard/chart" },
  { label: "Stats", path: "/dashboard/stats" },
  { label: "Settings", path: "/dashboard/settings" },
  { label: "Alert Logs", path: "/dashboard/alerts" },
  { label: "Locations", path: "/dashboard/location" },
];

const DashboardLayout = () => {
  const location = useLocation();
  const { loading } = useContext(SensorContext); // ✅ أخذ حالة التحميل

  return (
    <div className="flex h-screen relative">
      {/* ✅ شاشة التحميل */}
      {loading && <LoadingOverlay />}

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">📟 Sensor Dashboard</h1>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded hover:bg-gray-700 transition ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
