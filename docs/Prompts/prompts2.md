Perfect! Now I have enough context. Let me create a comprehensive, battle-tested prompt series specifically for your Next.js + Supabase + GitHub Actions workflow. I'll generate **15 advanced prompts** that cover the complete full-stack development lifecycle.

---

# 🚀 **THE COMPLETE NEXT.JS + SUPABASE VIBE CODING FRAMEWORK**
## 15 Production-Ready Prompts for Full-Stack Development

Based on your workflow and modern best practices, here's your ultimate prompting playbook optimized for Claude Code, Cursor, and AI-assisted development.

---

## **PHASE 1: FOUNDATION & ARCHITECTURE**

### **PROMPT 1: The Project Architect** 
*Use this FIRST to establish solid foundations*

```
You are a Staff Engineer at Vercel specializing in Next.js 15 App Router + Supabase architecture.

I need to build a [PROJECT TYPE: SaaS/marketplace/social platform/dashboard].

PROJECT CONTEXT:
- Target users: [describe your audience]
- Core features: [list 3-7 key features]
- Monetization: [free/freemium/subscription/one-time]
- Scale expectations: [MVP/10K users/100K+ users]

DELIVER A COMPLETE TECHNICAL SPECIFICATION:

1. **Project Structure** (Next.js 15 App Router best practices):
   ```
   /app
     /(auth)          # Auth routes group
     /(dashboard)     # Protected routes
     /api             # Route handlers
   /components
     /ui              # shadcn/ui components
     /features        # Feature-specific components
   /lib
     /supabase        # Client types (client/server/middleware)
     /actions         # Server actions
     /hooks           # Custom React hooks
   /types
   /utils
   ```

2. **Database Schema** (Supabase-optimized):
   - Tables with RLS policies
   - Relationships and foreign keys
   - Indexes for performance
   - Triggers for real-time features

3. **Authentication Strategy**:
   - Auth method (magic link/OAuth/password)
   - Session management approach
   - Protected route patterns
   - Middleware implementation

4. **API Architecture**:
   - Route handlers vs Server Actions (when to use each)
   - Edge vs Node runtime decisions
   - Caching strategy (Supabase + Next.js)

5. **State Management**:
   - Server state (React Query/SWR vs native)
   - Client state (Zustand/Context)
   - Form state (React Hook Form)

6. **Tech Stack Recommendations**:
   - UI: shadcn/ui vs Headless UI vs custom
   - Styling: Tailwind utilities strategy
   - Validation: Zod schemas
   - Testing: Vitest + Playwright

7. **Performance Budgets**:
   - First Contentful Paint: [target]
   - Time to Interactive: [target]
   - Lighthouse scores: [targets]

8. **File Naming Conventions**:
   - Component naming pattern
   - Server action naming pattern
   - Type definition patterns

Output as a markdown technical spec I can reference throughout development.
```

---

### **PROMPT 2: The Supabase Schema Architect**
*Generate production-ready database schemas*

```
You are a Database Architect specializing in Supabase PostgreSQL with 10+ years experience.

Create a complete database schema for [PROJECT TYPE] with these requirements:

BUSINESS REQUIREMENTS:
- [Feature 1 and data needs]
- [Feature 2 and data needs]
- [Feature 3 and data needs]

GENERATE:

1. **SQL Migration Files** (numbered sequentially):
   ```sql
   -- 001_create_users_table.sql
   -- Include:
   - Proper data types
   - Constraints (NOT NULL, UNIQUE, CHECK)
   - Foreign keys with ON DELETE behavior
   - Indexes for query optimization
   - Comments explaining purpose
   ```

2. **Row Level Security (RLS) Policies**:
   ```sql
   -- For each table, create policies for:
   - SELECT (who can read)
   - INSERT (who can create)
   - UPDATE (who can modify)
   - DELETE (who can remove)
   
   -- Use patterns like:
   - auth.uid() = user_id (owner-only)
   - is_public = true (public read)
   - check team membership (multi-tenant)
   ```

3. **Database Functions**:
   - Custom functions for complex queries
   - Triggers for auto-updating timestamps
   - Computed columns

4. **TypeScript Types** (auto-generated from schema):
   ```typescript
   // Using supabase gen types
   export type Database = {
     public: {
       Tables: {
         // Generated types
       }
     }
   }
   ```

5. **Supabase Client Setup**:
   ```typescript
   // /lib/supabase/client.ts (browser)
   // /lib/supabase/server.ts (server components)
   // /lib/supabase/middleware.ts (edge middleware)
   ```

6. **Real-time Subscriptions Setup**:
   - Which tables need real-time?
   - Channel setup code
   - Presence features if needed

7. **Storage Buckets**:
   - Bucket names and purposes
   - RLS policies for files
   - File upload patterns

IMPORTANT:
- Use uuid primary keys
- Add created_at/updated_at to all tables
- Include soft delete patterns where needed
- Optimize for N+1 query prevention

Output as executable SQL + TypeScript code.
```

---

### **PROMPT 3: The Environment Configuration Specialist**
*Set up all config files correctly from the start*

```
You are a DevOps engineer specializing in Next.js deployment and Supabase integration.

Generate ALL configuration files for a production-ready Next.js + Supabase project:

1. **.env.local** (development):
   ```
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   
   # OAuth (if using)
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   
   # Other services
   # [Add based on project needs]
   ```

2. **.env.example** (for GitHub):
   ```
   # Template with placeholders
   ```

3. **next.config.js** (optimized):
   ```javascript
   // Include:
   - Image domains (Supabase storage)
   - Experimental features
   - Bundle analyzer setup
   - Security headers
   ```

4. **tsconfig.json** (strict mode):
   ```json
   // Path aliases (@/components, @/lib)
   // Strict TypeScript settings
   ```

5. **tailwind.config.ts**:
   ```typescript
   // Custom theme
   // shadcn/ui integration
   // CSS variables
   ```

6. **middleware.ts** (auth protection):
   ```typescript
   // Session refresh logic
   // Protected route patterns
   // Redirect logic
   ```

7. **.eslintrc.json** + **prettier.config.js**:
   ```
   // Consistent code style
   // Auto-fix on save compatible
   ```

8. **supabase/config.toml**:
   ```toml
   # Local development config
   # DB port, API settings
   ```

9. **package.json scripts**:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "lint": "next lint --fix",
       "type-check": "tsc --noEmit",
       "supabase:gen-types": "supabase gen types typescript --local > types/database.types.ts"
     }
   }
   ```

