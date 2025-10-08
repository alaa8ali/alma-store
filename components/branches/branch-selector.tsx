'use client';

import { Branch } from '@/lib/branches';

interface BranchSelectorProps {
  branches: Branch[];
  selectedBranch: string;
  onBranchChange: (branchId: string) => void;
}

export function BranchSelector({ branches, selectedBranch, onBranchChange }: BranchSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">اختر الفرع</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {branches.map((branch) => (
          <button
            key={branch.id}
            onClick={() => onBranchChange(branch.id)}
            className={`
              relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105
              ${selectedBranch === branch.id
                ? 'bg-gradient-to-br from-blue-500 to-sky-400 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`
                text-5xl transition-transform duration-300
                ${selectedBranch === branch.id ? 'scale-110' : ''}
              `}>
                {branch.icon}
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg">{branch.nameAr}</h3>
                <p className={`text-sm mt-1 ${selectedBranch === branch.id ? 'text-blue-100' : 'text-gray-500'}`}>
                  {branch.descriptionAr}
                </p>
              </div>
            </div>
            {selectedBranch === branch.id && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
