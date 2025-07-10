import { useEffect, useState, useCallback } from 'react';
import { Product, Category } from '../types';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';

export const useProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // تحميل المنتجات والتصنيفات من Firestore عند تشغيل التطبيق
  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const list: Product[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(list);
    });

    const unsubCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
      const list: Category[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
      setCategories(list);
    });

    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, []);

  // إضافة منتج
  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    await addDoc(collection(db, 'products'), product);
  }, []);

  // تعديل منتج
  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    await updateDoc(doc(db, 'products', id), updates);
  }, []);

  // حذف منتج
  const deleteProduct = useCallback(async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  }, []);

  // إضافة تصنيف
  const addCategory = useCallback(async (category: Omit<Category, 'id'>) => {
    await addDoc(collection(db, 'categories'), category);
  }, []);

  // تعديل تصنيف
  const updateCategory = useCallback(async (id: string, updates: Partial<Category>) => {
    await updateDoc(doc(db, 'categories', id), updates);
  }, []);

  // حذف تصنيف
  const deleteCategory = useCallback(async (id: string) => {
    await deleteDoc(doc(db, 'categories', id));
  }, []);

  return {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory
  };
};
