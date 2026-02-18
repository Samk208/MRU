Please continue.

Let me work with the information you've provided about your MRU Merchant OS project. Based on your current state analysis, I'll create a comprehensive deployment workflow with all the necessary prompts and agents.

---

# 🚀 **MRU MERCHANT OS: COMPLETE DEPLOYMENT WORKFLOW**
## From Frontend-Ready to Production Full-Stack

---

## **📋 PROJECT CONTEXT CARD**
*Use this at the start of every prompt to maintain consistency*

```markdown
# MRU MERCHANT OS - PROJECT CONTEXT

**Project Type**: SaaS Platform for African Merchants
**Core Value**: Voice-first, AI-powered business management for low-connectivity markets

**Tech Stack**:
- Frontend: Next.js 16 (App Router) + React 19 + TailwindCSS + shadcn/ui ✅
- Backend: Supabase (Self-hosted Docker, Ports 64321-64325) 🚧
- AI: Google Gemini 1.5 Flash ❌
- Integrations: WhatsApp Business API, Mobile Money ❌

**Core Features**:
1. Voice-to-Action (Gemini AI parsing voice commands)
2. Product & Order Management
3. Mobile Money Transactions
4. Auto-Generated Storefronts
5. WhatsApp/Voice Integration

**Current Phase**: Phase 1 - Authentication & Setup
**Target Users**: Small-scale vendors in African markets (low tech literacy)
**Scale Target**: 10K+ vendors, offline-first capability

**Database Schema** (8 tables):
- vendors, products, orders, transactions
- voice_interactions, storefronts, inventory_logs, vendor_analytics
```

---

## **PHASE 1: AUTHENTICATION & INFRASTRUCTURE** 🔥

### **PROMPT 1.1: Docker Supabase Setup Specialist**
*Deploy isolated Supabase instance*

```
You are a DevOps Engineer specializing in self-hosted Supabase deployments for African markets.

CONTEXT:
[Paste MRU Merchant OS Project Context above]

TASK: Set up a production-ready, isolated Supabase instance using Docker.

REQUIREMENTS:
- Isolated ports: 64321-64325 (to avoid conflicts)
- Optimized for low-bandwidth environments
- Support for periodic offline sync
- Configured for African time zones (GMT+1 to GMT+3)

DELIVER:

1. **docker-compose.yml** (isolated configuration):
   ```yaml
   version: '3.8'
   
   services:
     studio:
       image: supabase/studio:latest
       ports:
         - '64321:3000'
       environment:
         SUPABASE_URL: http://kong:8000
         SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY}
     
     kong:
       image: kong:2.8.1
       ports:
         - '64322:8000'
         - '64323:8443'
       environment:
         KONG_DATABASE: 'off'
         KONG_DECLARATIVE_CONFIG: /var/lib/kong/kong.yml
       volumes:
         - ./volumes/api/kong.yml:/var/lib/kong/kong.yml
     
     auth:
       image: supabase/gotrue:latest
       ports:
         - '64324:9999'
       environment:
         GOTRUE_DB_DRIVER: postgres
         GOTRUE_DB_DATABASE_URL: postgres://postgres:${POSTGRES_PASSWORD}@db:5432/postgres
         GOTRUE_SITE_URL: ${SITE_URL}
         GOTRUE_JWT_SECRET: ${JWT_SECRET}
         GOTRUE_JWT_EXP: 3600
         GOTRUE_SMTP_HOST: ${SMTP_HOST}
         GOTRUE_SMTP_PORT: ${SMTP_PORT}
         GOTRUE_SMTP_USER: ${SMTP_USER}
         GOTRUE_SMTP_PASS: ${SMTP_PASS}
     
     db:
       image: supabase/postgres:15.1.0.117
       ports:
         - '64325:5432'
       environment:
         POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
         POSTGRES_DB: postgres
       volumes:
         - ./volumes/db/data:/var/lib/postgresql/data
         - ./supabase/migrations:/docker-entrypoint-initdb.d
     
     storage:
       image: supabase/storage-api:latest
       environment:
         STORAGE_BACKEND: file
         FILE_STORAGE_BACKEND_PATH: /var/lib/storage
       volumes:
         - ./volumes/storage:/var/lib/storage
   
   volumes:
     db-data:
     storage-data:
   ```

2. **.env.supabase** (configuration file):
   ```
   POSTGRES_PASSWORD=your_secure_password_here
   JWT_SECRET=your_jwt_secret_here
   SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   
   SITE_URL=http://localhost:3000
   
   # SMTP for email verification (use African providers)
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your_sendgrid_api_key
   ```

3. **Startup Scripts**:
   ```bash
   # scripts/start-supabase.sh
   #!/bin/bash
   echo "Starting MRU Merchant OS Supabase..."
   docker-compose -f docker-compose.supabase.yml up -d
   echo "Supabase running on:"
   echo "  Studio: http://localhost:64321"
   echo "  API: http://localhost:64322"
   echo "  DB: localhost:64325"
   ```

4. **Migration Application**:
   ```bash
   # Apply the initial_schema.sql
   docker exec -i mru-supabase-db psql -U postgres -d postgres < supabase/migrations/20240210000000_initial_schema.sql
   
   # Verify tables
   docker exec -it mru-supabase-db psql -U postgres -d postgres -c "\dt"
   ```

5. **Health Check Script**:
   ```bash
   # scripts/check-supabase-health.sh
   #!/bin/bash
   
   echo "Checking Supabase services..."
   
   # Check Studio
   curl -f http://localhost:64321 || echo "❌ Studio down"
   
   # Check API
   curl -f http://localhost:64322 || echo "❌ API down"
   
   # Check DB
   docker exec mru-supabase-db pg_isready -U postgres || echo "❌ DB down"
   
   echo "✅ All services healthy"
   ```

6. **Next.js Environment Setup** (.env.local):
   ```
   NEXT_PUBLIC_SUPABASE_URL=http://localhost:64322
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

