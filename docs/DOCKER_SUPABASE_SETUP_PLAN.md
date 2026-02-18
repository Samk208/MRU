# 🐳 MRU E-Commerce Platform - Docker + Supabase Local Development Setup

## 📋 Executive Summary

**YES, this is absolutely possible!** You can run Supabase locally in Docker Desktop without interfering with your other projects. Here's how we'll do it:

### ✅ What We'll Build
- **Isolated Docker Environment**: Dedicated Docker Compose stack for MRU
- **Local Supabase Instance**: Full Supabase stack (PostgreSQL, Auth, Storage, Edge Functions)
- **Production-Grade Architecture**: Multi-vendor e-commerce platform with proper security
- **No Cloud Dependencies**: Everything runs locally until you're ready to deploy

---

## 🎯 Current State Analysis

### What You Have
✅ Next.js 16.1.6 (latest) with App Router  
✅ React 19 with TypeScript  
✅ TailwindCSS + shadcn/ui components  
✅ Deployed on Vercel (frontend only)  
✅ No backend yet  
✅ No Supabase variables set  

### What's Missing
❌ Backend infrastructure  
❌ Database  
❌ Authentication system  
❌ API layer  
❌ Multi-vendor logic  
❌ Payment integration  

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     MRU Platform Stack                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (Existing)                                         │
│  ├─ Next.js 16 (App Router)                                 │
│  ├─ React 19 + TypeScript                                   │
│  ├─ TailwindCSS + shadcn/ui                                 │
│  └─ Deployed on Vercel                                      │
│                                                               │
│  Backend (To Build - Docker)                                │
│  ├─ Supabase (Local)                                        │
│  │  ├─ PostgreSQL 15                                        │
│  │  ├─ PostgREST API                                        │
│  │  ├─ GoTrue Auth                                          │
│  │  ├─ Realtime Server                                      │
│  │  ├─ Storage API                                          │
│  │  └─ Edge Functions (Deno)                                │
│  │                                                            │
│  ├─ Redis (Caching)                                         │
│  ├─ MinIO (S3-compatible storage)                           │
│  └─ Nginx (Reverse proxy)                                   │
│                                                               │
│  Integrations (Future)                                       │
│  ├─ WhatsApp Business API                                   │
│  ├─ MTN MoMo API                                            │
│  ├─ Orange Money API                                        │
│  └─ OpenAI/Gemini/Claude                                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Implementation Plan

### Phase 1: Docker Environment Setup (Day 1)

#### Step 1.1: Create Isolated Docker Network
```bash
# Create dedicated network for MRU
docker network create mru-network
```

#### Step 1.2: Project Structure
```
MRU/
├── docker/
│   ├── docker-compose.yml          # Main orchestration
│   ├── .env.local                  # Local environment variables
│   ├── supabase/
│   │   ├── config.toml             # Supabase configuration
│   │   ├── migrations/             # Database migrations
│   │   └── seed.sql                # Initial data
│   ├── nginx/
│   │   └── nginx.conf              # Reverse proxy config
│   └── scripts/
│       ├── init-db.sh              # Database initialization
│       └── backup.sh               # Backup script
├── app/                            # Your existing Next.js app
├── components/                     # Your existing components
└── docs/                           # Documentation
```

#### Step 1.3: Docker Compose Configuration
We'll create a `docker-compose.yml` that includes:
- **Supabase Studio**: Web UI for database management
- **PostgreSQL**: Main database
- **PostgREST**: Auto-generated REST API
- **GoTrue**: Authentication service
- **Realtime**: WebSocket server
- **Storage**: File storage service
- **Redis**: Caching layer
- **MinIO**: S3-compatible object storage

### Phase 2: Supabase Local Setup (Day 1-2)

#### Step 2.1: Install Supabase CLI
```bash
# Install Supabase CLI globally
npm install -g supabase

# Or use npx (no global install)
npx supabase --version
```

#### Step 2.2: Initialize Supabase Project
```bash
cd c:\Users\Lenovo\Desktop\MRU
npx supabase init
```

This creates:
- `supabase/config.toml` - Configuration
- `supabase/migrations/` - Database migrations
- `supabase/functions/` - Edge functions

#### Step 2.3: Start Supabase Locally
```bash
npx supabase start
```

This will:
- Pull required Docker images
- Start all Supabase services
- Provide you with:
  - API URL: `http://localhost:54321`
  - Studio URL: `http://localhost:54323`
  - Anon Key: `eyJhbG...` (for frontend)
  - Service Role Key: `eyJhbG...` (for backend)

### Phase 3: Database Schema Design (Day 2-3)

#### Core Tables for Multi-Vendor E-Commerce

```sql
-- 1. Vendors/Merchants
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Transactions (Mobile Money)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  vendor_id UUID REFERENCES vendors(id),
  change_type VARCHAR(50), -- 'restock', 'sale', 'adjustment'
  quantity_change INTEGER NOT NULL,
  previous_quantity INTEGER,
  new_quantity INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE storefronts ENABLE ROW LEVEL SECURITY;

-- Vendors can only see their own data
CREATE POLICY "Vendors can view own data" ON vendors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Vendors can update own data" ON vendors
  FOR UPDATE USING (auth.uid() = user_id);

-- Products policies
CREATE POLICY "Vendors can manage own products" ON products
  FOR ALL USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

-- Similar policies for other tables...
```

