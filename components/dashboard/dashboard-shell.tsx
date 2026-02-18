"use client"

import { WelcomeBanner } from "./welcome-banner"
import { QuickActions } from "./quick-actions"
import { SnapshotCards } from "./snapshot-cards"
import { PredictiveInsights } from "./predictive-insights"
import { RecentTransactions } from "./recent-transactions"
import { BottomNav } from "./bottom-nav"
import { AIChatBubble } from "./ai-chat-bubble"

export function DashboardShell() {
  return (
    <div
      className="relative flex min-h-screen flex-col pb-20"
      style={{ background: "hsl(220 33% 98.4%)" }}
    >
      {/* Status bar accent */}
      <div className="h-1 w-full bg-primary" />

      <main className="flex flex-1 flex-col gap-5 px-4 py-5 md:mx-auto md:max-w-lg md:px-0">
        <WelcomeBanner />
        <QuickActions />
        <SnapshotCards />
        <PredictiveInsights />
        <RecentTransactions />
      </main>

      <BottomNav />
      <AIChatBubble />
    </div>
  )
}
