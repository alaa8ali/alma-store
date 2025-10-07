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

-- offers
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type text NOT NULL, -- e.g., 'percentage', 'buy_one_get_one_free'
  value jsonb, -- For 'percentage': {"value": 15}, for 'bogo': {"buy_quantity": 1, "get_quantity": 1}
  start_date timestamptz,
  end_date timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- product_offers (linking table for many-to-many relationship)
CREATE TABLE IF NOT EXISTS product_offers (
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, offer_id)
);

