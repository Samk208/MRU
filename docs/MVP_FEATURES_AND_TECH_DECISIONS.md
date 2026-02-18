# 🚀 MRU Merchant OS - MVP Features & Tech Stack Decisions

## 📊 Next.js 15 vs 16 Analysis

### Current Status
**You're already on Next.js 16.1.6** ✅ (Latest version as of Feb 2026)

### Next.js 16 vs 15 - Key Differences

#### 🏆 Why Next.js 16 is Better (Stay on 16)

| Feature | Next.js 15 | Next.js 16 | Impact for MRU |
|---------|-----------|-----------|----------------|
| **Bundler** | Turbopack optional | **Turbopack default** | ⚡ 10x faster dev, 2-5x faster builds |
| **Caching** | Experimental PPR | **`use cache` directive** | 🎯 Fine-grained control for vendor data |
| **React Version** | React 19 (experimental compiler) | **React 19.2 + stable compiler** | 🚀 Auto-memoization, fewer re-renders |
| **Middleware** | `middleware.ts` | **`proxy.ts`** | 🔒 Clearer network boundaries |
| **Performance** | Fast | **Faster** | 📈 Better UX for low-bandwidth users |
| **File System Cache** | Not available | **Turbopack FS caching** | ⚡ Faster startup on restarts |
| **Node.js** | 18.17+ | **20.9+ required** | ✅ Better security & performance |

#### 🎯 Recommendation: **STAY ON NEXT.JS 16**

**Why:**
1. ✅ **Turbopack by default** - Critical for fast iteration during development
2. ✅ **Stable React Compiler** - Automatic performance optimizations
3. ✅ **Better caching model** - Essential for multi-vendor data isolation
4. ✅ **Production-ready** - All experimental features from 15 are now stable
5. ✅ **Future-proof** - This is the current standard (Feb 2026)

**No downgrade needed** - You're already on the best version! 🎉

---

## 📋 MVP Feature Prioritization (Based on advancement.md)

### ✅ Phase 1: Build NOW (Months 1-3) - Docker Desktop Only

Based on your `advancement.md` roadmap, here are the features we'll build immediately:

#### 🔹 1. Easy Voice-First Store Creation ⭐ **HIGH PRIORITY**
**Why Now:**
- Core value proposition
- Differentiates from competitors
- Solves merchant friction immediately

**Implementation:**
```
┌─────────────────────────────────────────┐
│ Merchant Input (Text/Voice)             │
│ ↓                                        │
│ AI Processing (GPT-4/Gemini)            │
│ ↓                                        │
│ Auto-generate Storefront                │
│ ├─ Products                             │
│ ├─ Categories                           │
│ ├─ Branding                             │
│ └─ "Buy on WhatsApp" buttons            │
└─────────────────────────────────────────┘
```

**Docker Services:**
- ✅ Supabase (Database + Storage for images)
- ✅ Edge Functions (AI orchestration)
- ⏳ OpenAI/Gemini API (external, not in Docker)

**Database Tables:**
- `vendors`
- `storefronts`
- `products`
- `categories`

---

#### 🔹 2. Voice-Based Transaction Logging ⭐ **HIGH PRIORITY**
**Why Now:**
- Core UX differentiator
- Enables hands-free operation
- Critical for target market (low literacy)

**Implementation:**
```
WhatsApp Audio → Webhook → Edge Function
    ↓
Whisper STT (OpenAI)
    ↓
Intent Parsing (GPT-4/Gemini)
    ↓
Action: "Sell", "Restock", "Balance"
    ↓
Database Update + Confirmation
```

**Docker Services:**
- ✅ Supabase Edge Functions
- ✅ PostgreSQL (transaction logs)
- ⏳ WhatsApp API (external webhook)

**Database Tables:**
- `voice_interactions`
- `transactions`
- `inventory_logs`

---

#### 🔹 3. Supabase-Managed Backend & Auth ⭐ **CRITICAL**
**Why Now:**
- Foundation for everything else
- Security from day one
- Multi-tenant isolation