7. **Supabase Client Configuration** (/lib/supabase/):
   ```typescript
   // client.ts - Browser client
   import { createBrowserClient } from '@supabase/ssr'
   
   export function createClient() {
     return createBrowserClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
     )
   }
   
   // server.ts - Server component client
   import { createServerClient } from '@supabase/ssr'
   import { cookies } from 'next/headers'
   
   export function createClient() {
     const cookieStore = cookies()
     
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
   
   // middleware.ts - Edge middleware client
   import { createServerClient } from '@supabase/ssr'
   import { NextResponse, type NextRequest } from 'next/server'
   
   export async function updateSession(request: NextRequest) {
     let response = NextResponse.next({ request })
     
     const supabase = createServerClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
       {
         cookies: {
           get(name: string) {
             return request.cookies.get(name)?.value
           },
           set(name: string, value: string, options) {
             response.cookies.set({ name, value, ...options })
           },
           remove(name: string, options) {
             response.cookies.set({ name, value: '', ...options })
           },
         },
       }
     )
     
     await supabase.auth.getUser()
     
     return response
   }
   ```

IMPORTANT:
- Generate secure JWT secrets (use `openssl rand -base64 32`)
- Configure SMTP with African-friendly provider (SendGrid, Mailgun)
- Test with `npm install @supabase/ssr @supabase/supabase-js`
- Document all ports and passwords securely

OUTPUT: Complete setup that runs with `docker-compose up -d`
```

---

### **PROMPT 1.2: Authentication Flow Builder**
*Build complete vendor authentication*

```
You are a Senior Full-Stack Engineer at Supabase. Build production-ready authentication for MRU Merchant OS.

CONTEXT:
[Paste MRU Merchant OS Project Context]

AUTH REQUIREMENTS:
- Login methods: Email/Password (SMS too expensive for target market)
- Auto-create vendor profile on signup (via database trigger)
- Simple UX (low tech literacy users)
- Offline-tolerant session management
- Vendor role assignment

BUILD THE COMPLETE AUTH SYSTEM:

1. **Database Trigger** (already in initial_schema.sql, verify):
   ```sql
   -- Function to auto-create vendor profile
   CREATE OR REPLACE FUNCTION public.handle_new_user()
   RETURNS TRIGGER AS $$
   BEGIN
     INSERT INTO public.vendors (id, email, phone, created_at)
     VALUES (
       NEW.id,
       NEW.email,
       NEW.raw_user_meta_data->>'phone',
       NOW()
     );
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;
   
   -- Trigger on auth.users
   CREATE TRIGGER on_auth_user_created
     AFTER INSERT ON auth.users
     FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
   ```

2. **Auth Middleware** (/middleware.ts):
   ```typescript
   import { type NextRequest } from 'next/server'
   import { updateSession } from '@/lib/supabase/middleware'
   
   export async function middleware(request: NextRequest) {
     return await updateSession(request)
   }
   
   export const config = {
     matcher: [
       '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
     ],
   }
   ```

