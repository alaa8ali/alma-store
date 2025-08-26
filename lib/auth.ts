import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcQjyQ/Ka'; // Default: 'alma2024admin'

export interface AdminSession {
  isAuthenticated: boolean;
  expiresAt: number;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

export function generateAdminToken(): string {
  const payload = {
    admin: true,
    iat: Date.now(),
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyAdminToken(token: string): AdminSession {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    if (decoded.admin && decoded.exp > Date.now()) {
      return {
        isAuthenticated: true,
        expiresAt: decoded.exp
      };
    }
    
    return { isAuthenticated: false, expiresAt: 0 };
  } catch (error) {
    return { isAuthenticated: false, expiresAt: 0 };
  }
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}