**Implementation:**
- ✅ Supabase Auth (email, phone OTP)
- ✅ Row Level Security (RLS)
- ✅ Role-based access control (RBAC)
- ✅ Vendor profiles

**Docker Services:**
- ✅ Supabase (GoTrue Auth)
- ✅ PostgreSQL
- ✅ Supabase Studio (management UI)

**Database Tables:**
- `auth.users` (Supabase managed)
- `vendors`
- `user_roles`

---

#### 🔹 4. Mobile Money Integration ⭐ **HIGH PRIORITY**
**Why Now:**
- Primary payment rail for target market
- Increases merchant stickiness
- Enables real transactions

**Implementation:**
```
┌─────────────────────────────────────┐
│ Payment Providers                   │
│ ├─ MTN MoMo API                    │
│ └─ Orange Money API                │
│                                     │
│ Features:                           │
│ ├─ Payment triggers (STK Push)     │
│ ├─ Balance tracking                │
│ ├─ Transaction history             │
│ └─ Float management                │
└─────────────────────────────────────┘
```

**Docker Services:**
- ✅ Supabase Edge Functions (webhook handlers)
- ✅ PostgreSQL (transaction records)
- ⏳ MTN/Orange APIs (external)

**Database Tables:**
- `transactions`
- `mobile_money_accounts`
- `payment_webhooks`

---

#### 🔹 5. Simplified Merchant Dashboard ⭐ **HIGH PRIORITY**
**Why Now:**
- Merchants need to see their data
- Core value delivery
- Builds trust

**Features:**
```
Dashboard Sections:
├─ Sales Overview (today, week, month)
├─ Mobile Money Float
├─ Inventory Summary
├─ Recent Orders
├─ Quick Actions
│  ├─ Add Product (voice/text)
│  ├─ Record Sale
│  └─ Check Balance
└─ Analytics (simple charts)
```

**Tech Stack:**
- ✅ Next.js 16 App Router
- ✅ shadcn/ui components (you already have 80!)
- ✅ Recharts (already installed)
- ✅ TanStack Query (for data fetching)

**Docker Services:**
- ✅ Supabase (data source)
- ✅ Next.js dev server (local)

---

#### 🔹 6. Basic AI Assistant for Navigation ⭐ **MEDIUM PRIORITY**
**Why Now:**
- Enhances UX
- Helps merchants discover features
- Simple to implement

**Implementation:**
```
Chat Interface:
├─ Text input
├─ Voice input (optional)
└─ AI responses

Commands:
├─ "Show yesterday's sales"
├─ "How many products do I have?"
├─ "What's my balance?"
└─ "Help me add a product"
```

**Docker Services:**
- ✅ Supabase Edge Functions
- ⏳ OpenAI/Gemini API (external)

---

## 🐳 Docker Desktop Setup - Complete Stack

### ✅ YES - Everything Runs in Docker Desktop

Here's what we'll run locally:

```yaml
# docker-compose.yml structure
services:
  # Core Supabase Stack
  supabase-db:          # PostgreSQL 15
  supabase-studio:      # Web UI (localhost:54323)
  supabase-auth:        # GoTrue Auth
  supabase-rest:        # PostgREST API
  supabase-realtime:    # Realtime subscriptions
  supabase-storage:     # File storage
  supabase-functions:   # Edge Functions (Deno)
  
  # Supporting Services
  redis:                # Caching layer
  minio:                # S3-compatible storage
  nginx:                # Reverse proxy
  
  # Optional (for production simulation)
  pgadmin:              # Database admin UI
```

### 🔒 Isolation from Other Docker Projects

**Method 1: Custom Network** ✅ Recommended
```yaml
networks:
  mru-network:
    name: mru-network
    driver: bridge
```

**Method 2: Custom Ports**
```yaml
ports:
  - "54321:8000"  # API
  - "54323:3000"  # Studio
  - "54322:5432"  # PostgreSQL
```

**Method 3: Project Prefix**
```bash
# Start MRU stack
docker-compose -p mru up -d

# View only MRU containers
docker ps --filter "name=mru"

# Stop MRU stack
docker-compose -p mru down
```