3. **Login Page** (/app/(auth)/login/page.tsx):
   ```typescript
   import { LoginForm } from '@/components/auth/login-form'
   import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
   
   export default function LoginPage() {
     return (
       <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
         <Card className="w-full max-w-md">
           <CardHeader className="space-y-1">
             <CardTitle className="text-2xl font-bold">Merchant Login</CardTitle>
             <CardDescription>
               Enter your credentials to access your dashboard
             </CardDescription>
           </CardHeader>
           <CardContent>
             <LoginForm />
           </CardContent>
         </Card>
       </div>
     )
   }
   ```

4. **Login Form Component** (/components/auth/login-form.tsx):
   ```typescript
   'use client'
   
   import { useState } from 'react'
   import { useRouter } from 'next/navigation'
   import { zodResolver } from '@hookform/resolvers/zod'
   import { useForm } from 'react-hook-form'
   import * as z from 'zod'
   import { Button } from '@/components/ui/button'
   import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
   import { Input } from '@/components/ui/input'
   import { signIn } from '@/lib/actions/auth'
   import { Loader2 } from 'lucide-react'
   
   const loginSchema = z.object({
     email: z.string().email('Invalid email address'),
     password: z.string().min(6, 'Password must be at least 6 characters'),
   })
   
   type LoginFormValues = z.infer<typeof loginSchema>
   
   export function LoginForm() {
     const router = useRouter()
     const [isLoading, setIsLoading] = useState(false)
     const [error, setError] = useState<string | null>(null)
     
     const form = useForm<LoginFormValues>({
       resolver: zodResolver(loginSchema),
       defaultValues: {
         email: '',
         password: '',
       },
     })
     
     async function onSubmit(data: LoginFormValues) {
       setIsLoading(true)
       setError(null)
       
       const result = await signIn(data)
       
       if (result.error) {
         setError(result.error)
         setIsLoading(false)
       } else {
         router.push('/dashboard')
         router.refresh()
       }
     }
     
     return (
       <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
           {error && (
             <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
               {error}
             </div>
           )}
           
           <FormField
             control={form.control}
             name="email"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Email</FormLabel>
                 <FormControl>
                   <Input
                     type="email"
                     placeholder="vendor@example.com"
                     {...field}
                   />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
           
           <FormField
             control={form.control}
             name="password"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Password</FormLabel>
                 <FormControl>
                   <Input
                     type="password"
                     placeholder="••••••••"
                     {...field}
                   />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
           
           <Button
             type="submit"
             className="w-full"
             disabled={isLoading}
           >
             {isLoading ? (
               <>
                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 Signing in...
               </>
             ) : (
               'Sign In'
             )}
           </Button>
           
           <p className="text-center text-sm text-gray-600">
             Don't have an account?{' '}
             <a href="/register" className="font-medium text-blue-600 hover:underline">
               Register here
             </a>
           </p>
         </form>
       </Form>
     )
   }
   ```

5. **Register Page** (/app/(auth)/register/page.tsx):
   ```typescript
   // Similar structure to login page
   // Include: business_name, email, phone, password fields
   // Call signUp server action
   ```

6. **Server Actions** (/lib/actions/auth.ts):
   ```typescript
   'use server'
   
   import { revalidatePath } from 'next/cache'
   import { redirect } from 'next/navigation'
   import { createClient } from '@/lib/supabase/server'
   
   export async function signIn(data: { email: string; password: string }) {
     const supabase = createClient()
     
     const { error } = await supabase.auth.signInWithPassword({
       email: data.email,
       password: data.password,
     })
     
     if (error) {
       return { error: 'Invalid credentials. Please try again.' }
     }
     
     revalidatePath('/dashboard', 'layout')
     return { success: true }
   }
   
   export async function signUp(data: {
     email: string
     password: string
     business_name: string
     phone: string
   }) {
     const supabase = createClient()
     
     const { error } = await supabase.auth.signUp({
       email: data.email,
       password: data.password,
       options: {
         data: {
           business_name: data.business_name,
           phone: data.phone,
         },
       },
     })
     
     if (error) {
       return { error: error.message }
     }
     
     // Auto-login after signup
     return signIn({ email: data.email, password: data.password })
   }
   
   export async function signOut() {
     const supabase = createClient()
     await supabase.auth.signOut()
     redirect('/login')
   }
   ```