Make sure all configs work together and are production-ready.
```

---

## **PHASE 2: AUTHENTICATION & AUTHORIZATION**

### **PROMPT 4: The Auth Flow Architect**
*Build bulletproof authentication*

```
You are a Security Engineer at Auth0. Implement complete authentication for Next.js 15 App Router + Supabase.

AUTH REQUIREMENTS:
- Login methods: [email/password, magic link, OAuth providers]
- Protected routes: [list routes that need auth]
- Role-based access: [roles needed, if any]

IMPLEMENT:

1. **Supabase Auth Clients** (SSR-safe):
   ```typescript
   // /lib/supabase/client.ts
   // Browser client with cookie handling
   
   // /lib/supabase/server.ts
   // Server component client
   
   // /lib/supabase/middleware.ts
   // Edge middleware client
   ```

2. **Auth Middleware** (/middleware.ts):
   ```typescript
   // Session refresh on every request
   // Protected route patterns
   // Redirect logic (protected → login, auth → dashboard)
   // Public routes whitelist
   ```

3. **Login Page** (/app/(auth)/login/page.tsx):
   ```typescript
   // Email/password form
   // OAuth buttons (Google, GitHub, etc.)
   // Magic link option
   // Error handling
   // Loading states
   // Redirect after login
   ```

4. **Signup Page** (/app/(auth)/signup/page.tsx):
   ```typescript
   // Registration form
   // Email verification trigger
   // Password strength indicator
   // Terms acceptance
   ```

5. **Server Actions** (/lib/actions/auth.ts):
   ```typescript
   'use server'
   
   export async function signIn(formData: FormData)
   export async function signUp(formData: FormData)
   export async function signOut()
   export async function resetPassword(email: string)
   ```

6. **User Context Provider**:
   ```typescript
   // Client-side user state
   // useUser() hook
   // Profile data fetching
   ```

7. **Protected Layout** (/app/(dashboard)/layout.tsx):
   ```typescript
   // Check auth on server
   // Redirect if not logged in
   // Fetch user profile
   // Pass to client components
   ```

8. **Profile Management Page**:
   ```typescript
   // Update email
   // Change password
   // Update avatar (Supabase Storage)
   // Delete account
   ```

9. **RLS Helper Functions**:
   ```typescript
   // getUserId() for RLS policies
   // checkPermission() for RBAC
   ```

SECURITY CHECKLIST:
- ✅ CSRF protection
- ✅ Rate limiting (Supabase rate limits)
- ✅ Password hashing (automatic with Supabase)
- ✅ Secure cookie settings
- ✅ Input validation (Zod schemas)

Use TypeScript strictly. Include error handling and loading states for every action.
```

---

### **PROMPT 5: The Authorization & RLS Policy Designer**
*Implement granular access control*

```
You are a Database Security Expert. Design comprehensive Row Level Security policies for Supabase.

PROJECT CONTEXT:
- User types: [admin, user, guest, etc.]
- Access patterns: [who can do what]
- Multi-tenancy: [yes/no, and structure]

FOR EACH TABLE, GENERATE:

1. **Policy Patterns**:
   ```sql
   -- Public read
   CREATE POLICY "Public profiles are viewable by everyone"
   ON profiles FOR SELECT
   USING (true);
   
   -- User can read own data
   CREATE POLICY "Users can read own data"
   ON user_data FOR SELECT
   USING (auth.uid() = user_id);
   
   -- User can update own data
   CREATE POLICY "Users can update own data"
   ON user_data FOR UPDATE
   USING (auth.uid() = user_id)
   WITH CHECK (auth.uid() = user_id);
   
   -- Team-based access
   CREATE POLICY "Team members can view team data"
   ON team_resources FOR SELECT
   USING (
     EXISTS (
       SELECT 1 FROM team_members
       WHERE team_members.team_id = team_resources.team_id
       AND team_members.user_id = auth.uid()
     )
   );
   
   -- Admin-only
   CREATE POLICY "Admins can do everything"
   ON sensitive_table FOR ALL
   USING (
     EXISTS (
       SELECT 1 FROM profiles
       WHERE profiles.id = auth.uid()
       AND profiles.role = 'admin'
     )
   );
   ```

2. **Helper Functions**:
   ```sql
   -- Check if user is team admin
   CREATE OR REPLACE FUNCTION is_team_admin(team_id uuid)
   RETURNS BOOLEAN AS $$
   BEGIN
     RETURN EXISTS (
       SELECT 1 FROM team_members
       WHERE team_members.team_id = $1
       AND team_members.user_id = auth.uid()
       AND team_members.role = 'admin'
     );
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;
   ```

3. **Testing Queries**:
   ```sql
   -- Test as different users
   -- Verify data isolation
   ```

4. **Client-Side Permission Checks**:
   ```typescript
   // /lib/permissions.ts
   export async function canEditResource(resourceId: string) {
     const { data, error } = await supabase
       .from('resources')
       .select('id')
       .eq('id', resourceId)
       .single();
     
     return !!data && !error;
   }
   ```

