import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useProductManager } from '../../hooks/useProductManager';
import { Section } from '../../types';

const SectionManager: React.FC = () => {
  const {
    sections,
    addSection,
    updateSection,
    deleteSection
  } = useProductManager();

  const [showAddSection, setShowAddSection] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  const handleDeleteSection = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا القسم؟ سيتم حذف جميع التصنيفات والمنتجات المرتبطة به.')) {
      deleteSection(id);
    }
  };

  const toggleSectionStatus = (section: Section) => {
    updateSection(section.id, { isActive: !section.isActive });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الأقسام الرئيسية</h2>
        <button
          onClick={() => setShowAddSection(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>إضافة قسم</span>
        </button>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{section.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{section.nameAr}</h3>
                    <p className="text-sm opacity-90">{section.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    ترتيب {section.order}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    section.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {section.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => handleDeleteSection(section.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 size={18} />
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleSectionStatus(section)}
                    className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    {section.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    onClick={() => setEditingSection(section)}
                    className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {(showAddSection || editingSection) && (
        <SectionModal
          section={editingSection}
          onSave={(sectionData) => {
            if (editingSection) {
              updateSection(editingSection.id, sectionData);
              setEditingSection(null);
            } else {
              addSection(sectionData);
              setShowAddSection(false);
            }
          }}
          onClose={() => {
            setShowAddSection(false);
            setEditingSection(null);
          }}
        />
      )}
    </div>
  );
};

const SectionModal: React.FC<{
  section?: Section | null;
  onSave: (section: Omit<Section, 'id'>) => void;
  onClose: () => void;
}> = ({ section, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: section?.name || '',
    nameAr: section?.nameAr || '',
    icon: section?.icon || '📦',
    color: section?.color || 'from-gray-500 to-gray-600',
    order: section?.order || 1,
    isActive: section?.isActive ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const commonIcons = ['🛒', '👕', '📱', '🏠', '🚗', '📚', '🎮', '💄', '⚽', '🎵', '🍕', '✈️'];
  const colorOptions = [
    { name: 'أزرق', value: 'from-blue-500 to-cyan-500' },
    { name: 'أخضر', value: 'from-green-500 to-emerald-500' },
    { name: 'بنفسجي', value: 'from-purple-500 to-pink-500' },
    { name: 'برتقالي', value: 'from-orange-500 to-red-500' },
    { name: 'وردي', value: 'from-pink-500 to-rose-500' },
    { name: 'أصفر', value: 'from-yellow-500 to-orange-500' },
    { name: 'رمادي', value: 'from-gray-500 to-gray-600' },
    { name: 'بني', value: 'from-amber-600 to-orange-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {section ? 'تعديل القسم' : 'إضافة قسم جديد'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                اسم القسم بالعربية *
              </label>
              <input
                type="text"
                value={formData.nameAr}
                onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                اسم القسم بالإنجليزية *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                أيقونة القسم
              </label>
              <div className="grid grid-cols-6 gap-2 mb-3">
                {commonIcons.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                    className={`p-2 text-xl border rounded-lg hover:bg-gray-50 transition-colors duration-200 ${
                      formData.icon === icon ? 'border-sky-500 bg-sky-50' : 'border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-center"
                placeholder="أو أدخل إيموجي مخصص"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                لون القسم
              </label>
              <div className="grid grid-cols-2 gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.color === color.value 
                        ? 'border-gray-800' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className={`w-full h-8 bg-gradient-to-r ${color.value} rounded-md mb-1`}></div>
                    <span className="text-xs text-gray-700">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                ترتيب العرض
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: Number(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                min="1"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                />
                <span className="text-sm font-medium text-gray-700">قسم نشط</span>
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-colors duration-200"
              >
                {section ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SectionManager;
