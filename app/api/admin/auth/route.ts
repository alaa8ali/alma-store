import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, generateAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'كلمة المرور مطلوبة' },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    const token = generateAdminToken();

    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح'
    });

    // Set secure HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'خطأ في الخادم' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'تم تسجيل الخروج بنجاح'
  });

  response.cookies.delete('admin-token');
  return response;
}