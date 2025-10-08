export interface Branch {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  descriptionAr?: string;
  descriptionEn?: string;
  isActive: boolean;
  displayOrder: number;
}

export const branches: Branch[] = [
  {
    id: 'store',
    nameAr: 'المتجر',
    nameEn: 'Store',
    icon: '🛒',
    descriptionAr: 'جميع المنتجات الاستهلاكية',
    descriptionEn: 'All consumer products',
    isActive: true,
    displayOrder: 1
  },
  {
    id: 'home-maintenance',
    nameAr: 'صيانة المنازل',
    nameEn: 'Home Maintenance',
    icon: '🔧',
    descriptionAr: 'خدمات صيانة وإصلاح المنازل',
    descriptionEn: 'Home repair and maintenance services',
    isActive: true,
    displayOrder: 2
  },
  {
    id: 'kitchen',
    nameAr: 'المطبخ',
    nameEn: 'Kitchen',
    icon: '👨‍🍳',
    descriptionAr: 'طلبات الطعام المخصصة والوجبات اليومية',
    descriptionEn: 'Custom food orders and daily meals',
    isActive: true,
    displayOrder: 3
  },
  {
    id: 'sweets-bakery',
    nameAr: 'الحلويات والمخبوزات',
    nameEn: 'Sweets & Bakery',
    icon: '🍰',
    descriptionAr: 'حلويات ومخبوزات طازجة',
    descriptionEn: 'Fresh sweets and baked goods',
    isActive: true,
    displayOrder: 4
  }
];

export interface CategoryWithBranch {
  id: string;
  branchId: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  descriptionAr?: string;
  descriptionEn?: string;
  isActive: boolean;
  displayOrder: number;
}

export const categoriesByBranch: Record<string, CategoryWithBranch[]> = {
  'store': [
    { id: 'drinks', branchId: 'store', nameAr: 'مشروبات', nameEn: 'Drinks', icon: '🥤', isActive: true, displayOrder: 1 },
    { id: 'sweets', branchId: 'store', nameAr: 'حلويات', nameEn: 'Sweets', icon: '🍬', isActive: true, displayOrder: 2 },
    { id: 'biscuits', branchId: 'store', nameAr: 'بسكويت', nameEn: 'Biscuits', icon: '🍪', isActive: true, displayOrder: 3 },
    { id: 'cleaning', branchId: 'store', nameAr: 'منظفات', nameEn: 'Cleaning', icon: '🧽', isActive: true, displayOrder: 4 },
    { id: 'food', branchId: 'store', nameAr: 'مواد غذائية', nameEn: 'Food', icon: '🥫', isActive: true, displayOrder: 5 }
  ],
  'home-maintenance': [
    { id: 'plumbing', branchId: 'home-maintenance', nameAr: 'السباكة والتمديدات الصحية', nameEn: 'Plumbing & Sanitary', icon: '🚰', isActive: true, displayOrder: 1 },
    { id: 'electrical', branchId: 'home-maintenance', nameAr: 'صيانة الكهرباء', nameEn: 'Electrical Maintenance', icon: '💡', isActive: true, displayOrder: 2 },
    { id: 'cleaning-services', branchId: 'home-maintenance', nameAr: 'النظافة', nameEn: 'Cleaning Services', icon: '🧹', isActive: true, displayOrder: 3 },
    { id: 'carpentry', branchId: 'home-maintenance', nameAr: 'النجارة', nameEn: 'Carpentry', icon: '🪚', isActive: true, displayOrder: 4 },
    { id: 'painting', branchId: 'home-maintenance', nameAr: 'الدهان', nameEn: 'Painting', icon: '🎨', isActive: true, displayOrder: 5 },
    { id: 'metalwork', branchId: 'home-maintenance', nameAr: 'الحدادة', nameEn: 'Metalwork', icon: '🔨', isActive: true, displayOrder: 6 }
  ],
  'kitchen': [
    { id: 'daily-menu', branchId: 'kitchen', nameAr: 'القائمة اليومية', nameEn: 'Daily Menu', icon: '📋', isActive: true, displayOrder: 1 },
    { id: 'custom-orders', branchId: 'kitchen', nameAr: 'طلبات مخصصة', nameEn: 'Custom Orders', icon: '✨', isActive: true, displayOrder: 2 }
  ],
  'sweets-bakery': [
    { id: 'oriental-sweets', branchId: 'sweets-bakery', nameAr: 'حلويات شرقية', nameEn: 'Oriental Sweets', icon: '🧁', isActive: true, displayOrder: 1 },
    { id: 'western-sweets', branchId: 'sweets-bakery', nameAr: 'حلويات غربية', nameEn: 'Western Sweets', icon: '🍰', isActive: true, displayOrder: 2 },
    { id: 'cakes', branchId: 'sweets-bakery', nameAr: 'كيك', nameEn: 'Cakes', icon: '🎂', isActive: true, displayOrder: 3 },
    { id: 'pastries', branchId: 'sweets-bakery', nameAr: 'معجنات', nameEn: 'Pastries', icon: '🥐', isActive: true, displayOrder: 4 },
    { id: 'cookies', branchId: 'sweets-bakery', nameAr: 'كوكيز', nameEn: 'Cookies', icon: '🍪', isActive: true, displayOrder: 5 },
    { id: 'bread', branchId: 'sweets-bakery', nameAr: 'خبز', nameEn: 'Bread', icon: '🍞', isActive: true, displayOrder: 6 }
  ]
};

// Helper functions
export function getBranchById(id: string): Branch | undefined {
  return branches.find(b => b.id === id);
}

export function getCategoriesByBranch(branchId: string): CategoryWithBranch[] {
  return categoriesByBranch[branchId] || [];
}

export function getAllCategories(): CategoryWithBranch[] {
  return Object.values(categoriesByBranch).flat();
}
