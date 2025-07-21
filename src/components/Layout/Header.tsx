import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export function Header({ onSearchChange, searchQuery }: HeaderProps) {
  const { cart, setIsCartOpen, isAdminMode, setIsAdminMode } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-sky-50 to-blue-100 shadow-lg sticky top-0 z-50 border-b border-sky-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img 
              src="/images/logo.png" 
              alt="Alma Store" 
              className="h-10 lg:h-12 w-auto rounded-lg shadow-md"
            />
            <div className="hidden sm:block">
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
                متجر ألما
              </h1>
              <p className="text-xs lg:text-sm text-sky-600 font-medium">
                الساحل السوري
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-sky-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحث عن المنتجات والخدمات..."
                className="w-full pl-4 pr-10 py-3 text-right border-2 border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 bg-white/80 backdrop-blur-sm placeholder-sky-400 text-gray-700 transition-all duration-300"
                dir="rtl"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Admin Mode Toggle */}
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`hidden lg:flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isAdminMode 
                  ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                  : 'bg-sky-100 text-sky-700 border border-sky-200 hover:bg-sky-200'
              }`}
            >
              <User className="h-4 w-4 ml-1" />
              {isAdminMode ? 'وضع الإدارة' : 'لوحة التحكم'}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-12 h-12 text-sky-600 hover:bg-sky-100 rounded-xl transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-sky-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن المنتجات والخدمات..."
              className="w-full pl-4 pr-10 py-3 text-right border-2 border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 bg-white/80 backdrop-blur-sm placeholder-sky-400 text-gray-700"
              dir="rtl"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-sky-200 py-4">
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsAdminMode(!isAdminMode);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isAdminMode 
                    ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                    : 'bg-sky-100 text-sky-700 border border-sky-200'
                }`}
              >
                <User className="h-4 w-4 ml-2" />
                {isAdminMode ? 'وضع المتجر' : 'لوحة التحكم'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}