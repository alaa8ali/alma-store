-- ====================================
-- Alma Store Database Schema
-- Updated with new branches system
-- ====================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================
-- 1. BRANCHES TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS branches (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT,
  description_ar TEXT,
  description_en TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default branches
INSERT INTO branches (id, name_ar, name_en, icon, description_ar, description_en, display_order) VALUES
('store', 'المتجر', 'Store', '🛒', 'جميع المنتجات الاستهلاكية', 'All consumer products', 1),
('home-maintenance', 'صيانة المنازل', 'Home Maintenance', '🔧', 'خدمات صيانة وإصلاح المنازل', 'Home repair and maintenance services', 2),
('kitchen', 'المطبخ', 'Kitchen', '👨‍🍳', 'طلبات الطعام المخصصة والوجبات اليومية', 'Custom food orders and daily meals', 3),
('sweets-bakery', 'الحلويات والمخبوزات', 'Sweets & Bakery', '🍰', 'حلويات ومخبوزات طازجة', 'Fresh sweets and baked goods', 4)
ON CONFLICT (id) DO NOTHING;

-- ====================================
-- 2. CATEGORIES TABLE (Updated)
-- ====================================
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  branch_id TEXT REFERENCES branches(id) ON DELETE CASCADE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT,
  description_ar TEXT,
  description_en TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert categories for Store branch
INSERT INTO categories (id, branch_id, name_ar, name_en, icon, display_order) VALUES
('drinks', 'store', 'مشروبات', 'Drinks', '🥤', 1),
('sweets', 'store', 'حلويات', 'Sweets', '🍬', 2),
('biscuits', 'store', 'بسكويت', 'Biscuits', '🍪', 3),
('cleaning', 'store', 'منظفات', 'Cleaning', '🧽', 4),
('food', 'store', 'مواد غذائية', 'Food', '🥫', 5)
ON CONFLICT (id) DO NOTHING;

-- Insert categories for Home Maintenance branch
INSERT INTO categories (id, branch_id, name_ar, name_en, icon, display_order) VALUES
('plumbing', 'home-maintenance', 'السباكة والتمديدات الصحية', 'Plumbing & Sanitary', '🚰', 1),
('electrical', 'home-maintenance', 'صيانة الكهرباء', 'Electrical Maintenance', '💡', 2),
('cleaning-services', 'home-maintenance', 'النظافة', 'Cleaning Services', '🧹', 3),
('carpentry', 'home-maintenance', 'النجارة', 'Carpentry', '🪚', 4),
('painting', 'home-maintenance', 'الدهان', 'Painting', '🎨', 5),
('metalwork', 'home-maintenance', 'الحدادة', 'Metalwork', '🔨', 6)
ON CONFLICT (id) DO NOTHING;

-- Insert categories for Kitchen branch
INSERT INTO categories (id, branch_id, name_ar, name_en, icon, display_order) VALUES
('daily-menu', 'kitchen', 'القائمة اليومية', 'Daily Menu', '📋', 1),
('custom-orders', 'kitchen', 'طلبات مخصصة', 'Custom Orders', '✨', 2)
ON CONFLICT (id) DO NOTHING;

-- Insert categories for Sweets & Bakery branch
INSERT INTO categories (id, branch_id, name_ar, name_en, icon, display_order) VALUES
('oriental-sweets', 'sweets-bakery', 'حلويات شرقية', 'Oriental Sweets', '🧁', 1),
('western-sweets', 'sweets-bakery', 'حلويات غربية', 'Western Sweets', '🍰', 2),
('cakes', 'sweets-bakery', 'كيك', 'Cakes', '🎂', 3),
('pastries', 'sweets-bakery', 'معجنات', 'Pastries', '🥐', 4),
('cookies', 'sweets-bakery', 'كوكيز', 'Cookies', '🍪', 5),
('bread', 'sweets-bakery', 'خبز', 'Bread', '🍞', 6)
ON CONFLICT (id) DO NOTHING;

-- ====================================
-- 3. PRODUCTS TABLE (Updated)
-- ====================================
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  unit TEXT DEFAULT 'piece', -- piece, kg, liter, service, hour, etc.
  image TEXT,
  stock INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  metadata JSONB, -- For flexible custom fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(is_available);

-- ====================================
-- 4. PRODUCT VARIANTS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT,
  is_available BOOLEAN DEFAULT true,
  stock INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id);

