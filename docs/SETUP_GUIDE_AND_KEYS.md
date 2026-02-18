# 🔑 MRU Setup Guide: Connecting to Isolated Docker Environment

## 1. Environment Status
Your dedicated MRU environment is running in Docker Desktop.
- **Project Name:** `MRU` (Isolated Stack)
- **Database Port:** `64322`
- **API Port:** `64321`
- **Studio UI:** `http://127.0.0.1:64323`

## 2. 🚨 CRITICAL: Getting Your API Keys
Since this is an isolated local instance, the keys are generated dynamically on startup. You must retrieve them manually to connect your frontend.

### Step-by-Step Retrieval:
1.  Open your browser to the **Dedicated Studio**:  
    👉 **[http://127.0.0.1:64323](http://127.0.0.1:64323)**
2.  Click on **Project Settings** (typically the ⚙️ icon at the bottom left).
3.  Click on **API** in the side menu.
4.  You will see two keys:
    - `anon` `public`: This is your **NEXT_PUBLIC_SUPABASE_ANON_KEY**.
    - `service_role`: This is your **SUPABASE_SERVICE_ROLE_KEY** (keep this secret!).

## 3. Configuration File (`.env.local`)
Create a file named `.env.local` in the project root (`c:\Users\Lenovo\Desktop\MRU`) and paste the keys:

```env
# -------------------------------------------------------------
# MRU Isolated Environment (Ports 64xxx)
# -------------------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:64321
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=paste_your_service_role_key_here

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="MRU Merchant OS"

# Feature Flags
NEXT_PUBLIC_ENABLE_VOICE=true
NEXT_PUBLIC_ENABLE_MOBILE_MONEY=true

# AI Keys (Get from Google AI Studio)
# GOOGLE_AI_API_KEY=
```

## 4. Verifying the Connection
Once `.env.local` is set, run the development server:
```bash
npm run dev
```
The app should now be able to fetch data from your isolated database.

## 5. Database Schema
The database has been initialized with the following tables (Migration: `20240210000000_initial_schema.sql`):
- `vendors`
- `products`
- `orders`
- `order_items`
- `transactions`
- `voice_interactions`
- `storefronts`
- `inventory_logs`
- **RLS Policies:** Enabled for secure multi-vendor access.
