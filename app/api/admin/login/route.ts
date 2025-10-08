import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

// Admin password (hashed)
// Password: ali98myoo
const ADMIN_PASSWORD_HASH = '$2a$10$YourHashedPasswordHere'; // Will be replaced with actual hash

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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

    // For now, simple password check (in production, use bcrypt)
    const ADMIN_PASSWORD = 'ali98myoo';
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        role: 'admin',
        timestamp: Date.now(),
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

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