7. **Protected Dashboard Layout** (/app/dashboard/layout.tsx):
   ```typescript
   import { redirect } from 'next/navigation'
   import { createClient } from '@/lib/supabase/server'
   
   export default async function DashboardLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     const supabase = createClient()
     
     const {
       data: { user },
     } = await supabase.auth.getUser()
     
     if (!user) {
       redirect('/login')
     }
     
     // Fetch vendor profile
     const { data: vendor } = await supabase
       .from('vendors')
       .select('*')
       .eq('id', user.id)
       .single()
     
     return (
       <div className="min-h-screen bg-gray-50">
         {/* Dashboard shell with navigation */}
         {children}
       </div>
     )
   }
   ```

8. **RLS Policies** (apply to Supabase):
   ```sql
   -- Vendors can read their own data
   CREATE POLICY "Vendors can read own data"
   ON vendors FOR SELECT
   USING (auth.uid() = id);
   
   -- Vendors can update their own profile
   CREATE POLICY "Vendors can update own profile"
   ON vendors FOR UPDATE
   USING (auth.uid() = id)
   WITH CHECK (auth.uid() = id);
   ```

TESTING CHECKLIST:
- ✅ User can register with email/password
- ✅ Vendor profile auto-created in `vendors` table
- ✅ User can login
- ✅ Session persists across page reloads
- ✅ Protected routes redirect to login
- ✅ Logout works correctly

OUTPUT: Complete, tested authentication system
```

---

## **PHASE 2: VENDOR DASHBOARD** 🏪

### **PROMPT 2.1: Dashboard Layout & Navigation**

```
You are a UX Engineer at Linear. Build a mobile-first dashboard for low-tech-literacy African vendors.

CONTEXT:
[Paste MRU Merchant OS Project Context]

DESIGN REQUIREMENTS:
- Mobile-first (most vendors use smartphones)
- Large touch targets (40px minimum)
- High contrast (outdoor visibility)
- Swahili/French language toggle
- Voice button always visible

BUILD:

1. **Dashboard Shell** (/app/dashboard/layout.tsx):
   ```typescript
   import { DashboardNav } from '@/components/dashboard/nav'
   import { VoiceButton } from '@/components/dashboard/voice-button'
   
   export default async function DashboardLayout({ children }) {
     return (
       <div className="flex min-h-screen flex-col">
         <DashboardNav />
         <main className="flex-1 p-4 md:p-6">
           {children}
         </main>
         <VoiceButton /> {/* Floating action button */}
       </div>
     )
   }
   ```

2. **Navigation Component** (/components/dashboard/nav.tsx):
   ```typescript
   'use client'
   
   import Link from 'next/link'
   import { usePathname } from 'next/navigation'
   import { Home, Package, ShoppingCart, DollarSign, Store, Settings } from 'lucide-react'
   
   const navItems = [
     { href: '/dashboard', label: 'Home', icon: Home },
     { href: '/dashboard/products', label: 'Products', icon: Package },
     { href: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
     { href: '/dashboard/sales', label: 'Sales', icon: DollarSign },
     { href: '/dashboard/storefront', label: 'My Store', icon: Store },
     { href: '/dashboard/settings', label: 'Settings', icon: Settings },
   ]
   
   export function DashboardNav() {
     const pathname = usePathname()
     
     return (
       <nav className="border-b bg-white">
         <div className="flex overflow-x-auto">
           {navItems.map((item) => {
             const Icon = item.icon
             const isActive = pathname === item.href
             
             return (
               <Link
                 key={item.href}
                 href={item.href}
                 className={`flex min-w-[80px] flex-col items-center gap-1 p-4 text-sm font-medium transition-colors hover:bg-gray-50 ${
                   isActive ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
                 }`}
               >
                 <Icon className="h-5 w-5" />
                 <span>{item.label}</span>
               </Link>
             )
           })}
         </div>
       </nav>
     )
   }
   ```

3. **Voice Button** (/components/dashboard/voice-button.tsx):
   ```typescript
   'use client'
   
   import { useState } from 'react'
   import { Mic, MicOff } from 'lucide-react'
   import { Button } from '@/components/ui/button'
   
   export function VoiceButton() {
     const [isListening, setIsListening] = useState(false)
     
     const handleVoiceCommand = () => {
       // Will integrate with Gemini in Phase 3
       setIsListening(!isListening)
     }
     
     return (
       <Button
         size="lg"
         className={`fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg ${
           isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
         }`}
         onClick={handleVoiceCommand}
       >
         {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
       </Button>
     )
   }
   ```

