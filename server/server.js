// server/server.js
import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = 3001;
const DATA_PATH = path.resolve('server/products.json');

app.use(cors());
app.use(bodyParser.json());

// ✅ استرجاع جميع المنتجات
app.get('/products', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في قراءة البيانات' });
  }
});

// ✅ حفظ أو تعديل منتج جديد
app.post('/products', (req, res) => {
  try {
    const newProduct = req.body;
    const products = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

    const existingIndex = products.findIndex((p) => p.id === newProduct.id);
    if (existingIndex !== -1) {
      products[existingIndex] = newProduct;
    } else {
      products.push({ ...newProduct, id: Date.now().toString() });
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), 'utf-8');
    res.json({ success: true, message: 'تم الحفظ بنجاح' });
  } catch (error) {
    res.status(500).json({ error: 'خطأ أثناء الحفظ' });
  }
});

// ✅ حذف منتج حسب ID
app.delete('/products/:id', (req, res) => {
  try {
    const productId = req.params.id;
    let products = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    products = products.filter((p) => p.id !== productId);
    fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), 'utf-8');
    res.json({ success: true, message: 'تم الحذف' });
  } catch (error) {
    res.status(500).json({ error: 'خطأ أثناء الحذف' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
