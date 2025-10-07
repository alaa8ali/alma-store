-- users (customers)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text UNIQUE,
  name text,
  created_at timestamptz DEFAULT now()
);

-- drivers
CREATE TABLE IF NOT EXISTS drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  phone text,
  is_available boolean DEFAULT true,
  lat numeric,
  lng numeric,
  last_seen timestamptz,
  vehicle_info text
);

-- categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  image_url text,
  stock integer DEFAULT 0,
  sku text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  items jsonb, -- [{product_id, qty, price}]
  total numeric,
  status text DEFAULT 'pending',
  assigned_driver uuid REFERENCES drivers(id),
  delivery_address jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- messages / logs
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  channel text, -- 'telegram' | 'whatsapp'
  incoming boolean,
  payload jsonb,
  ai_intent text,
  ai_entities jsonb,
  created_at timestamptz DEFAULT now()
);

-- sessions (for multi-step conversations)
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL UNIQUE, -- Using text to store chat_id from Telegram
  current_step text, -- e.g., 'awaiting_product_name'
  context jsonb, -- To store temporary data like { "product_name": "...", "price": ... }
  updated_at timestamptz DEFAULT now()
);