IMPORTANT:
- Enable RLS on ALL tables
- Test policies with different user contexts
- Document policy logic with comments
- Consider performance (avoid N+1 in policies)
```

---

## **PHASE 3: CORE FEATURE DEVELOPMENT**

### **PROMPT 6: The Feature Builder** 
*Build complete features end-to-end*

```
You are a Senior Full-Stack Developer at Linear. Build a complete feature for a Next.js + Supabase app.

FEATURE: [e.g., "Task Management System"]

REQUIREMENTS:
- Users can: [list all user actions]
- Data structure: [describe the entities]
- Real-time: [yes/no, what needs to be real-time]
- Permissions: [who can do what]

BUILD THE COMPLETE FEATURE:

1. **Database Tables** (migration SQL):
   ```sql
   -- All tables needed
   -- Relationships
   -- RLS policies
   ```

2. **TypeScript Types** (/types/[feature].ts):
   ```typescript
   // Database types
   // API response types
   // Form validation schemas (Zod)
   ```

3. **Server Actions** (/lib/actions/[feature].ts):
   ```typescript
   'use server'
   
   // All CRUD operations
   // Proper error handling
   // Revalidation after mutations
   
   export async function createTask(data: CreateTaskInput) {
     // Validation
     // Database operation
     // Error handling
     // Return type-safe response
   }
   ```

4. **API Routes** (if needed) (/app/api/[feature]/route.ts):
   ```typescript
   // For webhooks or third-party integrations
   ```

5. **Server Components** (/app/(dashboard)/[feature]/page.tsx):
   ```typescript
   // Fetch data on server
   // Pass to client components
   // Streaming with Suspense
   ```

6. **Client Components** (/components/features/[feature]/):
   ```typescript
   // Form component (with React Hook Form)
   // List component
   // Detail component
   // Interactive elements
   ```

7. **Custom Hooks** (/lib/hooks/use-[feature].ts):
   ```typescript
   // useTaskList() - fetching and caching
   // useTaskMutations() - create/update/delete
   // useRealtimeTask() - real-time subscriptions
   ```

8. **Real-time Setup** (if needed):
   ```typescript
   // Supabase channel subscription
   // Optimistic updates
   // Conflict resolution
   ```

9. **Loading & Error States**:
   ```typescript
   // /app/(dashboard)/[feature]/loading.tsx
   // /app/(dashboard)/[feature]/error.tsx
   ```

10. **Unit Tests** (/tests/[feature].test.ts):
    ```typescript
    // Server action tests
    // Component tests
    // Integration tests
    ```

PATTERNS TO FOLLOW:
- Server components for data fetching
- Client components for interactivity
- Server actions for mutations
- Optimistic updates for UX
- Error boundaries for resilience

Use shadcn/ui components. Make it production-ready.
```

---

### **PROMPT 7: The Form Master**
*Build bulletproof forms with validation*

```
You are a UX Engineer at Stripe. Create a production-ready form system.

FORM REQUIREMENTS:
- Form type: [contact, settings, multi-step, etc.]
- Fields: [list all fields with types]
- Validation: [describe rules]
- Submit action: [what happens on submit]

IMPLEMENT:

1. **Zod Schema** (/lib/validations/[form].ts):
   ```typescript
   import { z } from 'zod';
   
   export const formSchema = z.object({
     email: z.string().email('Invalid email'),
     // All fields with validation rules
   });
   
   export type FormData = z.infer<typeof formSchema>;
   ```

2. **Server Action** (/lib/actions/[form].ts):
   ```typescript
   'use server'
   
   import { formSchema } from '@/lib/validations/form';
   
   export async function submitForm(formData: FormData) {
     // Validate on server
     const result = formSchema.safeParse(formData);
     if (!result.success) {
       return { error: 'Invalid data' };
     }
     
     // Process data
     // Return success/error
   }
   ```

3. **Form Component** (/components/forms/[name]-form.tsx):
   ```typescript
   'use client';
   
   import { useForm } from 'react-hook-form';
   import { zodResolver } from '@hookform/resolvers/zod';
   import { formSchema } from '@/lib/validations/form';
   
   export function MyForm() {
     const form = useForm({
       resolver: zodResolver(formSchema),
       defaultValues: {},
     });
     
     // Handle submit
     // Show errors
     // Loading states
     // Success feedback
   }
   ```

4. **shadcn/ui Form Components**:
   ```typescript
   // Use Form, FormField, FormItem, FormLabel, FormControl, FormMessage
   // Consistent styling
   // Accessible markup
   ```

5. **Multi-Step Form** (if needed):
   ```typescript
   // Step state management
   // Progress indicator
   // Back/Next navigation
   // Data persistence
   ```

6. **File Upload** (if needed):
   ```typescript
   // Supabase Storage integration
   // Image preview
   // File size validation
   // Upload progress
   ```

BEST PRACTICES:
- Client-side validation for UX
- Server-side validation for security
- Clear error messages
- Disable submit while loading
- Show success feedback
- Preserve form data on error
```

---

### **PROMPT 8: The Real-time Features Architect**
*Implement Supabase real-time subscriptions*

```
You are a Real-time Systems Engineer at Discord. Implement real-time features using Supabase.

REAL-TIME REQUIREMENTS:
- What data needs real-time updates: [tables/entities]
- User interactions: [like, comment, join, etc.]
- Scale expectations: [concurrent users]

IMPLEMENT:

1. **Enable Real-time on Supabase**:
   ```sql
   -- Enable real-time for specific tables
   ALTER PUBLICATION supabase_realtime ADD TABLE messages;
   ```

