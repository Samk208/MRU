import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardNav />
      {/* 
        md:pl-64 pushes content to the right on desktop to account for fixed sidebar.
        pb-20 adds padding bottom on mobile to account for fixed bottom nav.
      */}
      <main className="md:pl-64 pb-20 pt-8 px-4 md:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}
