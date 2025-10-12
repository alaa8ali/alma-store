"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status, router]);

  const handleGitHubLogin = async () => {
    await signIn("github", {
      callbackUrl: "/admin/dashboard",
    });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-white text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            لوحة التحكم
          </h1>
          <p className="text-gray-300">
            متجر Alma Store
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGitHubLogin}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaGithub className="text-2xl" />
            <span>تسجيل الدخول عبر GitHub</span>
          </button>

          <div className="text-center text-sm text-gray-300 mt-6">
            <p>مخصص للمسؤولين المصرح لهم فقط</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400">
            نظام تسجيل دخول آمن باستخدام GitHub OAuth
          </p>
        </div>
      </div>
    </div>
  );
}

