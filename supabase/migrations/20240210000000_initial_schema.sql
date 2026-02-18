-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Vendors/Merchants
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  business_type VARCHAR(100),
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  country_code VARCHAR(3) DEFAULT 'GN',
  language_preference VARCHAR(10) DEFAULT 'fr',
  mobile_money_number VARCHAR(20),
  mobile_money_provider VARCHAR(50),
  verification_status VARCHAR(20) DEFAULT 'pending',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GNF',
  stock_quantity INTEGER DEFAULT 0,
  sku VARCHAR(100),
  images JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id),
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  customer_email VARCHAR(255),
  total_amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GNF',
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_reference VARCHAR(255),
  delivery_address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Transactions (Mobile Money)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id),
  order_id UUID REFERENCES orders(id),
  transaction_type VARCHAR(50), -- 'sale', 'refund', 'withdrawal'
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GNF',
  provider VARCHAR(50), -- 'MTN', 'Orange'
  provider_reference VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Voice Interactions (WhatsApp)
CREATE TABLE voice_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id),
  audio_url TEXT,
  transcription TEXT,
  intent VARCHAR(100),
  entities JSONB,
  response TEXT,
  status VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Storefronts
CREATE TABLE storefronts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  subdomain VARCHAR(100) UNIQUE,
  custom_domain VARCHAR(255),
  theme JSONB DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Inventory Logs
CREATE TABLE inventory_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  vendor_id UUID REFERENCES vendors(id),
  change_type VARCHAR(50), -- 'restock', 'sale', 'adjustment'
  quantity_change INTEGER NOT NULL,
  previous_quantity INTEGER,
  new_quantity INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE storefronts ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;

-- Vendors Policies
CREATE POLICY "Vendors can view own data" ON vendors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Vendors can update own data" ON vendors
  FOR UPDATE USING (auth.uid() = user_id);

-- Products Policies
CREATE POLICY "Vendors can manage own products" ON products
  FOR ALL USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

-- Storefronts Policies
CREATE POLICY "Vendors can manage own storefront" ON storefronts
  FOR ALL USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view published storefronts" ON storefronts
  FOR SELECT USING (is_published = true);

-- Create trigger to automatically create vendor profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.vendors (user_id, email, business_name)
  VALUES (
    NEW.id,
    NEW.email,
    'New Merchant Store' -- Default name
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