**Your other Docker projects will NOT be affected!** ✅

---

## 📊 MVP Feature Matrix

| Feature | Priority | Build Now? | Docker Service | External API | Complexity |
|---------|----------|------------|----------------|--------------|------------|
| **Vendor Auth** | ⭐⭐⭐ | ✅ YES | Supabase Auth | - | Low |
| **Product CRUD** | ⭐⭐⭐ | ✅ YES | Supabase DB | - | Low |
| **Storefront Generator** | ⭐⭐⭐ | ✅ YES | Edge Functions | OpenAI/Gemini | Medium |
| **Voice Transaction Log** | ⭐⭐⭐ | ✅ YES | Edge Functions | Whisper API | Medium |
| **Mobile Money** | ⭐⭐⭐ | ✅ YES | Edge Functions | MTN/Orange | High |
| **Merchant Dashboard** | ⭐⭐⭐ | ✅ YES | Next.js | - | Low |
| **AI Assistant** | ⭐⭐ | ✅ YES | Edge Functions | OpenAI/Gemini | Low |
| **Order Processing** | ⭐⭐⭐ | ✅ YES | Supabase DB | - | Medium |
| **Inventory Tracking** | ⭐⭐ | ✅ YES | Supabase DB | - | Low |
| **Basic Analytics** | ⭐⭐ | ✅ YES | PostgreSQL | - | Low |

### ⏳ Phase 2 Features (Months 3-6) - Not Now

| Feature | Priority | Build Later | Why Wait |
|---------|----------|-------------|----------|
| **Template Library** | ⭐⭐ | ⏳ Phase 2 | Need user feedback first |
| **Predictive Analytics** | ⭐⭐ | ⏳ Phase 2 | Need historical data |
| **Recommender Engine** | ⭐ | ⏳ Phase 2 | Need usage patterns |
| **Local Dialect Support** | ⭐⭐ | ⏳ Phase 2 | Resource-heavy, needs fine-tuning |

### 🚀 Future Features (Months 6+) - Advanced

| Feature | Priority | Build Future | Why Wait |
|---------|----------|--------------|----------|
| **Multi-Agent Workflows** | ⭐ | 🔮 Future | Complex, needs solid foundation |
| **AI Shopping Assistant** | ⭐ | 🔮 Future | Advanced AI, high cost |
| **Autonomous Float Rebalancing** | ⭐ | 🔮 Future | Fintech complexity |
| **Customer Data Platform** | ⭐ | 🔮 Future | Needs scale first |
| **AI Tax Automation** | ⭐ | 🔮 Future | Legal compliance required |

---

## 🎯 Recommended Build Order

### Week 1-2: Foundation
1. ✅ Set up Docker environment
2. ✅ Initialize Supabase locally
3. ✅ Create database schema
4. ✅ Set up authentication
5. ✅ Build vendor registration flow

### Week 3-4: Core Features
6. ✅ Product management (CRUD)
7. ✅ Basic dashboard
8. ✅ Order processing
9. ✅ Inventory tracking

### Week 5-6: Differentiators
10. ✅ Storefront generator (AI-powered)
11. ✅ Voice transaction logging
12. ✅ AI assistant (basic)

### Week 7-8: Payments & Polish
13. ✅ Mobile money integration
14. ✅ Analytics dashboard
15. ✅ Testing & bug fixes
16. ✅ Documentation

---

## 🛠️ Tech Stack Summary (Docker-First)

