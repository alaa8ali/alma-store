export interface ProductVariant {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  image: string;
  available: boolean;
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  price: number;
  unit: 'piece' | 'carton';
  image: string;
  available: boolean;
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'drinks', nameAr: 'مشروبات', nameEn: 'Drinks', icon: '🥤' },
  { id: 'sweets', nameAr: 'حلويات', nameEn: 'Sweets', icon: '🍬' },
  { id: 'biscuits', nameAr: 'بسكويت', nameEn: 'Biscuits', icon: '🍪' },
  { id: 'cleaning', nameAr: 'منظفات', nameEn: 'Cleaning', icon: '🧽' },
  { id: 'food', nameAr: 'مواد غذائية', nameEn: 'Food', icon: '🥫' },
];

export const products: Product[] = [
  // Drinks
  {
    id: 'pepsi-can',
    nameAr: 'بيبسي علبة',
    nameEn: 'Pepsi Can',
    category: 'drinks',
    price: 750,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg',
    available: true,
    variants: [
      {
        id: 'pepsi-classic',
        nameAr: 'بيبسي كلاسيك',
        nameEn: 'Pepsi Classic',
        price: 750,
        image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg',
        available: true
      },
      {
        id: 'pepsi-diet',
        nameAr: 'بيبسي دايت',
        nameEn: 'Pepsi Diet',
        price: 800,
        image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg',
        available: true
      },
      {
        id: 'pepsi-max',
        nameAr: 'بيبسي ماكس',
        nameEn: 'Pepsi Max',
        price: 850,
        image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg',
        available: true
      },
      {
        id: 'pepsi-cherry',
        nameAr: 'بيبسي كرز',
        nameEn: 'Pepsi Cherry',
        price: 900,
        image: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg',
        available: true
      },
      {
        id: 'pepsi-lemon',
        nameAr: 'بيبسي ليمون',
        nameEn: 'Pepsi Lemon',
        price: 850,
        image: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg',
        available: true
      }
    ]
  },
  {
    id: 'water-bottle',
    nameAr: 'مياه معبأة',
    nameEn: 'Water Bottle',
    category: 'drinks',
    price: 300,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg',
    available: true,
    variants: [
      {
        id: 'water-500ml',
        nameAr: 'مياه 500 مل',
        nameEn: 'Water 500ml',
        price: 300,
        image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg',
        available: true
      },
      {
        id: 'water-1l',
        nameAr: 'مياه 1 لتر',
        nameEn: 'Water 1L',
        price: 500,
        image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg',
        available: true
      },
      {
        id: 'water-1.5l',
        nameAr: 'مياه 1.5 لتر',
        nameEn: 'Water 1.5L',
        price: 650,
        image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
        available: true
      }
    ]
  },
  {
    id: 'juice-box',
    nameAr: 'عصير مشكل',
    nameEn: 'Mixed Juice',
    category: 'drinks',
    price: 900,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    available: true,
    variants: [
      {
        id: 'juice-orange',
        nameAr: 'عصير برتقال',
        nameEn: 'Orange Juice',
        price: 900,
        image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
        available: true
      },
      {
        id: 'juice-apple',
        nameAr: 'عصير تفاح',
        nameEn: 'Apple Juice',
        price: 950,
        image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg',
        available: true
      },
      {
        id: 'juice-mango',
        nameAr: 'عصير مانجو',
        nameEn: 'Mango Juice',
        price: 1000,
        image: 'https://images.pexels.com/photos/1002543/pexels-photo-1002543.jpeg',
        available: true
      },
      {
        id: 'juice-mixed',
        nameAr: 'عصير مشكل',
        nameEn: 'Mixed Juice',
        price: 950,
        image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg',
        available: true
      }
    ]
  },
  
  // Sweets
  {
    id: 'chocolate-bar',
    nameAr: 'شوكولاتة',
    nameEn: 'Chocolate Bar',
    category: 'sweets',
    price: 1350,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg',
    available: true,
    variants: [
      {
        id: 'chocolate-milk',
        nameAr: 'شوكولاتة بالحليب',
        nameEn: 'Milk Chocolate',
        price: 1350,
        image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg',
        available: true
      },
      {
        id: 'chocolate-dark',
        nameAr: 'شوكولاتة داكنة',
        nameEn: 'Dark Chocolate',
        price: 1500,
        image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
        available: true
      },
      {
        id: 'chocolate-white',
        nameAr: 'شوكولاتة بيضاء',
        nameEn: 'White Chocolate',
        price: 1400,
        image: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg',
        available: true
      },
      {
        id: 'chocolate-nuts',
        nameAr: 'شوكولاتة بالمكسرات',
        nameEn: 'Chocolate with Nuts',
        price: 1600,
        image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg',
        available: true
      }
    ]
  },
  {
    id: 'candy-pack',
    nameAr: 'حلوى مشكلة',
    nameEn: 'Mixed Candy',
    category: 'sweets',
    price: 2400,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
    available: true
  },
  
  // Biscuits
  {
    id: 'oreo-pack',
    nameAr: 'بسكويت أوريو',
    nameEn: 'Oreo Cookies',
    category: 'biscuits',
    price: 1950,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
    available: true,
    variants: [
      {
        id: 'oreo-original',
        nameAr: 'أوريو أصلي',
        nameEn: 'Original Oreo',
        price: 1950,
        image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
        available: true
      },
      {
        id: 'oreo-golden',
        nameAr: 'أوريو ذهبي',
        nameEn: 'Golden Oreo',
        price: 2100,
        image: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg',
        available: true
      },
      {
        id: 'oreo-double',
        nameAr: 'أوريو دبل كريم',
        nameEn: 'Double Cream Oreo',
        price: 2200,
        image: 'https://images.pexels.com/photos/1998635/pexels-photo-1998635.jpeg',
        available: true
      }
    ]
  },
  {
    id: 'digestive-biscuits',
    nameAr: 'بسكويت هضمي',
    nameEn: 'Digestive Biscuits',
    category: 'biscuits',
    price: 1500,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg',
    available: true
  },
  
  // Cleaning
  {
    id: 'dish-soap',
    nameAr: 'سائل جلي',
    nameEn: 'Dish Soap',
    category: 'cleaning',
    price: 3600,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg',
    available: true,
    variants: [
      {
        id: 'dish-soap-lemon',
        nameAr: 'سائل جلي ليمون',
        nameEn: 'Lemon Dish Soap',
        price: 3600,
        image: 'https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg',
        available: true
      },
      {
        id: 'dish-soap-apple',
        nameAr: 'سائل جلي تفاح',
        nameEn: 'Apple Dish Soap',
        price: 3700,
        image: 'https://images.pexels.com/photos/4239140/pexels-photo-4239140.jpeg',
        available: true
      },
      {
        id: 'dish-soap-antibacterial',
        nameAr: 'سائل جلي مضاد للبكتيريا',
        nameEn: 'Antibacterial Dish Soap',
        price: 4000,
        image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg',
        available: true
      }
    ]
  },
  {
    id: 'laundry-detergent',
    nameAr: 'مسحوق غسيل',
    nameEn: 'Laundry Detergent',
    category: 'cleaning',
    price: 7500,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg',
    available: true
  },
  
  // Food
  {
    id: 'rice-bag',
    nameAr: 'أرز أبيض',
    nameEn: 'White Rice',
    category: 'food',
    price: 4500,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
    available: true,
    variants: [
      {
        id: 'rice-basmati',
        nameAr: 'أرز بسمتي',
        nameEn: 'Basmati Rice',
        price: 5500,
        image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
        available: true
      },
      {
        id: 'rice-jasmine',
        nameAr: 'أرز ياسمين',
        nameEn: 'Jasmine Rice',
        price: 5000,
        image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
        available: true
      },
      {
        id: 'rice-short-grain',
        nameAr: 'أرز قصير الحبة',
        nameEn: 'Short Grain Rice',
        price: 4500,
        image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg',
        available: true
      }
    ]
  },
  {
    id: 'olive-oil',
    nameAr: 'زيت زيتون',
    nameEn: 'Olive Oil',
    category: 'food',
    price: 10500,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg',
    available: true,
    variants: [
      {
        id: 'olive-oil-extra-virgin',
        nameAr: 'زيت زيتون بكر ممتاز',
        nameEn: 'Extra Virgin Olive Oil',
        price: 12000,
        image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg',
        available: true
      },
      {
        id: 'olive-oil-virgin',
        nameAr: 'زيت زيتون بكر',
        nameEn: 'Virgin Olive Oil',
        price: 10500,
        image: 'https://images.pexels.com/photos/1022385/pexels-photo-1022385.jpeg',
        available: true
      },
      {
        id: 'olive-oil-light',
        nameAr: 'زيت زيتون خفيف',
        nameEn: 'Light Olive Oil',
        price: 9000,
        image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg',
        available: true
      }
    ]
  }
];