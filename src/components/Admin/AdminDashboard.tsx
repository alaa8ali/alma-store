import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { AdminDashboard } from "./admin/AdminDashboard";

// رابط سري يصعب توقعه للوصول للوحة التحكم
const SECRET_ADMIN_PATH = "/alma-dashboard-743d1a0e1d";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: SECRET_ADMIN_PATH,
    element: <AdminDashboard />,
  },
]);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
