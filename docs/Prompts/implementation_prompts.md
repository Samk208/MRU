# 🤖 MRU Merchant OS: Master Implementation Prompts

This document contains a series of **optimized, context-aware prompts** designed to build the MRU Merchant OS step-by-step. Copy and paste these prompts into your AI coding assistant (Cursor, Claude Code, etc.) to execute the implementation plan.

---

## 📋 Project Context Strategy
*Paste this at the start of every new session to ground the AI.*

```markdown
# MRU MERCHANT OS - PROJECT CONTEXT

**Project Type**: SaaS Platform for African Merchants
**Core Value**: Voice-first, AI-powered business management for low-connectivity markets

**Tech Stack**:
- **Frontend**: Next.js 16 (App Router) + React 19 + TailwindCSS + shadcn/ui ✅
- **Backend**: Supabase (Self-hosted via Docker) 🚧
- **Database**: PostgreSQL 15 with RLS + 8 Core Tables
- **AI Engine**: Google Gemini 1.5 Flash (via Edge Functions)
- **Infrastructure**: Docker Desktop (Isolated Port Range: 64321-64325)

**Core Constraints**:
- **Offline-First**: Must handle intermittent connectivity.
- **Mobile-First**: Primary interface is a smartphone.
- **Low Tech Literacy**: UI must be extremely simple and visual.
- **Performance**: Optimized for 3G/4G networks.

**Current Phase**: Phase 1 - Authentication & Infrastructure
```

---

## 🏗️ Phase 1: Infrastructure & Authentication (Priority: HIGH)

### Prompt 1.1: Docker Supabase Infrastructure
*Goal: Get the backend running locally in isolation.*

```text
You are a DevOps Engineer specializing in Docker and Supabase.

TASK: Set up a local, isolated Supabase instance for MRU Merchant OS.

CONTEXT:
- We are running on Windows.
- We need to avoid port conflicts with other local projects.
- Range: 64321-64325.

ACTION PLAN:
1. Create a `docker` directory in the project root.
2. Generate a `docker-compose.yml` file specifically for Supabase.
   - Studio Port: 64321
   - Kong API Port: 64322
   - DB Port: 64325
   - Auth Port: 64324
3. Create a `.env.supabase` file with secure default credentials.
4. Create a initialization script `scripts/init-supabase.ps1` (PowerShell) to:
   - Check if Docker is running.
   - Start the containers.
   - Apply the existing migration file: `supabase/migrations/20240210000000_initial_schema.sql`
5. Update `.env.local` in the Next.js app to point to these new local ports.

DELIVERABLE:
- functional `docker-compose.yml`
- setup scripts
- Updated `.env.local`
```

### Prompt 1.2: Authentication & User Profiles
*Goal: secure login and auto-profile creation.*