2. **Real-time Hook** (/lib/hooks/use-realtime-[entity].ts):
   ```typescript
   'use client';
   
   import { useEffect, useState } from 'react';
   import { createClient } from '@/lib/supabase/client';
   
   export function useRealtimeMessages(channelId: string) {
     const [messages, setMessages] = useState([]);
     const supabase = createClient();
     
     useEffect(() => {
       // Initial fetch
       const fetchMessages = async () => {
         const { data } = await supabase
           .from('messages')
           .select('*')
           .eq('channel_id', channelId)
           .order('created_at', { ascending: true });
         
         setMessages(data || []);
       };
       
       fetchMessages();
       
       // Subscribe to changes
       const channel = supabase
         .channel(`messages:${channelId}`)
         .on(
           'postgres_changes',
           {
             event: '*', // INSERT, UPDATE, DELETE
             schema: 'public',
             table: 'messages',
             filter: `channel_id=eq.${channelId}`,
           },
           (payload) => {
             if (payload.eventType === 'INSERT') {
               setMessages((prev) => [...prev, payload.new]);
             }
             // Handle UPDATE, DELETE
           }
         )
         .subscribe();
       
       return () => {
         supabase.removeChannel(channel);
       };
     }, [channelId]);
     
     return messages;
   }
   ```

3. **Presence Features** (if needed):
   ```typescript
   // Track online users
   // Show "typing..." indicators
   // Show cursor positions
   ```

4. **Broadcast Features** (if needed):
   ```typescript
   // Send ephemeral messages
   // Cursor movements
   // Temporary UI states
   ```

5. **Optimistic Updates**:
   ```typescript
   // Update UI immediately
   // Rollback on error
   // Sync with server state
   ```

6. **Component Integration**:
   ```typescript
   'use client';
   
   export function MessageList({ channelId }: Props) {
     const messages = useRealtimeMessages(channelId);
     
     return (
       <div>
         {messages.map((msg) => (
           <Message key={msg.id} data={msg} />
         ))}
       </div>
     );
   }
   ```

PERFORMANCE CONSIDERATIONS:
- Unsubscribe on unmount
- Debounce frequent updates
- Pagination for large lists
- Connection retry logic
```

---

## **PHASE 4: UI/UX & DESIGN SYSTEM**

### **PROMPT 9: The Design System Generator**
*Create a consistent, production-ready design system*

```
You are a Design Systems Engineer at Vercel. Create a complete design system for a Next.js + Supabase project.

BRAND ATTRIBUTES:
- Style: [modern, minimal, bold, playful]
- Target audience: [B2B, B2C, developer tools]
- Color mood: [trust, energy, calm, professional]

GENERATE:

1. **Color System** (globals.css + tailwind.config.ts):
   ```css
   @layer base {
     :root {
       --background: 0 0% 100%;
       --foreground: 222.2 84% 4.9%;
       --primary: 221.2 83.2% 53.3%;
       --primary-foreground: 210 40% 98%;
       /* Full color system */
       
       /* Semantic colors */
       --destructive: 0 84.2% 60.2%;
       --success: 142.1 76.2% 36.3%;
       --warning: 38 92% 50%;
     }
     
     .dark {
       /* Dark mode variants */
     }
   }
   ```

2. **Typography Scale** (tailwind.config.ts):
   ```typescript
   theme: {
     extend: {
       fontSize: {
         'xs': ['0.75rem', { lineHeight: '1rem' }],
         'sm': ['0.875rem', { lineHeight: '1.25rem' }],
         'base': ['1rem', { lineHeight: '1.5rem' }],
         'lg': ['1.125rem', { lineHeight: '1.75rem' }],
         'xl': ['1.25rem', { lineHeight: '1.75rem' }],
         '2xl': ['1.5rem', { lineHeight: '2rem' }],
         '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
         '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
       },
       fontFamily: {
         sans: ['Inter', 'system-ui', 'sans-serif'],
         mono: ['Fira Code', 'monospace'],
       },
     },
   }
   ```

3. **Spacing System** (8px base grid):
   ```typescript
   spacing: {
     0: '0',
     1: '0.25rem', // 4px
     2: '0.5rem',  // 8px
     3: '0.75rem', // 12px
     4: '1rem',    // 16px
     6: '1.5rem',  // 24px
     8: '2rem',    // 32px
     // Continue pattern
   }
   ```

4. **Component Library Setup**:
   ```bash
   # Install shadcn/ui components
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add card
   npx shadcn-ui@latest add dialog
   npx shadcn-ui@latest add form
   # Add all needed components
   ```

5. **Custom Components** (/components/ui/):
   ```typescript
   // Page wrappers
   // Loading skeletons
   // Empty states
   // Error displays
   ```

6. **Layout Components** (/components/layouts/):
   ```typescript
   // DashboardLayout
   // AuthLayout
   // MarketingLayout
   ```

7. **Animation System** (Framer Motion):
   ```typescript
   // /lib/animations.ts
   export const fadeIn = {
     initial: { opacity: 0 },
     animate: { opacity: 1 },
     exit: { opacity: 0 },
   };
   
   export const slideUp = {
     initial: { y: 20, opacity: 0 },
     animate: { y: 0, opacity: 1 },
   };
   ```

8. **Responsive Breakpoints**:
   ```typescript
   screens: {
     sm: '640px',
     md: '768px',
     lg: '1024px',
     xl: '1280px',
     '2xl': '1536px',
   }
   ```

9. **Dark Mode Setup**:
   ```typescript
   // /components/theme-provider.tsx
   // Toggle component
   // System preference detection
   ```

10. **Design Tokens JSON**:
    ```json
    {
      "colors": {},
      "typography": {},
      "spacing": {},
      "shadows": {},
      "borderRadius": {}
    }
    ```

ACCESSIBILITY:
- WCAG AA contrast ratios
- Focus states on all interactive elements
- Keyboard navigation support
- Screen reader labels
```

---

### **PROMPT 10: The UI Component Specialist**
*Build reusable, accessible components*

```
You are a UI Engineer at Stripe. Create a production-ready UI component.

COMPONENT: [e.g., "Data Table with sorting, filtering, pagination"]