### Frontend (Existing)
- ✅ Next.js 16.1.6 (KEEP - it's perfect!)
- ✅ React 19
- ✅ TypeScript 5.7.3
- ✅ TailwindCSS 3.4.17
- ✅ shadcn/ui (80 components)
- ✅ Recharts (analytics)

### Backend (Docker)
- ✅ Supabase (all services)
  - PostgreSQL 15
  - PostgREST API
  - GoTrue Auth
  - Realtime
  - Storage
  - Edge Functions (Deno)
- ✅ Redis (caching)
- ✅ MinIO (S3 storage)
- ✅ Nginx (reverse proxy)

### External APIs (Not in Docker)
- ⏳ OpenAI API (Whisper, GPT-4)
- ⏳ Gemini API (alternative to GPT)
- ⏳ Claude API (alternative)
- ⏳ WhatsApp Business API
- ⏳ MTN MoMo API
- ⏳ Orange Money API

### Development Tools (Docker)
- ✅ Supabase Studio (DB management)
- ✅ pgAdmin (optional)
- ✅ Redis Commander (optional)

---

## 📝 Environment Variables Strategy

### Local Development (.env.local)
```env
# Supabase (Docker)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MRU Merchant OS
NODE_ENV=development

# Feature Flags (Start with all disabled)
NEXT_PUBLIC_ENABLE_VOICE=false
NEXT_PUBLIC_ENABLE_MOBILE_MONEY=false
NEXT_PUBLIC_ENABLE_AI_ASSISTANT=false
NEXT_PUBLIC_ENABLE_STOREFRONT_GENERATOR=false

# External APIs (Add when ready)
# OPENAI_API_KEY=sk-...
# GEMINI_API_KEY=...
# WHATSAPP_API_TOKEN=...
# MTN_MOMO_API_KEY=...
# ORANGE_MONEY_API_KEY=...
```

### Production (.env.production) - Future
```env
# Supabase Cloud (when you migrate)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# All feature flags enabled
NEXT_PUBLIC_ENABLE_VOICE=true
NEXT_PUBLIC_ENABLE_MOBILE_MONEY=true
NEXT_PUBLIC_ENABLE_AI_ASSISTANT=true
NEXT_PUBLIC_ENABLE_STOREFRONT_GENERATOR=true
```

---

## 🎯 Final Recommendations

### ✅ Confirmed Decisions:

1. **Next.js Version**: **STAY ON 16.1.6** ✅
   - Already on the best version
   - Turbopack, stable React Compiler, better caching
   - No downgrade needed

2. **Docker Setup**: **YES - Everything in Docker Desktop** ✅
   - Supabase CLI + Docker Compose
   - Isolated network (no interference with other projects)
   - Custom ports (54321-54325)

3. **MVP Features**: **Build Phase 1 Features NOW** ✅
   - Vendor auth
   - Product management
   - Storefront generator (AI)
   - Voice transaction logging
   - Mobile money integration
   - Merchant dashboard
   - Basic AI assistant
   - Order processing

4. **Timeline**: **8 weeks to MVP** ✅
   - Week 1-2: Foundation
   - Week 3-4: Core features
   - Week 5-6: Differentiators
   - Week 7-8: Payments & polish

---

## 🚀 Next Steps

### What I'll Build First (After Your Approval):

1. **Docker Compose Configuration**
   - Complete `docker-compose.yml`
   - Supabase initialization
   - Network isolation setup

2. **Database Schema**
   - All 8 core tables
   - RLS policies
   - Indexes and triggers
   - Seed data

3. **Authentication System**
   - Vendor registration
   - Phone OTP verification
   - Protected routes
   - Role-based access

4. **Vendor Dashboard**
   - Layout with your existing shadcn/ui components
   - Sales overview
   - Product list
   - Quick actions

5. **Product Management**
   - CRUD operations
   - Image upload (Supabase Storage)
   - Inventory tracking

---

## ❓ Questions for You:

1. **Approve MVP Features?** Are the Phase 1 features correct based on your vision?

2. **Timeline Acceptable?** Is 8 weeks to MVP reasonable for your launch plans?

3. **External APIs Priority?** Which should we integrate first?
   - [ ] OpenAI (for AI features)
   - [ ] WhatsApp (for voice)
   - [ ] Mobile Money (for payments)

4. **Ready to Start?** Should I begin with Docker setup now?

---

**Summary: YES to everything! Docker Desktop ✅ | Next.js 16 ✅ | Phase 1 Features ✅**

Let me know and I'll start building immediately! 🚀