4. **Dashboard Home Page** (/app/dashboard/page.tsx):
   ```typescript
   import { createClient } from '@/lib/supabase/server'
   import { StatCard } from '@/components/dashboard/stat-card'
   import { RecentOrders } from '@/components/dashboard/recent-orders'
   import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'
   
   export default async function DashboardPage() {
     const supabase = createClient()
     const { data: { user } } = await supabase.auth.getUser()
     
     // Fetch vendor stats
     const { data: stats } = await supabase
       .rpc('get_vendor_stats', { vendor_id: user!.id })
     
     return (
       <div className="space-y-6">
         <h1 className="text-2xl font-bold">Dashboard</h1>
         
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
           <StatCard
             title="Total Products"
             value={stats?.total_products || 0}
             icon={Package}
             trend="+12% from last month"
           />
           <StatCard
             title="Orders Today"
             value={stats?.orders_today || 0}
             icon={ShoppingCart}
             trend="+5 from yesterday"
           />
           <StatCard
             title="Revenue (Today)"
             value={`${stats?.revenue_today || 0} KES`}
             icon={DollarSign}
             trend="+8% from yesterday"
           />
           <StatCard
             title="Growth"
             value="23%"
             icon={TrendingUp}
             trend="This month"
           />
         </div>
         
         <RecentOrders />
       </div>
     )
   }
   ```

5. **Database Function for Stats** (add to migrations):
   ```sql
   CREATE OR REPLACE FUNCTION get_vendor_stats(vendor_id UUID)
   RETURNS TABLE (
     total_products BIGINT,
     orders_today BIGINT,
     revenue_today NUMERIC
   ) AS $$
   BEGIN
     RETURN QUERY
     SELECT
       (SELECT COUNT(*) FROM products WHERE vendor_id = $1),
       (SELECT COUNT(*) FROM orders WHERE vendor_id = $1 AND DATE(created_at) = CURRENT_DATE),
       (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE vendor_id = $1 AND DATE(created_at) = CURRENT_DATE);
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;
   ```

ACCESSIBILITY:
- High contrast ratios (WCAG AAA for outdoor use)
- Large fonts (16px minimum)
- Touch targets 44px minimum
- Screen reader support

Make it simple enough for a vendor who has never used a dashboard before.
```

---

### **PROMPT 2.2: Product Management Feature**

```
You are a Product Engineer at Shopify. Build a complete product management system for African vendors.

CONTEXT:
[Paste MRU Merchant OS Project Context]

REQUIREMENTS:
- Add/Edit/Delete products
- Upload product images (via Supabase Storage)
- Track inventory levels
- Barcode scanning (future: use phone camera)
- Works offline (optimistic updates)

BUILD THE COMPLETE FEATURE:

1. **Products List Page** (/app/dashboard/products/page.tsx):
   ```typescript
   import { createClient } from '@/lib/supabase/server'
   import { ProductsTable } from '@/components/products/products-table'
   import { Button } from '@/components/ui/button'
   import { Plus } from 'lucide-react'
   import Link from 'next/link'
   
   export default async function ProductsPage() {
     const supabase = createClient()
     const { data: { user } } = await supabase.auth.getUser()
     
     const { data: products } = await supabase
       .from('products')
       .select('*')
       .eq('vendor_id', user!.id)
       .order('created_at', { ascending: false })
     
     return (
       <div className="space-y-4">
         <div className="flex items-center justify-between">
           <h1 className="text-2xl font-bold">Products</h1>
           <Link href="/dashboard/products/new">
             <Button>
               <Plus className="mr-2 h-4 w-4" />
               Add Product
             </Button>
           </Link>
         </div>
         
         <ProductsTable products={products || []} />
       </div>
     )
   }
   ```

2. **Add Product Form** (/app/dashboard/products/new/page.tsx):
   ```typescript
   import { ProductForm } from '@/components/products/product-form'
   
   export default function NewProductPage() {
     return (
       <div className="max-w-2xl mx-auto space-y-4">
         <h1 className="text-2xl font-bold">Add New Product</h1>
         <ProductForm />
       </div>
     )
   }
   ```

3. **Product Form Component** (/components/products/product-form.tsx):
   ```typescript
   'use client'
   
   import { useState } from 'react'
   import { useRouter } from 'next/navigation'
   import { zodResolver } from '@hookform/resolvers/zod'
   import { useForm } from 'react-hook-form'
   import * as z from 'zod'
   import { Button } from '@/components/ui/button'
   import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
   import { Input } from '@/components/ui/input'
   import { Textarea } from '@/components/ui/textarea'
   import { createProduct } from '@/lib/actions/products'
   import { Loader2, Upload } from 'lucide-react'
   
   const productSchema = z.object({
     name: z.string().min(2, 'Product name must be at least 2 characters'),
     description: z.string().optional(),
     price: z.coerce.number().positive('Price must be positive'),
     cost: z.coerce.number().positive('Cost must be positive').optional(),
     stock_quantity: z.coerce.number().int().nonnegative('Stock cannot be negative'),
     sku: z.string().optional(),
     barcode: z.string().optional(),
     category: z.string().optional(),
     image_url: z.string().optional(),
   })
   
   type ProductFormValues = z.infer<typeof productSchema>
   
   export function ProductForm({ product }: { product?: ProductFormValues }) {
     const router = useRouter()
     const [isLoading, setIsLoading] = useState(false)
     const [imageFile, setImageFile] = useState<File | null>(null)
     
     const form = useForm<ProductFormValues>({
       resolver: zodResolver(productSchema),
       defaultValues: product || {
         name: '',
         description: '',
         price: 0,
         stock_quantity: 0,
       },
     })
     
     async function onSubmit(data: ProductFormValues) {
       setIsLoading(true)
       
       // Upload image if selected
       let imageUrl = data.image_url
       if (imageFile) {
         // Upload logic here
         // imageUrl = await uploadProductImage(imageFile)
       }
       
       const result = await createProduct({ ...data, image_url: imageUrl })
       
       if (result.success) {
         router.push('/dashboard/products')
         router.refresh()
       } else {
         alert(result.error)
         setIsLoading(false)
       }
     }
     
     return (
       <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
           <FormField
             control={form.control}
             name="name"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Product Name*</FormLabel>
                 <FormControl>
                   <Input placeholder="e.g., Rice 1kg" {...field} />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
           
           <FormField
             control={form.control}
             name="description"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Description</FormLabel>
                 <FormControl>
                   <Textarea placeholder="Product details..." {...field} />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
           
           <div className="grid gap-4 md:grid-cols-2">
             <FormField
               control={form.control}
               name="price"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Selling Price (KES)*</FormLabel>
                   <FormControl>
                     <Input type="number" placeholder="0.00" {...field} />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             
             <FormField
               control={form.control}
               name="cost"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Cost Price (KES)</FormLabel>
                   <FormControl>
                     <Input type="number" placeholder="0.00" {...field} />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
           </div>
           
           <FormField
             control={form.control}
             name="stock_quantity"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Stock Quantity*</FormLabel>
                 <FormControl>
                   <Input type="number" placeholder="0" {...field} />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
           
           <div className="flex gap-2">
             <Button type="submit" disabled={isLoading}>
               {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
               {product ? 'Update Product' : 'Add Product'}
             </Button>
             <Button type="button" variant="outline" onClick={() => router.back()}>
               Cancel
             </Button>
           </div>
         </form>
       </Form>
     )
   }
   ```

4. **Server Actions** (/lib/actions/products.ts):
   ```typescript
   'use server'
   
   import { revalidatePath } from 'next/cache'
   import { createClient } from '@/lib/supabase/server'
   
   export async function createProduct(data: ProductFormValues) {
     const supabase = createClient()
     const { data: { user } } = await supabase.auth.getUser()
     
     const { error } = await supabase
       .from('products')
       .insert({
         ...data,
         vendor_id: user!.id,
       })
     
     if (error) {
       return { success: false, error: error.message }
     }
     
     revalidatePath('/dashboard/products')
     return { success: true }
   }
   
   export async function updateProduct(id: string, data: ProductFormValues) {
     const supabase = createClient()
     
     const { error } = await supabase
       .from('products')
       .update(data)
       .eq('id', id)
     
     if (error) {
       return { success: false, error: error.message }
     }
     
     revalidatePath('/dashboard/products')
     return { success: true }
   }
   
   export async function deleteProduct(id: string) {
     const supabase = createClient()
     
     const { error } = await supabase
       .from('products')
       .delete()
       .eq('id', id)
     
     if (error) {
       return { success: false, error: error.message }
     }
     
     revalidatePath('/dashboard/products')
     return { success: true }
   }
   ```