REQUIREMENTS:
- Functionality: [list all features]
- Data source: [static, API, real-time]
- Interactions: [click, hover, drag, etc.]
- Responsive: [mobile behavior]

BUILD:

1. **Component File** (/components/[name].tsx):
   ```typescript
   'use client'; // if needed
   
   interface Props {
     // Fully typed props
   }
   
   export function Component({ ...props }: Props) {
     // State management
     // Event handlers
     // Memoization if needed
     
     return (
       // JSX with proper accessibility
       <div role="..." aria-label="...">
         {/* Component markup */}
       </div>
     );
   }
   ```

2. **Variants** (using CVA - class-variance-authority):
   ```typescript
   import { cva } from 'class-variance-authority';
   
   const buttonVariants = cva(
     'base-classes',
     {
       variants: {
         variant: {
           default: 'bg-primary',
           destructive: 'bg-destructive',
           outline: 'border',
         },
         size: {
           default: 'h-10 px-4',
           sm: 'h-9 px-3',
           lg: 'h-11 px-8',
         },
       },
     }
   );
   ```

3. **Storybook Story** (if using Storybook):
   ```typescript
   // Component.stories.tsx
   // All variants and states
   ```

4. **Unit Tests**:
   ```typescript
   // Render tests
   // Interaction tests
   // Accessibility tests
   ```

PATTERNS:
- Compound components for complex UI
- Render props for flexibility
- Controlled vs uncontrolled
- Forward refs for DOM access
- Proper TypeScript generics

Make it reusable, accessible, and performant.
```

---

## **PHASE 5: DEPLOYMENT & CI/CD**

### **PROMPT 11: The GitHub Actions CI/CD Pipeline**
*Automate testing and deployment*

```
You are a DevOps Engineer at Vercel. Create a complete CI/CD pipeline for Next.js + Supabase.

DEPLOYMENT STRATEGY:
- Hosting: [Vercel, AWS, Railway, etc.]
- Environments: [dev, staging, production]
- Supabase projects: [separate per environment or shared]

CREATE:

1. **GitHub Actions Workflow** (.github/workflows/ci.yml):
   ```yaml
   name: CI/CD Pipeline
   
   on:
     push:
       branches: [main, develop]
     pull_request:
       branches: [main, develop]
   
   jobs:
     lint:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '20'
             cache: 'npm'
         - run: npm ci
         - run: npm run lint
         
     type-check:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm ci
         - run: npm run type-check
         
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm ci
         - run: npm run test
         
     build:
       runs-on: ubuntu-latest
       needs: [lint, type-check, test]
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm ci
         - run: npm run build
         
     deploy-staging:
       if: github.ref == 'refs/heads/develop'
       needs: build
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Deploy to Vercel Staging
           uses: amondnet/vercel-action@v20
           with:
             vercel-token: ${{ secrets.VERCEL_TOKEN }}
             vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
             vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
             vercel-args: '--prod --scope=${{ secrets.VERCEL_TEAM_ID }}'
             
     deploy-production:
       if: github.ref == 'refs/heads/main'
       needs: build
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Deploy to Vercel Production
           uses: amondnet/vercel-action@v20
           with:
             vercel-token: ${{ secrets.VERCEL_TOKEN }}
             vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
             vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
             vercel-args: '--prod'
   ```

2. **Supabase Migrations Workflow** (.github/workflows/supabase.yml):
   ```yaml
   name: Supabase Migrations
   
   on:
     push:
       branches: [main]
       paths:
         - 'supabase/migrations/**'
   
   jobs:
     migrate:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: supabase/setup-cli@v1
         - name: Run migrations on staging
           run: |
             supabase db push --db-url ${{ secrets.STAGING_DB_URL }}
         - name: Run migrations on production
           if: github.ref == 'refs/heads/main'
           run: |
             supabase db push --db-url ${{ secrets.PROD_DB_URL }}
   ```

3. **Environment Secrets Setup**:
   ```
   # GitHub Secrets needed:
   - VERCEL_TOKEN
   - VERCEL_ORG_ID
   - VERCEL_PROJECT_ID
   - STAGING_DB_URL
   - PROD_DB_URL
   - NEXT_PUBLIC_SUPABASE_URL (per env)
   - NEXT_PUBLIC_SUPABASE_ANON_KEY (per env)
   ```

4. **Preview Deployments**:
   ```yaml
   # Automatic preview for PRs
   - name: Deploy Preview
     if: github.event_name == 'pull_request'
     # Deployment config
   ```

5. **Deployment Notifications**:
   ```yaml
   # Slack/Discord webhooks
   - name: Notify on success
     if: success()
   - name: Notify on failure
     if: failure()
   ```

BEST PRACTICES:
- Cache dependencies
- Run tests in parallel
- Fail fast on errors
- Separate staging and production
- Use environment-specific Supabase projects
```

---

### **PROMPT 12: The Production Optimization Specialist**
*Make your app lightning fast*

```
You are a Performance Engineer at Google. Optimize a Next.js + Supabase app for production.

ANALYZE AND OPTIMIZE:

1. **Next.js Build Optimizations** (next.config.js):
   ```javascript
   module.exports = {
     // Enable React strict mode
     reactStrictMode: true,
     
     // Minimize output
     swcMinify: true,
     
     // Image optimization
     images: {
       domains: ['your-supabase-project.supabase.co'],
       formats: ['image/avif', 'image/webp'],
     },
     
     // Experimental features
     experimental: {
       optimizeCss: true,
       scrollRestoration: true,
     },
     
     // Headers for security and performance
     async headers() {
       return [
         {
           source: '/:path*',
           headers: [
             {
               key: 'X-DNS-Prefetch-Control',
               value: 'on'
             },
             {
               key: 'Strict-Transport-Security',
               value: 'max-age=63072000; includeSubDomains; preload'
             },
             {
               key: 'X-Frame-Options',
               value: 'SAMEORIGIN'
             },
             {
               key: 'X-Content-Type-Options',
               value: 'nosniff'
             },
             {
               key: 'Referrer-Policy',
               value: 'origin-when-cross-origin'
             },
           ],
         },
       ];
     },
   };
   ```

