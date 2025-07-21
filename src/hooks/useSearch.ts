import { useState, useMemo } from 'react';
import { Product, Service } from '../types';

export function useSearch(products: Product[], services: Service[] = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.nameAr.includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.descriptionAr.includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.nameAr.localeCompare(b.nameAr, 'ar');
          break;
        case 'price':
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          comparison = priceA - priceB;
          break;
        case 'newest':
          comparison = parseInt(b.id) - parseInt(a.id);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy, sortOrder]);

  const filteredServices = useMemo(() => {
    let filtered = services;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(query) ||
        service.nameAr.includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.descriptionAr.includes(query)
      );
    }

    return filtered;
  }, [services, searchQuery]);

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured).slice(0, 8);
  };

  const getProductsByCategory = (categoryId: string, limit?: number) => {
    const categoryProducts = products.filter(product => product.category === categoryId);
    return limit ? categoryProducts.slice(0, limit) : categoryProducts;
  };

  const getDiscountedProducts = () => {
    return products.filter(product => product.discount && product.discount > 0);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredProducts,
    filteredServices,
    getFeaturedProducts,
    getProductsByCategory,
    getDiscountedProducts
  };
}