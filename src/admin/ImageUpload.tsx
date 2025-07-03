import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { useImageUpload } from '../../hooks/useImageUpload';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage, className = '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const { uploadImage, validateImage, isUploading, uploadProgress } = useImageUpload();

  const handleFileSelect = async (file: File) => {
    const error = validateImage(file);
    if (error) {
      alert(error);
      return;
    }

    try {
      const result = await uploadImage(file);
      onImageUpload(result.url);
    } catch (error) {
      alert('فشل في رفع الصورة');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          dragOver 
            ? 'border-sky-500 bg-sky-50' 
            : 'border-gray-300 hover:border-sky-400 hover:bg-gray-50'
        }`}
      >
        {isUploading ? (
          <div className="space-y-3">
            <Loader className="mx-auto text-sky-500 animate-spin" size={32} />
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">جاري رفع الصورة... {uploadProgress}%</p>
          </div>
        ) : currentImage ? (
          <div className="relative">
            <img
              src={currentImage}
              alt="Product"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onImageUpload('');
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
            >
              <X size={16} />
            </button>
            <p className="text-sm text-gray-600">اضغط لتغيير الصورة</p>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="mx-auto text-gray-400" size={32} />
            <div>
              <p className="text-gray-600 font-medium">اضغط أو اسحب الصورة هنا</p>
              <p className="text-sm text-gray-500">JPG, PNG, WebP - حتى 5MB</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;