2. **Database Query Optimizations**:
   ```typescript
   // Use select() to fetch only needed columns
   const { data } = await supabase
     .from('posts')
     .select('id, title, author:users(name)') // Join syntax
     .limit(20)
     .order('created_at', { ascending: false });
   
   // Create indexes for frequently queried fields
   // In migration:
   CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
   ```

3. **Caching Strategy**:
   ```typescript
   // Server component with caching
   export const revalidate = 3600; // 1 hour
   
   // Or on-demand revalidation
   import { revalidatePath } from 'next/cache';
   
   export async function createPost() {
     'use server';
     // Create post
     revalidatePath('/posts');
   }
   
   // Supabase query caching
   const supabase = createClient();
   const { data } = await supabase
     .from('posts')
     .select('*')
     .cache(60); // Cache for 60 seconds
   ```

4. **Image Optimization**:
   ```typescript
   import Image from 'next/image';
   
   // Always use Next.js Image component
   <Image
     src={avatarUrl}
     alt="Avatar"
     width={200}
     height={200}
     priority={isAboveFold}
     placeholder="blur"
     blurDataURL={placeholder}
   />
   ```

5. **Code Splitting**:
   ```typescript
   // Dynamic imports for heavy components
   import dynamic from 'next/dynamic';
   
   const HeavyChart = dynamic(
     () => import('@/components/heavy-chart'),
     {
       loading: () => <Skeleton />,
       ssr: false, // Client-only if needed
     }
   );
   ```

6. **Bundle Analysis**:
   ```bash
   npm install @next/bundle-analyzer
   
   # In next.config.js
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   });
   
   module.exports = withBundleAnalyzer({
     // ... config
   });
   
   # Run
   ANALYZE=true npm run build
   ```

7. **Loading Strategies**:
   ```typescript
   // /app/dashboard/loading.tsx
   export default function Loading() {
     return <DashboardSkeleton />;
   }
   
   // Suspense boundaries
   <Suspense fallback={<Skeleton />}>
     <AsyncComponent />
   </Suspense>
   ```

8. **Edge Functions** (where applicable):
   ```typescript
   // app/api/fast/route.ts
   export const runtime = 'edge';
   
   export async function GET() {
     // Fast, global edge response
   }
   ```

PERFORMANCE METRICS TO TRACK:
- Lighthouse scores (aim for 90+)
- Core Web Vitals (LCP, FID, CLS)
- Time to First Byte (TTFB)
- Bundle size per route

Run before and after measurements.
```

---

## **PHASE 6: TESTING & QUALITY**

### **PROMPT 13: The Test Suite Architect**
*Build comprehensive test coverage*

```
You are a QA Engineer at Stripe. Create a complete testing strategy for Next.js + Supabase.

TESTING REQUIREMENTS:
- Features to test: [list critical features]
- Coverage goal: [e.g., 80%+]
- Test types needed: [unit, integration, e2e]

CREATE:

1. **Test Setup** (vitest.config.ts):
   ```typescript
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react';
   import path from 'path';
   
   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       setupFiles: ['./tests/setup.ts'],
       coverage: {
         reporter: ['text', 'json', 'html'],
         exclude: [
           'node_modules/',
           'tests/',
         ],
       },
     },
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './'),
       },
     },
   });
   ```

2. **Test Utilities** (/tests/utils.tsx):
   ```typescript
   import { render } from '@testing-library/react';
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
   
   export function renderWithProviders(ui: React.ReactElement) {
     const queryClient = new QueryClient({
       defaultOptions: {
         queries: { retry: false },
       },
     });
     
     return render(
       <QueryClientProvider client={queryClient}>
         {ui}
       </QueryClientProvider>
     );
   }
   ```

3. **Mock Supabase Client** (/tests/mocks/supabase.ts):
   ```typescript
   export const mockSupabase = {
     from: vi.fn(() => ({
       select: vi.fn().mockReturnThis(),
       insert: vi.fn().mockReturnThis(),
       update: vi.fn().mockReturnThis(),
       delete: vi.fn().mockReturnThis(),
       eq: vi.fn().mockReturnThis(),
       single: vi.fn().mockResolvedValue({ data: {}, error: null }),
     })),
     auth: {
       getUser: vi.fn(),
       signIn: vi.fn(),
       signOut: vi.fn(),
     },
   };
   ```

4. **Unit Tests** (server actions):
   ```typescript
   // /lib/actions/__tests__/auth.test.ts
   import { describe, it, expect, vi } from 'vitest';
   import { signIn } from '../auth';
   
   describe('Auth Actions', () => {
     it('should sign in user with valid credentials', async () => {
       // Arrange
       const email = 'test@example.com';
       const password = 'password123';
       
       // Act
       const result = await signIn({ email, password });
       
       // Assert
       expect(result.success).toBe(true);
     });
     
     it('should return error for invalid credentials', async () => {
       // Test error case
     });
   });
   ```

5. **Component Tests**:
   ```typescript
   // /components/__tests__/LoginForm.test.tsx
   import { describe, it, expect, vi } from 'vitest';
   import { render, screen, fireEvent, waitFor } from '@testing-library/react';
   import { LoginForm } from '../LoginForm';
   
   describe('LoginForm', () => {
     it('should render form fields', () => {
       render(<LoginForm />);
       expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
       expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
     });
     
     it('should show validation errors', async () => {
       render(<LoginForm />);
       const submitButton = screen.getByRole('button', { name: /sign in/i });
       fireEvent.click(submitButton);
       
       await waitFor(() => {
         expect(screen.getByText(/email is required/i)).toBeInTheDocument();
       });
     });
     
     it('should call onSubmit with form data', async () => {
       const onSubmit = vi.fn();
       render(<LoginForm onSubmit={onSubmit} />);
       
       // Fill form and submit
       // Assert onSubmit was called
     });
   });
   ```