### Phase 4: Frontend Integration (Day 3-4)

#### Step 4.1: Install Supabase Client
```bash
cd c:\Users\Lenovo\Desktop\MRU
npm install @supabase/supabase-js @supabase/ssr
```

#### Step 4.2: Create Environment Variables
Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MRU Merchant OS

# Feature Flags
NEXT_PUBLIC_ENABLE_VOICE=false
NEXT_PUBLIC_ENABLE_MOBILE_MONEY=false
```

#### Step 4.3: Create Supabase Client
Create `lib/supabase/client.ts`:
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Create `lib/supabase/server.ts`:
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

### Phase 5: Authentication System (Day 4-5)

#### Step 5.1: Auth Components
- Login/Register forms
- OTP verification (phone)
- Password reset
- Protected routes middleware

#### Step 5.2: Role-Based Access Control
```sql
-- Add role to auth.users metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.vendors (user_id, email, phone)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.phone
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Phase 6: Multi-Vendor Features (Day 5-7)

#### Core Features to Build:
1. **Vendor Dashboard**
   - Sales overview
   - Product management
   - Order management
   - Mobile money balance

2. **Product Management**
   - CRUD operations
   - Image upload (Supabase Storage)
   - Inventory tracking
   - Voice-based product entry (future)

3. **Order Processing**
   - Order creation
   - Status updates
   - Payment tracking
   - Customer notifications

4. **Storefront Generator**
   - Auto-generate storefront from vendor data
   - Custom subdomain (vendor.mru.com)
   - Template selection
   - AI-powered content generation (future)

---

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` to Git
- Use different keys for dev/staging/production
- Rotate keys regularly

### 2. Database Security
- Enable RLS on all tables
- Use prepared statements
- Validate all inputs
- Implement rate limiting

### 3. API Security
- Use service role key only on server
- Implement CORS properly
- Add request validation
- Use HTTPS in production

### 4. Authentication
- Enforce strong passwords
- Implement MFA (OTP via phone)
- Session management
- Secure cookie settings

---

## 📦 Docker Isolation Strategy

### How to Keep MRU Separate from Other Projects

#### Option 1: Custom Network (Recommended)
```yaml
# docker-compose.yml
networks:
  mru-network:
    name: mru-network
    driver: bridge

services:
  postgres:
    networks:
      - mru-network
```

#### Option 2: Custom Ports
```yaml
services:
  postgres:
    ports:
      - "54322:5432"  # Different from default 5432
  
  supabase-studio:
    ports:
      - "54323:3000"  # Different from default 3000
```

#### Option 3: Project-Specific Compose File
```bash
# Start MRU stack
docker-compose -f docker/docker-compose.yml -p mru up -d

# Stop MRU stack
docker-compose -f docker/docker-compose.yml -p mru down

# View MRU containers only
docker-compose -f docker/docker-compose.yml -p mru ps
```

---

## 🎯 Next Steps - Decision Required

### Option A: Supabase CLI (Recommended)
**Pros:**
- Official Supabase tooling
- Automatic updates
- Built-in migration system
- Easy cloud deployment later
- Studio UI included

**Cons:**
- Requires Supabase CLI installation
- More opinionated structure

**Setup Time:** 1-2 hours

### Option B: Manual Docker Compose
**Pros:**
- Full control over configuration
- Can customize every service
- No CLI dependency
- Learn Docker deeply

**Cons:**
- More manual setup
- Need to manage updates
- More complex configuration

**Setup Time:** 4-6 hours

---

## 🤔 My Recommendation

**Use Supabase CLI (Option A)** because:

1. ✅ You already planned to use Supabase in production
2. ✅ Seamless migration from local → cloud
3. ✅ Built-in best practices
4. ✅ Active community support
5. ✅ Faster development iteration

**You DON'T need to set Supabase cloud variables now.** We'll run everything locally first, then migrate to cloud when ready.

---

## 📝 Immediate Action Items

### What I Need from You:

1. **Confirm Approach**: Do you want to proceed with Supabase CLI (Option A)?

2. **Database Schema Review**: Review the proposed tables above. Any additional features needed?

3. **Priority Features**: Which features should we build first?
   - [ ] Vendor registration & auth
   - [ ] Product management
   - [ ] Order processing
   - [ ] Storefront generator
   - [ ] Mobile money integration
   - [ ] Voice interface (WhatsApp)

4. **Timeline**: What's your target launch date?

---

## 🚀 What I'll Do Next (After Your Confirmation)

1. Create complete Docker Compose setup
2. Generate all migration files
3. Set up authentication system
4. Build vendor dashboard
5. Create API routes
6. Implement RLS policies
7. Add seed data for testing
8. Create development workflow documentation

---

## 📚 Additional Resources

- [Supabase Local Development](https://supabase.com/docs/guides/cli/local-development)
- [Next.js + Supabase Auth](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Docker Compose Best Practices](https://docs.docker.com/compose/production/)
- [Multi-Tenant Architecture](https://supabase.com/docs/guides/database/multi-tenancy)

---

**Ready to proceed? Let me know your preferences and I'll start building!** 🚀
