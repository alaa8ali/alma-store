import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"; // الصفحة الرئيسية
import About from "./pages/About"; // مثال لصفحة ثانية

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