6. **Integration Tests**:
   ```typescript
   // /tests/integration/auth-flow.test.ts
   describe('Authentication Flow', () => {
     it('should complete full sign up and login', async () => {
       // Test entire user journey
     });
   });
   ```

7. **E2E Tests** (Playwright):
   ```typescript
   // /e2e/auth.spec.ts
   import { test, expect } from '@playwright/test';
   
   test('user can sign up and log in', async ({ page }) => {
     await page.goto('/signup');
     
     await page.fill('input[name="email"]', 'test@example.com');
     await page.fill('input[name="password"]', 'Password123!');
     await page.click('button[type="submit"]');
     
     await expect(page).toHaveURL('/dashboard');
     await expect(page.locator('h1')).toContainText('Dashboard');
   });
   ```

8. **CI Integration**:
   ```json
   // package.json scripts
   {
     "scripts": {
       "test": "vitest",
       "test:unit": "vitest run",
       "test:e2e": "playwright test",
       "test:coverage": "vitest run --coverage"
     }
   }
   ```

RUN TESTS IN CI BEFORE DEPLOYMENT.
```

---

## **PHASE 7: ADVANCED FEATURES**

### **PROMPT 14: The Integration Specialist**
*Integrate third-party services*

```
You are an Integration Engineer at Zapier. Integrate [SERVICE] with Next.js + Supabase.

SERVICE TO INTEGRATE: [Stripe, SendGrid, AWS S3, etc.]

REQUIREMENTS:
- Use case: [payments, emails, file storage, etc.]
- Trigger points: [when to call the service]
- Error handling: [what to do on failure]

IMPLEMENT:

1. **Environment Variables**:
   ```
   # .env.local
   [SERVICE]_API_KEY=
   [SERVICE]_SECRET_KEY=
   ```

2. **SDK Setup** (/lib/[service].ts):
   ```typescript
   import ServiceSDK from 'service-sdk';
   
   export const serviceClient = new ServiceSDK({
     apiKey: process.env.SERVICE_API_KEY!,
     // Config options
   });
   ```

3. **Server Actions** (/lib/actions/[service].ts):
   ```typescript
   'use server';
   
   export async function performServiceAction(data: Input) {
     try {
       const result = await serviceClient.doSomething(data);
       
       // Update Supabase if needed
       await supabase.from('records').update({ ... });
       
       return { success: true, data: result };
     } catch (error) {
       console.error('Service error:', error);
       return { success: false, error: 'Failed to process' };
     }
   }
   ```

4. **Webhooks** (/app/api/webhooks/[service]/route.ts):
   ```typescript
   import { headers } from 'next/headers';
   
   export async function POST(req: Request) {
     const body = await req.text();
     const signature = headers().get('service-signature');
     
     // Verify webhook signature
     const event = verifyWebhook(body, signature);
     
     // Handle different event types
     switch (event.type) {
       case 'payment.succeeded':
         // Update database
         break;
       default:
         console.log(`Unhandled event: ${event.type}`);
     }
     
     return new Response(JSON.stringify({ received: true }), {
       status: 200,
     });
   }
   ```

5. **Error Handling & Retries**:
   ```typescript
   async function withRetry(fn: () => Promise<any>, retries = 3) {
     for (let i = 0; i < retries; i++) {
       try {
         return await fn();
       } catch (error) {
         if (i === retries - 1) throw error;
         await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
       }
     }
   }
   ```

6. **Testing Webhooks Locally**:
   ```bash
   # Use ngrok or localtunnel
   npx localtunnel --port 3000 --subdomain myapp
   ```

SPECIFIC EXAMPLES:
- **Stripe**: Payment processing, subscription management
- **SendGrid**: Transactional emails
- **AWS S3**: Large file storage (beyond Supabase limits)
- **Twilio**: SMS/WhatsApp messaging
- **OpenAI**: AI features

Document the integration setup process.
```

---

### **PROMPT 15: The Production Monitoring & Debugging Setup**
*Set up observability for production*

```
You are a Site Reliability Engineer at Datadog. Set up complete monitoring for a Next.js + Supabase production app.

MONITORING REQUIREMENTS:
- Errors to track: [types of errors]
- Metrics to monitor: [performance, usage]
- Alerts needed: [critical issues]

IMPLEMENT:

1. **Error Tracking** (Sentry):
   ```typescript
   // sentry.client.config.ts
   import * as Sentry from "@sentry/nextjs";
   
   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     tracesSampleRate: 1.0,
     replaysOnErrorSampleRate: 1.0,
     replaysSessionSampleRate: 0.1,
     integrations: [
       new Sentry.BrowserTracing(),
       new Sentry.Replay(),
     ],
   });
   
   // sentry.server.config.ts
   // Server-side config
   ```

2. **Analytics** (Vercel Analytics + Google Analytics):
   ```typescript
   // app/layout.tsx
   import { Analytics } from '@vercel/analytics/react';
   import { SpeedInsights } from '@vercel/speed-insights/next';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
           <SpeedInsights />
         </body>
       </html>
     );
   }
   ```

3. **Logging Setup**:
   ```typescript
   // /lib/logger.ts
   import pino from 'pino';
   
   export const logger = pino({
     level: process.env.LOG_LEVEL || 'info',
     transport: {
       target: 'pino-pretty',
       options: {
         colorize: true,
       },
     },
   });
   
   // Usage
   logger.info({ userId: '123' }, 'User logged in');
   logger.error({ err: error }, 'Failed to process payment');
   ```

