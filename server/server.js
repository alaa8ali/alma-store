// server/server.js
import express from 'express'
import fs from 'fs'
import cors from 'cors'

const app = express()
const PORT = 3001
const DATA_FILE = './products.json'

app.use(cors())
app.use(express.json())

// جلب جميع المنتجات
app.get('/products', (req, res) => {
  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('خطأ في القراءة')
    res.json(JSON.parse(data || '[]'))
  })
})

// إضافة منتج جديد
app.post('/products', (req, res) => {
  const newProduct = req.body
  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    const products = JSON.parse(data || '[]')
    products.push({ ...newProduct, id: Date.now().toString() })
    fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), () => {
      res.status(201).json({ message: 'تمت الإضافة بنجاح' })
    })
  })
})

// حذف منتج
app.delete('/products/:id', (req, res) => {
  const id = req.params.id
  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    const products = JSON.parse(data || '[]').filter(p => p.id !== id)
    fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), () => {
      res.json({ message: 'تم الحذف' })
    })
  })
})

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`))