-- ====================================
-- 5. USERS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT UNIQUE,
  name TEXT,
  email TEXT,
  address JSONB, -- {street, city, coordinates: {lat, lng}}
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 6. DRIVERS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  current_location JSONB, -- {lat, lng}
  vehicle_info TEXT,
  last_seen TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 7. ORDERS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  branch_id TEXT REFERENCES branches(id),
  items JSONB NOT NULL, -- [{product_id, variant_id?, name, quantity, price, subtotal}]
  subtotal NUMERIC NOT NULL,
  delivery_fee NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, preparing, ready, delivering, delivered, cancelled
  payment_method TEXT DEFAULT 'cash', -- cash, card, online
  payment_status TEXT DEFAULT 'pending', -- pending, paid, refunded
  currency TEXT DEFAULT 'SYP', -- SYP, USD
  delivery_address JSONB,
  customer_notes TEXT,
  assigned_driver_id UUID REFERENCES drivers(id),
  estimated_delivery_time TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_branch ON orders(branch_id);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- ====================================
-- 8. CUSTOM ORDERS TABLE (for Kitchen)
-- ====================================
CREATE TABLE IF NOT EXISTS custom_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements JSONB, -- Custom requirements specified by customer
  estimated_price NUMERIC,
  final_price NUMERIC,
  status TEXT DEFAULT 'pending', -- pending, reviewing, approved, preparing, ready, completed, rejected
  admin_notes TEXT,
  images JSONB, -- Array of image URLs
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 9. SERVICE REQUESTS TABLE (for Home Maintenance)
-- ====================================
CREATE TABLE IF NOT EXISTS service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  category_id TEXT REFERENCES categories(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location JSONB, -- {address, coordinates}
  preferred_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending', -- pending, confirmed, in_progress, completed, cancelled
  assigned_worker_id UUID,
  estimated_cost NUMERIC,
  final_cost NUMERIC,
  images JSONB,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 10. WORKERS TABLE (for Home Maintenance)
-- ====================================
CREATE TABLE IF NOT EXISTS workers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  category_id TEXT REFERENCES categories(id), -- Specialization
  is_available BOOLEAN DEFAULT true,
  rating NUMERIC DEFAULT 0,
  total_jobs INTEGER DEFAULT 0,
  metadata JSONB, -- Skills, certifications, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 11. MESSAGES TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  channel TEXT, -- telegram, whatsapp, web
  direction TEXT, -- incoming, outgoing
  content TEXT,
  payload JSONB,
  ai_intent TEXT,
  ai_entities JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 12. ADMIN USERS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin', -- admin, super_admin, manager
  permissions JSONB, -- Flexible permissions system
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 13. SETTINGS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES
('currency', '{"primary": "SYP", "secondary": "USD", "exchange_rate": 15000}', 'Currency settings'),
('delivery_fee', '{"default": 5000, "free_above": 50000}', 'Delivery fee settings'),
('business_hours', '{"open": "09:00", "close": "22:00", "days": [0,1,2,3,4,5,6]}', 'Business hours'),
('contact_info', '{"phone": "+963999999999", "email": "info@alma-store.com", "address": "Damascus, Syria"}', 'Contact information')
ON CONFLICT (key) DO NOTHING;

-- ====================================
-- FUNCTIONS AND TRIGGERS
-- ====================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON branches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_variants_updated_at BEFORE UPDATE ON product_variants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON drivers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_custom_orders_updated_at BEFORE UPDATE ON custom_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON service_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workers_updated_at BEFORE UPDATE ON workers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
