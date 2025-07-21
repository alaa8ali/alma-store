import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  Settings, 
  Download, 
  Upload, 
  RotateCcw,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  const { exportData, importData, resetData, setIsAdminMode } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'products', name: 'إدارة المنتجات', icon: Package },
    { id: 'services', name: 'إدارة الخدمات', icon: Wrench },
    { id: 'settings', name: 'إعدادات المتجر', icon: Settings },
  ];

  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alma-store-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = e.target?.result as string;
            if (importData(data)) {
              alert('تم استيراد البيانات بنجاح!');
            } else {
              alert('خطأ في استيراد البيانات!');
            }
          } catch (error) {
            alert('خطأ في قراءة الملف!');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleResetData = () => {
    if (confirm('هل أنت متأكد مع إعادة تعيين جميع البيانات؟ لن يمكن التراجع عن هذه العملية.')) {
      resetData();
      alert('تم إعادة تعيين البيانات بنجاح!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 z-50
        w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg font-bold">لوحة التحكم</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-sky-100 text-sm mt-1">متجر ألما - إدارة</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-sky-50 hover:text-sky-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Data Management */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">إدارة البيانات</h3>
            
            <button
              onClick={handleExportData}
              className="w-full flex items-center space-x-3 rtl:space-x-reverse p-2 text-green-700 hover:bg-green-50 rounded-lg text-sm transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span>تصدير البيانات</span>
            </button>
            
            <button
              onClick={handleImportData}
              className="w-full flex items-center space-x-3 rtl:space-x-reverse p-2 text-blue-700 hover:bg-blue-50 rounded-lg text-sm transition-colors duration-200"
            >
              <Upload className="h-4 w-4" />
              <span>استيراد البيانات</span>
            </button>
            
            <button
              onClick={handleResetData}
              className="w-full flex items-center space-x-3 rtl:space-x-reverse p-2 text-red-700 hover:bg-red-50 rounded-lg text-sm transition-colors duration-200"
            >
              <RotateCcw className="h-4 w-4" />
              <span>إعادة تعيين</span>
            </button>
          </div>

          {/* Exit Admin Mode */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setIsAdminMode(false)}
              className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-medium transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>عودة للمتجر</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.id === activeTab)?.name || 'لوحة التحكم'}
            </h1>
            
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}