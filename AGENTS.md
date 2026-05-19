# AGENTS.md — MRU Merchant OS

> Editor-agnostic entry point. Read by Claude Code, Cursor, Codex, OpenCode, Cline, and any AGENTS.md-aware tool.

## What this is

**MRU Merchant OS** — a voice-first commerce platform for West African merchants (Guinea, Liberia, and Mano River basin). Stack: Next.js 16 (App Router) + Supabase (local Docker) + Gemini AI. Target users are kiosk shop owners, market-stall vendors, and online resellers who need to manage products, log sales, and accept Mobile Money (MTN MoMo, Orange Money) — often via voice on slow connections.

## Repo layout

| Path | Purpose |
|---|---|
| `app/` | Next.js App Router routes — landing, login, dashboard, demo-store |
| `app/dashboard/store/actions.ts` | `saveStoreConfiguration` server action |
| `app/dashboard/voice/actions.ts` | `parseTransaction` + `confirmVoiceTransaction` server actions |
| `components/dashboard/` | Dashboard UI: voice transaction, store generator form, ledger, wallet, etc. |
| `components/landing/` | Landing page sections |
| `components/storefront/` | Public storefront components |
| `components/ui/` | shadcn/ui primitives |
| `lib/persistence/parse.ts` | Pure helpers (amount/currency/quantity parsing, slugify) — fully unit-tested |
| `lib/supabase/{client,server}.ts` | Supabase client factories (browser vs server) |
| `lib/gemini.ts` | Gemini AI client |
| `i18n/` | next-intl routing, request, navigation config |
| `messages/` | ICU MessageFormat dictionaries (EN + FR) |
| `supabase/migrations/` | DB schema — single migration with 8 tables + RLS |
| `supabase/functions/store-generator/` | Edge function calling Gemini for store config generation |
| `proxy.ts` | Next 16 auth proxy (replaces `middleware.ts`) — protects `/dashboard/*` |

## Commands

```bash
pnpm dev               # next dev on :3005
pnpm build             # production build
pnpm start             # next start on :3005
pnpm typecheck         # tsc --noEmit
pnpm lint              # eslint .
pnpm test              # vitest run (unit tests in lib/**)
pnpm test:watch        # vitest watch mode
pnpm supabase:start    # boot local Supabase Docker stack
pnpm supabase:stop     # stop stack
pnpm supabase:status   # show ports + keys
pnpm supabase:reset    # reset DB (applies migrations + seed)
pnpm supabase:types    # regen TypeScript types from schema
```

## Supabase local stack (Docker)

Isolated on `6432x` port range — won't collide with other Supabase projects.

| Service | URL |
|---|---|
| Project / Kong | `http://127.0.0.1:64321` |
| Postgres | `postgresql://postgres:postgres@127.0.0.1:64322/postgres` |
| Studio | `http://127.0.0.1:64323` |
| Mailpit | `http://127.0.0.1:64324` |
| REST | `http://127.0.0.1:64321/rest/v1` |
| GraphQL | `http://127.0.0.1:64321/graphql/v1` |
| Edge Functions | `http://127.0.0.1:64321/functions/v1` |

Local keys come from `pnpm supabase:status` — never commit them. Production keys go in the host's environment, not `.env.local`.

## Environment variables

Required for local dev (in `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:64321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sb_publishable_... from supabase:status>
SUPABASE_SERVICE_ROLE_KEY=<sb_secret_... from supabase:status>
NEXT_PUBLIC_APP_URL=http://localhost:3005
GEMINI_API_KEY=<optional; edge function falls back to mock data if unset>
```

See `.env.local.example` for the template.

## Architecture notes

- **Persistence model:** server actions in `app/dashboard/*/actions.ts` are the *only* path that mutates Supabase. UI components call them; never write to Supabase directly from client.
- **RLS is on for every table.** A vendor can only read/write rows linked to their `user_id`. The `handle_new_user` trigger auto-creates a `vendors` row on signup.
- **AI features fail gracefully.** Store generator returns mock data if `GEMINI_API_KEY` is missing. Voice transaction parser returns an error string instead of crashing.
- **Pure logic is unit-tested.** Anything in `lib/persistence/` has Vitest coverage. Supabase-touching code is verified manually via Studio.
- **i18n:** bilingual EN+FR via next-intl. Routes under `app/[locale]/`. Messages in `messages/{en,fr}.json` (namespaced by feature). `useTranslations()` in client components, `getTranslations()` in server components. `Link` from `@/i18n/navigation` preserves locale prefix. Vendor `preferred_locale` persisted to Supabase. Validate coverage with `pnpm i18n:check`.

## Design system

UI follows the **Voice-First Multimodal** pattern (per ui-ux-pro-max skill):
- Atkinson Hyperlegible font (accessibility-first — already in voice flow)
- Indigo primary + emerald CTA
- Touch targets ≥44×44 px
- Lucide icons only (no emojis)
- Confirmation toasts (sonner) on every async write — never silent success
- Disabled button + spinner during async (no double-submit)
- No playful design, no AI purple/pink gradients

## Conventions for AI editors

When making changes:

1. **Run tests + typecheck after edits.** `pnpm test && pnpm typecheck` is fast and catches the common regressions.
2. **Prefer editing existing files** over creating new ones. App Router conventions matter — server actions live next to their routes (`app/<route>/actions.ts`).
3. **Never put secrets in committed files.** `.env.local` is gitignored; the example template uses placeholder values.
4. **Don't reintroduce gitignored paths.** `docs/`, `scripts/`, `.agent/`, and dev artifacts are intentionally local-only. Don't `git add -f` them.
5. **RLS-aware writes.** Every server action must look up the vendor via `auth.uid()` before writing. Trusting client-supplied `vendor_id` is a security bug.
6. **Use the design system.** New buttons need `min-h-[44px]`; new async actions need a sonner toast on success and error.

## Editor-specific files

| Editor | File | Status |
|---|---|---|
| Claude Code | `CLAUDE.md` (this project doesn't have one yet — uses AGENTS.md as the index) | not present |
| Cursor | `.cursor/rules/*.mdc` | not present — add when needed |
| Codex / OpenCode / Cline | `AGENTS.md` (this file) | ✓ |

If you're working in Cursor, the workspace cowork pattern is `startups/Gig Search/.cursor/rules/<name>.mdc` — replicate that here if you build per-skill Cursor rules.

## What's in git, what's not

**Tracked (core runtime):** `app/`, `components/`, `lib/`, `hooks/`, `public/`, `styles/`, `supabase/migrations/`, `supabase/functions/`, root configs (`package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `eslint.config.mjs`, `vitest.config.ts`, `components.json`, `netlify.toml`, `proxy.ts`, `AGENTS.md`).

**Local-only (gitignored):** `docs/` (internal planning, handovers, plans), `scripts/` (dev utilities — db-health checks, admin scripts), `.agent/`, build artifacts, `.env*`, dev `supabase-status.json` dumps.

See `.gitignore` for the full list.

## Where to start

1. `pnpm install && pnpm supabase:start && pnpm dev`
2. Visit `http://localhost:3005` — landing should render
3. Register at `/login` (sign up tab) — `handle_new_user` trigger creates your vendor row automatically
4. Try the Store Generator + Voice Transaction in the dashboard
5. For a deeper picture of current state and next steps, check `docs/HANDOVER.md` and `docs/NEXT_SESSION.md` locally (gitignored; not on GitHub)