4. **Performance Monitoring**:
   ```typescript
   // app/layout.tsx
   import { PerformanceObserver } from 'perf_hooks';
   
   // Track Web Vitals
   export function reportWebVitals(metric) {
     console.log(metric);
     
     // Send to analytics
     if (metric.label === 'web-vital') {
       // Track LCP, FID, CLS
     }
   }
   ```

5. **Uptime Monitoring**:
   ```yaml
   # Set up external monitors (UptimeRobot, Better Stack)
   # Monitor these endpoints:
   - /api/health
   - /api/db-health (Supabase connection)
   ```

6. **Health Check Endpoints**:
   ```typescript
   // app/api/health/route.ts
   export async function GET() {
     try {
       // Check database
       const { error } = await supabase.from('users').select('count').limit(1);
       
       if (error) throw error;
       
       return Response.json({ status: 'ok', timestamp: new Date() });
     } catch (error) {
       return Response.json(
         { status: 'error', error: error.message },
         { status: 503 }
       );
     }
   }
   ```

7. **User Feedback Widget**:
   ```typescript
   // In-app feedback form
   // Sentry user feedback
   Sentry.showReportDialog({ eventId });
   ```

8. **Dashboard Setup**:
   ```
   Create dashboards for:
   - Error rates
   - Response times
   - User activity
   - API usage
   - Database performance
   ```

ALERTING:
- Set up Slack/Discord webhooks for critical errors
- Email alerts for downtime
- Weekly summary reports

Don't deploy without monitoring!
```

---

## **BONUS: ADVANCED WORKFLOWS**

### **🎯 PROMPT 16: The Code Review Assistant**
```
You are a Staff Engineer doing a code review. Review this [component/function/feature] against these criteria:

1. **Next.js Best Practices**:
   - Server vs client components used correctly?
   - Proper data fetching patterns?
   - Caching strategy appropriate?

2. **Supabase Best Practices**:
   - RLS policies in place?
   - Efficient queries (no N+1)?
   - Proper error handling?

3. **Security**:
   - Input validation?
   - XSS vulnerabilities?
   - Exposed secrets?

4. **Performance**:
   - Unnecessary re-renders?
   - Large bundle size?
   - Slow database queries?

5. **Code Quality**:
   - TypeScript usage correct?
   - Consistent naming?
   - Proper error boundaries?

Provide specific suggestions with code examples.
```

---

### **🎯 PROMPT 17: The Debugging Detective**
```
I'm getting this error: [paste error message and stack trace]

Context:
- What I was trying to do: [describe]
- What happened: [describe]
- Environment: [dev/staging/production]
- Recent changes: [describe]

Debug this systematically:

1. **Analyze the error**:
   - What type of error is it?
   - What's the root cause?

2. **Check common issues**:
   - Is it a client/server mismatch?
   - Is it an RLS policy issue?
   - Is it a race condition?

3. **Provide solution**:
   - Step-by-step fix
   - Code to add/change
   - How to prevent in future

4. **Testing strategy**:
   - How to verify the fix
   - What tests to add
```

---

## **📚 HOW TO USE THIS FRAMEWORK**

### **For a New Project:**
1. **Start with Prompts 1-3**: Architecture, database, config
2. **Then Prompts 4-5**: Auth setup
3. **Then Prompt 6**: Build features one by one
4. **Then Prompts 7-10**: Forms, real-time, UI components
5. **Finally Prompts 11-15**: Deployment, optimization, testing

### **For Existing Projects:**
- Use individual prompts to add features
- Use Prompt 16 for code reviews
- Use Prompt 17 for debugging

### **Pro Tips:**
1. **Always provide context**: Tell the AI about your project type, scale, audience
2. **Be specific**: "Build authentication" vs "Build email/password auth with magic link fallback and OAuth for Google/GitHub"
3. **Ask for explanations**: Add "Explain why you made these choices" to prompts
4. **Iterate**: Start with the prompt, then refine based on output
5. **Combine prompts**: "Use Prompt 6 to build a feature, then Prompt 13 to test it"

---

## **🔗 ESSENTIAL RESOURCES**

Here are the best resources I found for you:

1. **Next.js + Supabase Structure**: [Medium - Supabase + Next.js Guide](https://medium.com/@iamqitmeeer/supabase-next-js-guide-the-real-way-01a7f2bd140c)
2. **Prompting Guide**: [LinkedIn - Ultimate AI Prompting Guide](https://www.linkedin.com/pulse/ultimate-guide-ai-prompting-full-stack-development-2024-2025-patil-9n4zf)
3. **Vibe Coding Philosophy**: [DZone - Full Stack App with Vibe Coding](https://dzone.com/articles/full-stack-app-with-vibe-coding-prompts)

---

## **🎓 CUSTOMIZATION TEMPLATE**

Save this template for your specific projects:

```markdown
# MY PROJECT CONTEXT (paste at start of any prompt)

**Project Type**: [SaaS/marketplace/content platform]
**Stack**: Next.js 15 App Router + Supabase + [other tools]
**Scale**: [Expected users, data volume]
**Key Features**: [List 3-7 core features]
**Team Size**: [Solo/small team/large team]
**Timeline**: [MVP in X weeks/months]

**Current Phase**: [Planning/MVP/Growth/Scale]
**Blocking Issues**: [None/List current blockers]
```

---

This framework will dramatically speed up your development. Instead of taking months, you should be able to ship MVPs in weeks. The key is:

1. **Start with architecture** (don't skip Prompts 1-3)
2. **Build features systematically** (one prompt = one feature)
3. **Test as you go** (don't wait until the end)
4. **Deploy early** (set up CI/CD from day 1)

Let me know which prompts you'd like me to expand or customize for your specific project! 🚀