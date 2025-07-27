import React, { useState } from 'react'

interface Product {
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: number
  stock: number
  discount: number
  category: string
  unit: string
  unitAr: string
  image: string
  featured: boolean
}

const AddProductForm = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    price: 0,
    stock: 0,
    discount: 0,
    category: '',
    unit: '',
    unitAr: '',
    image: '',
    featured: false,
  })

  const [savedProducts, setSavedProducts] = useState<Product[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedProducts([...savedProducts, product])
    alert('✅ تم حفظ المادة بنجاح!')
    console.log('جميع المنتجات:', [...savedProducts, product])
    setProduct({
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      price: 0,
      stock: 0,
      discount: 0,
      category: '',
      unit: '',
      unitAr: '',
      image: '',
      featured: false,
    })
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-center text-gray-800">إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nameAr" placeholder="الاسم بالعربية" value={product.nameAr} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="name" placeholder="الاسم بالإنجليزية" value={product.name} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="descriptionAr" placeholder="الوصف بالعربية" value={product.descriptionAr} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="الوصف بالإنجليزية" value={product.description} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="price" type="number" placeholder="السعر" value={product.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="stock" type="number" placeholder="الكمية" value={product.stock} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="discount" type="number" placeholder="الخصم %" value={product.discount} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="category" placeholder="المعرف الفئوي (مثلاً: groceries)" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="unitAr" placeholder="الوحدة بالعربي (علبة، كيلو...)" value={product.unitAr} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="unit" placeholder="الوحدة بالإنجليزي (box, kg...)" value={product.unit} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="image" placeholder="رابط الصورة" value={product.image} onChange={handleChange} className="w-full p-2 border rounded" />
        <label className="flex items-center space-x-2 rtl:space-x-reverse">
          <input name="featured" type="checkbox" checked={product.featured} onChange={handleChange} />
          <span>منتج مميز</span>
        </label>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          حفظ المنتج
        </button>
      </form>
    </div>
  )
}

export default AddProductForm