```text
You are a Senior Full-Stack Developer. Implement Authentication for MRU.

CONTEXT:
- Stack: Next.js 16 + Supabase (SSR).
- Users: Vendors (Merchants).
- Schema: We have a `vendors` table that links to `auth.users`.

REQUIREMENTS:
1. **Supabase Client**: Ensure `@supabase/ssr` client is correctly set up in `lib/supabase/server.ts` and `client.ts`.
2. **Middleware**: Create `middleware.ts` to refresh sessions and protect `/dashboard/*` routes.
3. **Trigger**: Verify/Create the PostgreSQL trigger `handle_new_user` to automatically insert a row into `public.vendors` when a user signs up.
4. **UI**: Create a clean, mobile-responsive Login page (`app/login/page.tsx`) using `shadcn/ui` components (Card, Input, Button).
   - Use Email/Password for now.
   - Add a simple "Register" link.

DELIVERABLE:
- Fully functional Auth flow.
- Redirect to `/dashboard` upon success.
```

---

## 🏪 Phase 2: Vendor Dashboard (Priority: HIGH)

### Prompt 2.1: Mobile-First Dashboard Shell
*Goal: The main interface for merchants.*

```text
You are a UI/UX Specialist for Emerging Markets. Build the MRU Dashboard Layout.

CONTEXT:
- Users have low tech literacy.
- Devices are mostly Android smartphones.
- Visuals over text where possible.

REQUIREMENTS:
1. **Layout**: Create `app/dashboard/layout.tsx`.
   - Bottom Navigation Bar for Mobile (Home, Products, Orders, Profile).
   - Sidebar for Desktop (responsive adapter).
2. **Design Language**:
   - Large touch targets (min 44px).
   - High contrast.
   - Use `lucide-react` icons extensively.
3. **Components**:
   - `DashboardNav`: Responsive navigation component.
   - `VoiceFAB`: A Floating Action Button (FAB) for the AI Voice Assistant (placeholder for now).

DELIVERABLE:
- Responsive Dashboard Shell.
- Empty states for main sections.
```

### Prompt 2.2: Product Management (CRUD)
*Goal: Let vendors add their inventory.*

```text
You are a React Developer. Build the Product Management feature.

CONTEXT:
- Table: `products`
- RLS: Vendors can only see/edit their own products.

REQUIREMENTS:
1. **Server Actions**: Create `lib/actions/products.ts` for:
   - `createProduct` (with Zod validation).
   - `updateProduct`
   - `deleteProduct`
2. **UI**: Create `app/dashboard/products/page.tsx` and `app/dashboard/products/new/page.tsx`.
   - List View: specialized Mobile card view (Image + Name + Price + horizontal edit actions). NOT a standard complex data table.
   - Edit Form: Simple form with `react-hook-form`.
3. **Image Upload**:
   - Use Supabase Storage (bucket: `product-images`).
   - Implement a simple image picker and uploader.

DELIVERABLE:
- Full CRUD for products.
- Optimistic UI updates for fast feel.
```

### Prompt 2.3: Order Management System
*Goal: Track sales and customer interactions.*

```text
You are a Backend Developer. Build the Order Processing System.

CONTEXT:
- Tables: `orders`, `transactions`, `communication_logs`.
- Architecture: Orders can be created manually by the vendor or automatically via AI Voice Agents.

REQUIREMENTS:
1. **Server Actions**: `lib/actions/orders.ts`
   - `createOrder`: Transactional insert (Order + Line Items).
   - `updateOrderStatus`: (PENDING -> PAID -> DELIVERED).
2. **UI**: `app/dashboard/orders/page.tsx`
   - Kanban board or simple status list (Pending, Completed).
   - Order Detail View: Show items, total, and customer info.
3. **Receipt Generation**:
   - Simple function to generate a text-based receipt for WhatsApp sharing.
   - Format: "🧾 Receipt from [Store Name]\nItem: [Product]...\nTotal: [Amount]"

DELIVERABLE:
- Order management flow.
- WhatsApp receipt sharing feature.
```

---

## 🤖 Phase 3: AI & Voice (Priority: MEDIUM)

### Prompt 3.1: Gemini Voice Agent (Edge Function)
*Goal: The "Brain" of the application.*

```text
You are an AI Engineer. Deploy the Gemini Voice Agent.

CONTEXT:
- Model: Gemini 1.5 Flash.
- Platform: Supabase Edge Functions (Deno).

TASK:
1. Create a Supabase Edge Function `gemini-agent`.
2. Integration:
   - Input: Text (transcribed voice) or Audio (feature flag).
   - Logic: Parse intent (SALE, RESTOCK, QUERY) using a robust system prompt.
   - Output: JSON structured data for the frontend to act on.
3. Prompt Engineering:
   - Write a system prompt that understands West African market context (Pidgin, French nuances).
   - Define strict JSON output schemas.

DELIVERABLE:
- `supabase/functions/gemini-agent/index.ts`
- TypeScript interfaces for the Agent response.
```

---

## 🚀 Phase 4: Storefront & Deployment (Priority: MEDIUM)

### Prompt 4.1: Public Storefront Generator
*Goal: The public face for customers.*

```text
You are a Frontend Architect. Build the Storefront System.

CONTEXT:
- URLs: `mru.com/shop/[vendor_slug]`
- Data: Public access to `products` where `is_active = true`.

REQUIREMENTS:
1. **Dynamic Route**: `app/shop/[slug]/page.tsx`.
2. **Static Generation**: Use `generateStaticParams` if possible, or aggressive caching.
3. **UI**:
   - A clean, simple catalog view.
   - "Order via WhatsApp" button (constructs a `wa.me` link with the order details).
4. **SEO**: Dynamic metadata based on Vendor Name and top products.

DELIVERABLE:
- Public store pages.
- WhatsApp cart integration.
```

### Prompt 4.2: CI/CD Pipeline
*Goal: Automate safety.*

```text
You are a DevOps Engineer. Setup GitHub Actions.

TASK: Create a `.github/workflows/ci.yml`.

STEPS:
1. **Lint & Typecheck**: Run on every PR.
2. **Supabase Safety**:
   - Check for migration conflicts.
   - (Optional) Run Supabase Local tests.
3. **Netlify Deployment**:
   - Trigger Netlify deployments on merge to main.

DELIVERABLE:
- Robust CI/CD configuration.
```

### Prompt 4.3: Production Optimization & Monitoring
*Goal: Ensure the app is fast and observable.*

```text
You are a Site Reliability Engineer. Prepare MRU for Production on Netlify.

CONTEXT:
- Hosting: Netlify (Frontend), Supabase (Backend).
- Region: Closest to West Africa (likely Europe West).

TASK:
1. **monitoring**: Set up Sentry for error tracking in `next.config.js` and client/server SDKs.
2. **Analytics**: use basic Google Analytics 4 (GA4) or PostHog instead of Vercel Analytics.
3. **Performance**:
   - Verify `next/image` requires `netlify-plugin-nextjs-image` or configured cloud provider.
   - Implement route segment config `export const revalidate = 3600` for public storefronts.
4. **Security Headers**: Add strict Content Security Policy (CSP) in `middleware.ts` or `netlify.toml`.

DELIVERABLE:
- Production-ready configuration.
- Sentry integration.
```
