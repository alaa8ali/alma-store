
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// تهيئة عميل Supabase على جانب العميل
// تأكد من أن هذه المتغيرات متوفرة في بيئة Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  async function handleMagicLinkLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/admin/auth-callback',
        },
      });

      if (error) throw error;

      setMessage('تم إرسال رابط الدخول السحري إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد الخاص بك.');
      setIsError(false);
      setEmail(''); // مسح حقل البريد الإلكتروني بعد الإرسال
    } catch (error: any) {
      setMessage('خطأ: ' + error.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600 text-sm">تسجيل الدخول إلى نظام الإدارة</p>
        </div>

        <form onSubmit={handleMagicLinkLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جارٍ الإرسال...' : 'إرسال رابط الدخول السحري'}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-center text-sm ${isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

