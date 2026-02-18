---
description: Start the full MRU development stack (Docker + Next.js)
---

# 🚀 Start MRU Development Stack

This workflow starts both the backend (Supabase in Docker) and the frontend (Next.js).

## 1. Start Supabase (Backend)
Ensures the Docker containers are running. If they are already running, this command is safe (it will just status check).

// turbo
```bash
npx supabase start
```

## 2. Generate Types (Optional)
Ensures TypeScript types are in sync with the local database schema.

```bash
npx supabase gen types typescript --local > types/supabase.ts
```

## 3. Start Next.js (Frontend)
Starts the Next.js development server with Turbopack.

// turbo
```bash
npm run dev
```

## 🟢 Validating the Environment
- **Supabase Studio:** http://127.0.0.1:54323
- **Frontend:** http://localhost:3000
- **API URL:** http://127.0.0.1:54321
