---
description: Initialize the local development environment ensuring Docker isolation
---

# 🐳 MRU Dev Environment Setup Workflow

This workflow sets up the local Docker-based development environment for MRU. It ensures that the Supabase instance runs on isolated ports to avoid conflicts with other local projects.

## Prerequisites
- Docker Desktop installed and running
- Node.js 20+ installed

## 1. Install Supabase CLI
Installs the Supabase CLI as a dev dependency to ensure version consistency across the team.

```bash
npm install -D supabase
```

## 2. Initialize Supabase Configuration
Initializes the local Supabase configuration. This creates the `supabase` directory with `config.toml`.

```bash
npx supabase init
```

## 3. Configure Isolation (Critical Step)
Updates `supabase/config.toml` to use specific ports to avoid conflicts with your other projects.
Use ports **54323** (Studio), **54321** (API), **54322** (DB) for MRU.

```bash
# This step is manual or scripted via sed/replace in a real scenario
# Verify ports in supabase/config.toml
# studio.port = 54323
# api.port = 54321 (default, change if needed e.g. 54324)
# db.port = 54322 (default, change if needed e.g. 54325)
```

## 4. Start Supabase Services
Starts the entire backend stack in Docker.

// turbo
```bash
npx supabase start
```

## 5. Link Local Environment
Generates the local environment types and links them.

```bash
npx supabase gen types typescript --local > types/supabase.ts
```

## 6. Verify Status
Checks that all services are running correctly.

```bash
npx supabase status
```
