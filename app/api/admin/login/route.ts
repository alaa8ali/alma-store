import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Admin password
const ADMIN_PASSWORD = 'ali98myoo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'كلمة المرور مطلوبة' },
        { status: 400 }
      );
    }

    // Simple password check
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // Generate simple token (timestamp-based)
    const token = Buffer.from(
      JSON.stringify({
        role: 'admin',
        timestamp: Date.now(),
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      })
    ).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      message: 'تم تسجيل الدخول بنجاح',
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

