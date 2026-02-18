# 🏗️ MRU Implementation Plan: Production-Ready Platform

## 1. Project Architecture (Verified Isolation)
- **Frontend:** Next.js 16.1.6 (App Router) + TailwindCSS + shadcn/ui
- **Backend:** Supabase Local (Docker) - Isolated Stack `MRU` (Ports 64321-64325)
- **Database:** PostgreSQL 15 with RLS + 8 Core Tables
- **AI Engine:** Google Gemini (1.5 Flash via Edge Functions)

## 2. Recommended Packages (Core Tech Stack)
The following packages are installed or recommended for implementation:

- **AI Integration:** `ai` + `@ai-sdk/google` (Run `npm install ai @ai-sdk/google`)
- **Data Fetching:** `@tanstack/react-query` (Run `npm install @tanstack/react-query`)
- **Supabase Client:** `@supabase/supabase-js`, `@supabase/ssr`
- **Validation:** `zod`
- **Forms:** `react-hook-form`
- **UI Components:** `lucide-react`, `sonner` (already present)

## 3. Implementation Phases (Claude Code Team Guide)

### Phase 1: Authentication & User Roles (Priority: HIGH)
**Goal:** Secure login for Vendors using Supabase Auth.
- **Backend:** Verify RLS policies on `vendors` table (migrated).
- **Frontend:** Implement Login/Sign Up pages (`/login`, `/register`).
- **Logic:** `handle_new_user` trigger automatically creates a vendor profile on signup.

### Phase 2: Vendor Dashboard & Data Management (Priority: HIGH)
**Goal:** Enable vendors to manage products and orders.
- **Structure:**
  - `app/dashboard/layout.tsx`: Protected layout (check auth).
  - `app/dashboard/products/page.tsx`: List products with add/edit functionality.
  - `app/dashboard/orders/page.tsx`: Order management view.
- **Data Access:** Use React Query hooks (`useProducts`, `useOrders`) connected to `supabase` client.

### Phase 3: Gemini AI Integration (Priority: MEDIUM)
**Goal:** Enable "Voice-First Store Creation" and "Transaction Intent Parsing".
- **Edge Function:** Create `supabase/functions/gemini-agent/index.ts`.
- **Logic:**
  1. Receive input (text/voice transcript).
  2. Call Gemini 1.5 Flash API via `@ai-sdk/google`.
  3. Parse intent (`SALE`, `RESTOCK`, `CREATE_STORE`).
  4. Perform database action based on intent.
  - **See detailed prompt logic in `docs/gemini.md`**.

### Phase 4: Storefront Generator (Priority: MEDIUM)
**Goal:** AI-generated public-facing store pages.
- **Dynamic Route:** `app/shop/[subdomain]/page.tsx`.
- **Logic:**
  1. Fetch store config from `storefronts` table based on subdomain.
  2. Render themed page using stored JSON configuration.
  3. Implement "Buy on WhatsApp" button logic.

### Phase 5: Voice/WhatsApp Integration (Priority: LOW)
**Goal:** Direct interaction via WhatsApp voice notes.
- **Integration:** Configure WhatsApp Business API webhook to point to Edge Function.
- **File Handling:** Upload voice note to Supabase Storage -> Transcribe (Whisper) -> Gemini -> Database.

## 4. Key Configurations
- **RLS Policies:** Currently enabled. Start development by creating a test vendor user.
- **Environment Variables:** Must act on instructions in `docs/SETUP_GUIDE_AND_KEYS.md`.
- **Database Schema:** Located at `supabase/migrations/20240210000000_initial_schema.sql`.

## 5. Next Steps for Developer
1. **Retrieve Keys:** Follow `docs/SETUP_GUIDE_AND_KEYS.md`.
2. **Setup Frontend:** `npm install @tanstack/react-query` if missing.
3. **Build Auth UI:** Focus on `/login` page first.
4. **Build Dashboard Layout:** Create the shell.
