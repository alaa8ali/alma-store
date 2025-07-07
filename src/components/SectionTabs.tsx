import React from 'react';
import { Section } from '../types';

interface SectionTabsProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const SectionTabs: React.FC<SectionTabsProps> = ({ 
  sections, 
  activeSection, 
  onSectionChange 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">أقسام المتجر</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sections.filter(section => section.isActive).map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`p-6 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
              activeSection === section.id
                ? `bg-gradient-to-br ${section.color} text-white shadow-xl`
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-4xl mb-3">{section.icon}</div>
            <div className="font-bold text-lg mb-1">{section.nameAr}</div>
            <div className="text-sm opacity-80">{section.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionTabs;