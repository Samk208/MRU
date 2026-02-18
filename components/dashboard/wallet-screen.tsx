"use client"

import { useEffect, useState } from "react"
import {
  ArrowLeft,
  RefreshCw,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { BottomNav } from "./bottom-nav"

/* ---------- provider data ---------- */

interface Provider {
  name: string
  shortName: string
  balance: string
  currency: string
  lastUpdate: string
  brandColor: string
  brandBg: string
  brandDark: string
  logo: string
  change: string
  changeDir: "up" | "down"
}

const providers: Provider[] = [
  {
    name: "MTN Mobile Money",
    shortName: "MTN MoMo",
    balance: "215,400",
    currency: "LRD",
    lastUpdate: "2 min ago",
    brandColor: "#FFCC00",
    brandBg: "hsl(48 100% 95%)",
    brandDark: "hsl(48 100% 35%)",
    logo: "M",
    change: "+8.3%",
    changeDir: "up",
  },
  {
    name: "Orange Money",
    shortName: "Orange",
    balance: "109,600",
    currency: "LRD",
    lastUpdate: "15 min ago",
    brandColor: "#FF6600",
    brandBg: "hsl(24 100% 96%)",
    brandDark: "hsl(24 100% 40%)",
    logo: "O",
    change: "-2.1%",
    changeDir: "down",
  },
]

/* ---------- chart data ---------- */

const weeklyData = [
  { day: "Mon", credit: 42000, debit: 28000 },
  { day: "Tue", credit: 55000, debit: 38000 },
  { day: "Wed", credit: 38000, debit: 44000 },
  { day: "Thu", credit: 62000, debit: 31000 },
  { day: "Fri", credit: 75000, debit: 52000 },
  { day: "Sat", credit: 88000, debit: 41000 },
  { day: "Sun", credit: 29000, debit: 18000 },
]

/* ---------- recent flows ---------- */

interface FlowItem {
  id: string
  type: "credit" | "debit"
  provider: "MTN" | "Orange"
  amount: string
  description: string
  time: string
}

const recentFlows: FlowItem[] = [
  {
    id: "1",
    type: "credit",
    provider: "MTN",
    amount: "+18,500",
    description: "Cash-in from Aminata",
    time: "10:42 AM",
  },
  {
    id: "2",
    type: "debit",
    provider: "Orange",
    amount: "-7,200",
    description: "Cash-out to Moussa",
    time: "10:15 AM",
  },
  {
    id: "3",
    type: "credit",
    provider: "MTN",
    amount: "+32,000",
    description: "Merchant deposit",
    time: "9:30 AM",
  },
  {
    id: "4",
    type: "debit",
    provider: "MTN",
    amount: "-12,000",
    description: "Bill payment",
    time: "9:05 AM",
  },
]

/* ---------- custom tooltip ---------- */

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-xl border border-border/60 px-3 py-2 shadow-lg"
      style={{ background: "hsl(220 20% 99%)" }}
    >
      <p className="mb-1 text-xs font-semibold text-foreground">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className="flex items-center gap-1.5 text-xs"
          style={{ color: entry.color }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: entry.color }}
          />
          {entry.dataKey === "credit" ? "Credit" : "Debit"}:{" "}
          <span className="font-semibold tabular-nums">
            {entry.value.toLocaleString()} LRD
          </span>
        </p>
      ))}
    </div>
  )
}

/* ---------- main component ---------- */

export function WalletScreen() {
  const [mounted, setMounted] = useState(false)
  const [reconciling, setReconciling] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  function handleReconcile(providerName: string) {
    setReconciling(providerName)
    setTimeout(() => setReconciling(null), 2000)
  }

  /* totals */
  const totalCredit = weeklyData.reduce((s, d) => s + d.credit, 0)
  const totalDebit = weeklyData.reduce((s, d) => s + d.debit, 0)

  return (
    <div
      className="relative flex min-h-screen flex-col pb-20"
      style={{ background: "hsl(220 33% 98.4%)" }}
    >
      {/* ---- top bar ---- */}
      <header
        className="sticky top-0 z-40 border-b border-border/60"
        style={{
          background: "hsl(220 33% 98.4% / 0.9)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link
            href="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-secondary"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-lg font-bold text-foreground">Wallet</h1>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-4 py-5 md:mx-auto md:max-w-lg md:px-0">
        {/* ---- headline ---- */}
        <section
          className={`transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <h2 className="text-balance text-xl font-bold text-foreground">
            Mobile Money Balances
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Combined float across all providers
          </p>

          {/* total combined balance */}
          <div
            className="mt-3 flex items-baseline gap-2 rounded-2xl border border-border/60 px-5 py-4"
            style={{ background: "hsl(220 20% 99%)" }}
          >
            <span className="text-3xl font-extrabold tabular-nums text-foreground">
              <AnimatedNumber value="325,000" duration={1400} />
            </span>
            <span className="text-base font-semibold text-muted-foreground">
              LRD
            </span>
            <span className="ml-auto text-xs text-muted-foreground">Total Float</span>
          </div>
        </section>

        {/* ---- provider cards ---- */}
        <section aria-label="Provider balances" className="flex flex-col gap-3">
          {providers.map((p, i) => (
            <div
              key={p.name}
              className={`group relative overflow-hidden rounded-2xl border border-border/60 transition-all duration-500 hover:shadow-md ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{
                background: "hsl(220 20% 99%)",
                transitionDelay: `${150 + i * 120}ms`,
              }}
            >
              {/* brand accent bar */}
              <div
                className="absolute bottom-0 left-0 top-0 w-1.5 rounded-l-2xl"
                style={{ background: p.brandColor }}
              />

              <div className="flex flex-col gap-3 py-4 pl-5 pr-4">
                {/* top row: logo + name + badge */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-black"
                    style={{
                      background: p.brandBg,
                      color: p.brandDark,
                    }}
                  >
                    {p.logo}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-bold text-foreground">
                      {p.shortName}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Updated {p.lastUpdate}
                    </div>
                  </div>
                  {/* change badge */}
                  <div
                    className="flex items-center gap-1 rounded-full px-2.5 py-1"
                    style={{ background: p.brandBg }}
                  >
                    {p.changeDir === "up" ? (
                      <ArrowUpRight
                        className="h-3.5 w-3.5"
                        style={{ color: p.brandDark }}
                      />
                    ) : (
                      <ArrowDownLeft
                        className="h-3.5 w-3.5"
                        style={{ color: p.brandDark }}
                      />
                    )}
                    <span
                      className="text-xs font-semibold"
                      style={{ color: p.brandDark }}
                    >
                      {p.change}
                    </span>
                  </div>
                </div>

                {/* balance row */}
                <div className="flex items-baseline gap-1.5 pl-0.5">
                  <span className="text-2xl font-extrabold tabular-nums text-foreground">
                    <AnimatedNumber
                      value={p.balance}
                      duration={1200 + i * 200}
                    />
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {p.currency}
                  </span>
                </div>

                {/* reconcile button */}
                <button
                  type="button"
                  onClick={() => handleReconcile(p.name)}
                  disabled={reconciling === p.name}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-70"
                  style={{
                    background: p.brandBg,
                    color: p.brandDark,
                  }}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${reconciling === p.name ? "animate-spin" : ""}`}
                  />
                  {reconciling === p.name ? "Reconciling..." : "Reconcile"}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* ---- weekly flow chart ---- */}
        <section
          aria-label="Weekly credit and debit flows"
          className={`rounded-2xl border border-border/60 p-4 transition-all duration-600 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{
            background: "hsl(220 20% 99%)",
            transitionDelay: "400ms",
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Weekly Cash Flow
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Credit vs Debit this week
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              Details
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* summary pills */}
          <div className="mb-4 flex gap-3">
            <div className="flex flex-1 flex-col items-center rounded-xl px-3 py-2.5" style={{ background: "hsl(152 50% 95%)" }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "hsl(152 87% 32%)" }}>
                Total In
              </span>
              <span className="text-base font-extrabold tabular-nums" style={{ color: "hsl(152 87% 32%)" }}>
                <AnimatedNumber value={totalCredit.toLocaleString()} duration={1000} />
              </span>
            </div>
            <div className="flex flex-1 flex-col items-center rounded-xl px-3 py-2.5" style={{ background: "hsl(4 80% 96%)" }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "hsl(4 89% 50%)" }}>
                Total Out
              </span>
              <span className="text-base font-extrabold tabular-nums" style={{ color: "hsl(4 89% 50%)" }}>
                <AnimatedNumber value={totalDebit.toLocaleString()} duration={1000} />
              </span>
            </div>
          </div>

          {/* bar chart */}
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(216 12% 90%)"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fontWeight: 600,
                    fill: "hsl(0 0% 33.3%)",
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "hsl(0 0% 33.3%)",
                  }}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                  }
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: "hsl(216 100% 50% / 0.04)", radius: 6 }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, fontWeight: 600 }}
                  formatter={(value: string) =>
                    value === "credit" ? "Credit" : "Debit"
                  }
                />
                <Bar
                  dataKey="credit"
                  fill="hsl(152 87% 38%)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={28}
                />
                <Bar
                  dataKey="debit"
                  fill="hsl(4 89% 55%)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ---- recent flows ---- */}
        <section
          aria-label="Recent money flows"
          className={`transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: "550ms" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Recent Flows
            </h3>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              View all
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {recentFlows.map((flow, i) => (
              <div
                key={flow.id}
                className={`flex items-center gap-3 rounded-xl border border-border/40 px-4 py-3 transition-all duration-500 ${mounted ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                style={{
                  background: "hsl(220 20% 99%)",
                  transitionDelay: `${600 + i * 80}ms`,
                }}
              >
                {/* icon */}
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background:
                      flow.type === "credit"
                        ? "hsl(152 50% 95%)"
                        : "hsl(4 80% 96%)",
                  }}
                >
                  {flow.type === "credit" ? (
                    <ArrowDownLeft
                      className="h-4 w-4"
                      style={{ color: "hsl(152 87% 32%)" }}
                    />
                  ) : (
                    <ArrowUpRight
                      className="h-4 w-4"
                      style={{ color: "hsl(4 89% 50%)" }}
                    />
                  )}
                </div>

                {/* text */}
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {flow.description}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          flow.provider === "MTN" ? "#FFCC00" : "#FF6600",
                      }}
                    />
                    {flow.provider} &middot; {flow.time}
                  </div>
                </div>

                {/* amount */}
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{
                    color:
                      flow.type === "credit"
                        ? "hsl(152 87% 32%)"
                        : "hsl(4 89% 50%)",
                  }}
                >
                  {flow.amount} LRD
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
