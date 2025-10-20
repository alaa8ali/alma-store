
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLogin() {
  

  useEffect(() => {
    // إعادة توجيه مباشرة إلى لوحة التحكم لتجاوز صفحة تسجيل الدخول
    // هذا التعديل لغرض التجريب فقط كما طلب المستخدم
    router.push('/admin/dashboard');
  }, [router]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  

// تم تعطيل دالة handleSubmit لأننا نعيد التوجيه مباشرة
  /*async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // مهم — يسمح للكوكي بأن يُرسل ويُحفظ
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      setMessage(data.message || data.error);
      setIsError(!data.success);

      if (data.success) {
        // تم إزالة حفظ token في localStorage
        // تم إزالة حفظ user في localStorage
        
        // عرض رسالة النجاح ثم التوجيه
        setMessage('تم تسجيل الدخول بنجاح! جارٍ التوجيه...');
        
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      }
    } catch (error) {
      setMessage('فشل الاتصال بالخادم');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }*/

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <p className="text-xl text-gray-700">جارٍ التوجيه إلى لوحة التحكم...</p>
    </div>
  );
}

// تم تعطيل باقي الكود المتعلق بصفحة تسجيل الدخول
/*
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600 text-sm">تسجيل الدخول إلى نظام الإدارة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              اسم المستخدم
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="أدخل اسم المستخدم"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جارٍ المعالجة...' : 'تسجيل الدخول'}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-center text-sm ${
              isError
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>💡 إذا كانت هذه أول مرة، قم بإنشاء حساب المدير الأول</p>
        </div>
      </div>
    </div>
  );
}
*/
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600 text-sm">تسجيل الدخول إلى نظام الإدارة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              اسم المستخدم
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="أدخل اسم المستخدم"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جارٍ المعالجة...' : 'تسجيل الدخول'}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-center text-sm ${
              isError
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>💡 إذا كانت هذه أول مرة، قم بإنشاء حساب المدير الأول</p>
        </div>
      </div>
    </div>
  );
}

