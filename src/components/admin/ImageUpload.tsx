import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

interface Props {
  currentImage?: string;
  onImageUpload: (url: string) => void;
}

const ImageUpload: React.FC<Props> = ({ currentImage, onImageUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `products/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    onImageUpload(url);
    setUploading(false);
  };

  return (
    <div>
      {currentImage && (
        <img
          src={currentImage}
          alt="Preview"
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      )}
      <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
      {uploading && <p className="text-sm text-gray-500 mt-2">جاري رفع الصورة...</p>}
    </div>
  );
};

export default ImageUpload;
