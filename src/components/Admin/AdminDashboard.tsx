import React, { useState, useEffect } from "react";
import { useApp } from "../../contexts/AppContext";
import { Package, Wrench, TrendingUp, Users, Star } from "lucide-react";

// كلمة المرور المطلوبة للدخول
const ADMIN_PASSWORD = "ali98alma";

export function AdminDashboard() {
  const { products, services, settings } = useApp();
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (isAuthenticated === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuthenticated", "true");
      setAuthenticated(true);
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  };

  if (!authenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">تسجيل دخول الإدارة</h2>
          <input
            type="password"
            placeholder="كلمة المرور"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  // إحصائيات المنتجات والخدمات
  const totalProducts = products.length;
  const totalServices = services.length;
  const featuredProducts = products.filter(p => p.featured).length;
  const lowStockProducts = products.filter(p => p.stock <= 5).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  const stats = [
    {
      title: 'إجمالي المنتجات',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'إجمالي الخدمات',
      value: totalServices,
      icon: Wrench,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      title: 'منتجات مميزة',
      value: featuredProducts,
      icon: Star,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'منتجات قليلة المخزون',
      value: lowStockProducts,
      icon: TrendingUp,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">مرحباً بك في لوحة تحكم {settings.storeNameAr}</h2>
        <p className="text-sky-100">إدارة شاملة لمتجرك الإلكتروني</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-opacity-20`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${stat.textColor} mb-1`}>{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
