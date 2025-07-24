import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AdminLayout from "./admin/AdminLayout";

// صفحة تسجيل دخول بسيطة للإدارة
function AdminLogin({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === "alma_super_secure_2025") {
      onAuth();
    } else {
      setError("كلمة السر خاطئة");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>تسجيل دخول الإدارة</h2>
      <input
        type="password"
        placeholder="أدخل كلمة السر"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 10, padding: 5 }}
      />
      <br />
      <button onClick={handleLogin}>دخول</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default function MainRouter() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/admin-login",
      element: (
        <AdminLogin onAuth={() => setIsAdminAuthenticated(true)} />
      ),
    },
    {
      path: "/admin",
      element: isAdminAuthenticated ? (
        <AdminLayout />
      ) : (
        <Navigate to="/admin-login" />
      ),
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
