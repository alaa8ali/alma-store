import { useState, useCallback } from 'react';
import { ImageUploadResult } from '../types';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = useCallback(async (file: File): Promise<ImageUploadResult> => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Convert file to base64 for demo purposes
      // In production, upload to Firebase Storage, Cloudinary, etc.
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      clearInterval(progressInterval);
      setUploadProgress(100);

      // For demo, we'll use a placeholder image service
      // In production, return the actual uploaded URL
      const imageUrl = `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=400`;

      const result: ImageUploadResult = {
        url: imageUrl,
        filename: file.name,
        size: file.size
      };

      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);

      return result;
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      throw new Error('فشل في رفع الصورة');
    }
  }, []);

  const validateImage = useCallback((file: File): string | null => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return 'نوع الملف غير مدعوم. يرجى اختيار صورة بصيغة JPG, PNG, أو WebP';
    }

    if (file.size > maxSize) {
      return 'حجم الصورة كبير جداً. الحد الأقصى 5 ميجابايت';
    }

    return null;
  }, []);

  return {
    uploadImage,
    validateImage,
    isUploading,
    uploadProgress
  };
};
