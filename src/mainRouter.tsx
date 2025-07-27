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
import AddProductForm from "./pages/Admin/AddProductForm"; // استيراد صفحة إضافة منتج

// صفحة تسجيل دخول بسيطة للإدارة
function AdminLogin({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === "ali98alma") {
      onAuth();
    } else {
      setError("❌ كلمة السر خاطئة");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-center text-xl font-bold text-gray-800">تسجيل دخول الإدارة</h2>
        <input
          type="password"
          placeholder="أدخل كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          دخول
        </button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </div>
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
      element: <AdminLogin onAuth={() => setIsAdminAuthenticated(true)} />,
    },
    {
      path: "/admin",
      element: isAdminAuthenticated ? <AdminLayout activeTab="dashboard" onTabChange={() => {}}>{null}</AdminLayout> : <Navigate to="/admin-login" />,
    },
    {
      path: "/admin/add",
      element: isAdminAuthenticated ? <AddProductForm /> : <Navigate to="/admin-login" />,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
