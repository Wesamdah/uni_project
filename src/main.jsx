import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SensorProvider } from "./Context/SensorContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { routes } from "./routes/routes";
const route = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SensorProvider>
      <RouterProvider router={route} />
      <ToastContainer />
    </SensorProvider>
  </StrictMode>
);