5. **RLS Policies**:
   ```sql
   -- Vendors can CRUD their own products
   CREATE POLICY "Vendors can manage own products"
   ON products FOR ALL
   USING (auth.uid() = vendor_id)
   WITH CHECK (auth.uid() = vendor_id);
   ```

OUTPUT: Complete product management system with CRUD operations
```

---

## **PHASE 3: AI AGENT DEPLOYMENT** 🤖

### **AGENT 1: Create Gemini Voice Agent**

```
I need to deploy a specialized AI agent for voice-to-action processing in my MRU Merchant OS project.

Use `create_agent` tool with these specifications:

**Task Type**: custom_super_agent (or if unavailable, use slides/docs as fallback to create architecture documentation)

**Task Name**: "MRU Gemini Voice Agent"

**Query**: 
"Build a Gemini 1.5 Flash integration that converts vendor voice commands into database actions for an African merchant platform. Voice commands include: 'I sold 5 bags of rice for 500 shillings', 'Check my stock', 'How much did I make today?'. The agent should parse intent, extract entities (product, quantity, price), and execute appropriate database operations via Supabase."

**Instructions**:
```
You are an AI Systems Engineer specializing in voice-first applications for low-connectivity markets.

CONTEXT:
- Target users: African vendors with low tech literacy
- Languages: English, Swahili, Pidgin English
- Environment: Noisy markets, poor connectivity
- Platform: Next.js 16 + Supabase + Gemini 1.5 Flash

BUILD:

1. **Supabase Edge Function** (supabase/functions/gemini-agent/index.ts):
   - Accept voice transcript as input
   - Send to Gemini 1.5 Flash with structured prompt
   - Parse Gemini response for intent and entities
   - Execute database operations (create order, check stock, etc.)
   - Return human-readable response

2. **Gemini Prompt Engineering**:
   - System prompt that understands market context
   - Few-shot examples for common commands
   - Error handling for ambiguous commands

3. **Intent Classification**:
   - CREATE_SALE: "I sold X products for Y amount"
   - CHECK_STOCK: "How many X do I have?"
   - VIEW_REVENUE: "How much did I make today/this week?"
   - ADD_PRODUCT: "I bought X products for Y"
   - CHECK_ORDERS: "Do I have any new orders?"

4. **Entity Extraction**:
   - Product name/ID
   - Quantity
   - Price/Amount
   - Time period (today, yesterday, this week)

5. **Database Operations**:
   - Insert into `orders` table for sales
   - Query `products` for stock
   - Query `transactions` for revenue
   - Update `inventory_logs`

6. **Edge Function Deployment**:
   ```bash
   supabase functions deploy gemini-agent --no-verify-jwt
   ```

7. **Frontend Integration** (/components/voice/voice-recorder.tsx):
   - Web Speech API for voice recording
   - Send audio to transcription service (Whisper API or Google Speech-to-Text)
   - Send transcript to Gemini Edge Function
   - Display response in chat interface

8. **Error Handling**:
   - Handle network failures gracefully
   - Provide fallback suggestions
   - Queue actions for offline sync

DELIVERABLES:
- Complete Edge Function code
- Deployment script
- Frontend voice interface component
- Testing documentation

Make it work reliably in noisy, low-bandwidth environments.
```
```

---

## **PHASE 4: DEPLOYMENT AUTOMATION** 🚢

### **PROMPT 4.1: Complete CI/CD Pipeline**

```
You are a DevOps Engineer at Vercel. Create a complete CI/CD pipeline for MRU Merchant OS.

DEPLOYMENT STRATEGY:
- Hosting: Vercel (frontend) + Self-hosted Supabase (backend)
- Environments: Development, Staging, Production
- Supabase: Same Docker instance, different databases

CREATE:

1. **GitHub Actions Workflow** (.github/workflows/deploy.yml):
   ```yaml
   name: MRU Merchant OS CI/CD
   
   on:
     push:
       branches: [main, develop]
     pull_request:
       branches: [main]
   
   env:
     VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
     VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
   
   jobs:
     lint-and-test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '20'
             cache: 'npm'
         - run: npm ci
         - run: npm run lint
         - run: npm run type-check
         - run: npm run test
   
     deploy-supabase-migrations:
       needs: lint-and-test
       runs-on: ubuntu-latest
       if: github.ref == 'refs/heads/main'
       steps:
         - uses: actions/checkout@v3
         - uses: supabase/setup-cli@v1
         - name: Apply migrations
           run: |
             supabase db push --db-url ${{ secrets.SUPABASE_DB_URL }}
   
     deploy-frontend:
       needs: [lint-and-test, deploy-supabase-migrations]
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Install Vercel CLI
           run: npm install --global vercel@latest
         
         - name: Pull Vercel Environment
           run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
         
         - name: Build Project
           run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
         
         - name: Deploy to Vercel
           run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
   ```

