'use client';

import { useEffect, useState } from 'react';
import { Branch, fetchBranches } from '@/lib/supabase-data';
import { BranchCard } from './branch-card';

interface BranchSelectorDynamicProps {
  selectedBranch: string;
  onBranchChange: (branchId: string) => void;
}

export function BranchSelectorDynamic({ selectedBranch, onBranchChange }: BranchSelectorDynamicProps) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      setLoading(true);
      const data = await fetchBranches();
      setBranches(data);
    } catch (error) {
      console.error('Error loading branches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          اختر القسم
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">لا توجد أقسام متاحة حالياً</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        اختر القسم
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {branches.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            isSelected={selectedBranch === branch.id}
            onClick={() => onBranchChange(branch.id)}
          />
        ))}
      </div>
    </div>
  );
}

