---
description: Create and apply database migrations safely
---

# 🗄️ Database Migration Workflow

Use this workflow to make changes to the database schema. **Never edit the database directly in production!**

## 1. Create a New Migration
Creates a new migration file in `supabase/migrations` with the current timestamp.
Replace `name_of_change` with a descriptive name (e.g., `create_vendors_table`).

```bash
npx supabase migration new name_of_change
```

## 2. Edit Migration File
Open the newly created SQL file in `supabase/migrations/` and write your SQL DDL statements (CREATE TABLE, ALTER TABLE, etc.).

## 3. Apply Migrations Locally
Applies the pending migrations to your local Docker database.

// turbo
```bash
npx supabase db reset
# OR for non-destructive apply:
# npx supabase migration up
```

**Note:** `db reset` wipes the local database and re-applies all migrations + seeds. This is the cleanest way to test.

## 4. Update TypeScript Types
After modifying the schema, always regenerate the types.

// turbo
```bash
npx supabase gen types typescript --local > types/supabase.ts
```
