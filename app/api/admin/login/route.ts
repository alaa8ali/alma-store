import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Admin password (plain text for local development)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ali98myoo';
// Admin password hash (for production with bcrypt or sha256)
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

/**
 * Verify password against hash or plain text
 */
function verifyPassword(inputPassword: string): boolean {
  // If hash is provided, use it (for production)
  if (ADMIN_PASSWORD_HASH) {
    // Check if it's bcrypt hash (starts with $2a$, $2b$, or $2y$)
    if (ADMIN_PASSWORD_HASH.startsWith('$2')) {
      // For bcrypt, we would need bcrypt library
      // For now, we'll use sha256 hash comparison
      const inputHash = crypto
        .createHash('sha256')
        .update(inputPassword)
        .digest('hex');
      return inputHash === ADMIN_PASSWORD_HASH;
    } else {
      // Assume it's sha256 hash
      const inputHash = crypto
        .createHash('sha256')
        .update(inputPassword)
        .digest('hex');
      return inputHash === ADMIN_PASSWORD_HASH;
    }
  }
  
  // Fallback to plain text comparison (for local development)
  return inputPassword === ADMIN_PASSWORD;
}

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

    // Verify password
    const isValid = verifyPassword(password);

    if (!isValid) {
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

