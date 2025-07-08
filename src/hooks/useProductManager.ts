import { useState, useCallback } from 'react';
import { Product, Category, Section } from '../types';
import { products as initialProducts, categories as initialCategories, sections as initialSections } from '../data/products';

export const useProductManager = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [sections, setSections] = useState<Section[]>(initialSections);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...updates, updatedAt: new Date() } : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  }, []);

  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id ? { ...category, ...updates } : category
      )
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
    // Also remove products in this category
    setProducts(prev => prev.filter(product => product.category !== id));
  }, []);

  const addSection = useCallback((section: Omit<Section, 'id'>) => {
    const newSection: Section = {
      ...section,
      id: Date.now().toString()
    };
    setSections(prev => [...prev, newSection]);
    return newSection;
  }, []);

  const updateSection = useCallback((id: string, updates: Partial<Section>) => {
    setSections(prev => 
      prev.map(section => 
        section.id === id ? { ...section, ...updates } : section
      )
    );
  }, []);

  const deleteSection = useCallback((id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
    // Also remove categories and products in this section
    setCategories(prev => prev.filter(category => category.section !== id));
    setProducts(prev => prev.filter(product => product.section !== id));
  }, []);

  const getProductsBySection = useCallback((sectionId: string) => {
    return products.filter(product => product.section === sectionId);
  }, [products]);

  const getCategoriesBySection = useCallback((sectionId: string) => {
    return categories.filter(category => category.section === sectionId || category.id === 'all');
  }, [categories]);

  return {
    products,
    categories,
    sections,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    addSection,
    updateSection,
    deleteSection,
    getProductsBySection,
    getCategoriesBySection
  };
}; 
