import React from 'react';
import { ShoppingCart, Menu, Phone, Info } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartToggle, currentPage, onPageChange }) => {
  return (
    <header className="bg-gradient-to-r from-sky-50 to-cyan-50 shadow-lg border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onPageChange('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                Alma
              </h1>
              <p className="text-sm text-gray-600 text-right">متجر المواد الغذائية</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onPageChange('home')}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                currentPage === 'home'
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-gray-600 hover:text-sky-600 hover:bg-sky-50'
              }`}
            >
              <Menu size={18} />
              <span>المتجر</span>
            </button>
            
            <button
              onClick={() => onPageChange('about')}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                currentPage === 'about'
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-gray-600 hover:text-sky-600 hover:bg-sky-50'
              }`}
            >
              <Info size={18} />
              <span>من نحن</span>
            </button>
            
            <button
              onClick={() => onPageChange('contact')}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                currentPage === 'contact'
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-gray-600 hover:text-sky-600 hover:bg-sky-50'
              }`}
            >
              <Phone size={18} />
              <span>اتصل بنا</span>
            </button>
          </nav>

          {/* Cart Button */}
          <button
            onClick={onCartToggle}
            className="relative bg-gradient-to-r from-sky-500 to-cyan-500 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onPageChange('home')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                currentPage === 'home'
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-gray-600 hover:text-sky-600'
              }`}
            >
              المتجر
            </button>
            <button
              onClick={() => onPageChange('about')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                currentPage === 'about'
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-gray-600 hover:text-sky-600'
              }`}
            >
              من نحن
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                currentPage === 'contact'
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-gray-600 hover:text-sky-600'
              }`}
            >
              اتصل بنا
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
