import Home from "../Pages/Home";
import DashboardLayout from "../Pages/Layout/DashboardLayout";
import ChartPage from "../Pages/ChartPage";
import StatsPage from "../Pages/StatsPage";
import SettingsPage from "../Pages/SettingsPage";
import AlertsLog from "../Pages/AlertsLog";
import Gps from "../Pages/Gps";

export const routes = [
  {
    element: <Home />,
    path: "/",
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "chart", element: <ChartPage /> },
      { path: "stats", element: <StatsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "alerts", element: <AlertsLog /> },
      { path: "location", element: <Gps /> },
    ],
  },
  {
    path: "*",
    element: <div className="p-8 text-lg">Page not found</div>,
  },
];
