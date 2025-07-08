import { useState, useCallback } from 'react';
import { AdminUser } from '../types';

const ADMIN_USERS: AdminUser[] = [
  {
    id: '1',
    username: 'admin',
    role: 'admin',
    permissions: ['all'],
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  },
  {
    id: '2',
    username: 'employee',
    role: 'employee',
    permissions: ['products:read', 'products:write', 'orders:read', 'orders:write'],
    createdAt: new Date('2024-01-15')
  }
];

const CREDENTIALS = {
  admin: 'alma2024',
  employee: 'emp2024'
};

export const useAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  const login = useCallback((username: string, password: string) => {
    const validPassword = CREDENTIALS[username as keyof typeof CREDENTIALS];
    
    if (validPassword && password === validPassword) {
      const user = ADMIN_USERS.find(u => u.username === username);
      if (user) {
        const updatedUser = { ...user, lastLogin: new Date() };
        setIsAuthenticated(true);
        setCurrentUser(updatedUser);
        localStorage.setItem('alma_admin_auth', JSON.stringify({
          userId: user.id,
          timestamp: Date.now()
        }));
        return true;
      }
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('alma_admin_auth');
  }, []);

  const checkAuth = useCallback(() => {
    try {
      const authData = localStorage.getItem('alma_admin_auth');
      if (authData) {
        const { userId, timestamp } = JSON.parse(authData);
        
        // Check if session is still valid (24 hours)
        const isValid = Date.now() - timestamp < 24 * 60 * 60 * 1000;
        
        if (isValid) {
          const user = ADMIN_USERS.find(u => u.id === userId);
          if (user) {
            setIsAuthenticated(true);
            setCurrentUser(user);
            return true;
          }
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
    
    logout();
    return false;
  }, [logout]);

  const hasPermission = useCallback((permission: string) => {
    if (!currentUser) return false;
    if (currentUser.permissions.includes('all')) return true;
    return currentUser.permissions.includes(permission);
  }, [currentUser]);

  return {
    isAuthenticated,
    currentUser,
    login,
    logout,
    checkAuth,
    hasPermission
  };
};