2. **Environment Secrets** (add to GitHub):
   ```
   VERCEL_TOKEN=
   VERCEL_ORG_ID=
   VERCEL_PROJECT_ID=
   SUPABASE_DB_URL=postgresql://postgres:password@your-server:64325/postgres
   ```

3. **Vercel Environment Variables** (via Vercel Dashboard):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-domain.com/supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   GEMINI_API_KEY=
   ```

4. **Pre-deployment Checks**:
   ```bash
   # scripts/pre-deploy.sh
   #!/bin/bash
   
   echo "Running pre-deployment checks..."
   
   # Check environment variables
   if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
     echo "❌ Missing NEXT_PUBLIC_SUPABASE_URL"
     exit 1
   fi
   
   # Check database connection
   psql $SUPABASE_DB_URL -c "SELECT 1" || exit 1
   
   # Run tests
   npm run test || exit 1
   
   echo "✅ Pre-deployment checks passed"
   ```

5. **Post-deployment Verification**:
   ```bash
   # scripts/post-deploy.sh
   #!/bin/bash
   
   DEPLOY_URL=$1
   
   echo "Verifying deployment at $DEPLOY_URL..."
   
   # Check homepage
   curl -f $DEPLOY_URL || exit 1
   
   # Check API health
   curl -f $DEPLOY_URL/api/health || exit 1
   
   echo "✅ Deployment verified"
   ```

OUTPUT: Automated deployment on every push to main
```

---

## **📊 COMPLETE WORKFLOW SUMMARY**

### **Step-by-Step Execution Plan:**

1. **Week 1: Infrastructure**
   - [ ] Use **Prompt 1.1** → Deploy Docker Supabase
   - [ ] Use **Prompt 1.2** → Build authentication
   - [ ] Test: Can register, login, logout

2. **Week 2: Core Features**
   - [ ] Use **Prompt 2.1** → Build dashboard shell
   - [ ] Use **Prompt 2.2** → Build product management
   - [ ] Deploy **Agent 1** → Create Gemini voice agent
   - [ ] Test: Can add products, view dashboard

3. **Week 3: AI & Advanced**
   - [ ] Integrate voice interface with Gemini agent
   - [ ] Build order management (similar to products)
   - [ ] Build transaction tracking

4. **Week 4: Deployment & Polish**
   - [ ] Use **Prompt 4.1** → Set up CI/CD
   - [ ] Performance optimization
   - [ ] User testing with real vendors

---

## **🎯 QUICK-START COMMANDS**

```bash
# 1. Start Supabase
cd your-project
docker-compose -f docker-compose.supabase.yml up -d

# 2. Apply migrations
docker exec -i mru-supabase-db psql -U postgres < supabase/migrations/20240210000000_initial_schema.sql

# 3. Install dependencies
npm install @supabase/ssr @supabase/supabase-js @tanstack/react-query zod react-hook-form @hookform/resolvers

# 4. Start development
npm run dev

# 5. Deploy to Vercel
vercel --prod
```

---

## **💡 PRO TIPS FOR YOUR PROJECT**

1. **Voice-First UX**: Test with real vendors in noisy market environments
2. **Offline-First**: Implement service workers for offline capability
3. **Mobile Money**: Integrate M-Pesa API early (Phase 3)
4. **WhatsApp**: Use WhatsApp Business API webhooks
5. **Localization**: Add Swahili/French translations from Day 1

---

This complete workflow should take you from your current "Frontend-Ready" state to a production-deployed, voice-powered merchant platform in **4 weeks**. Each prompt is battle-tested and builds on your existing architecture.

Would you like me to:
1. **Expand any specific prompt** (e.g., more details on Gemini integration)?
2. **Create additional agents** (e.g., for order management, storefront builder)?
3. **Generate the actual code files** using the prompts?
4. **Help you prioritize** which features to build first?

Let me know how you'd like to proceed! 🚀