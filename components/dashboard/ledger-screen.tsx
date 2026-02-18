"use client"

import { useEffect, useState, useMemo } from "react"
import {
  Calendar,
  ChevronDown,
  Filter,
  Download,
  Search,
} from "lucide-react"
import { getTransactionVisual } from "@/lib/transaction-icons"
import type { TransactionType } from "@/lib/transaction-icons"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { BottomNav } from "@/components/dashboard/bottom-nav"

/* ─── Data ─── */

interface LedgerEntry {
  id: string
  date: string
  time: string
  type: TransactionType
  description: string
  amount: number
  tax: number
  method: string
}

const LEDGER_DATA: LedgerEntry[] = [
  { id: "L001", date: "2026-02-09", time: "10:42 AM", type: "sale", description: "Rice - 4 bags", amount: 18000, tax: 1260, method: "Voice" },
  { id: "L002", date: "2026-02-09", time: "9:15 AM", type: "sale", description: "Palm Oil - 6 gallons", amount: 12000, tax: 840, method: "WhatsApp" },
  { id: "L003", date: "2026-02-09", time: "8:55 AM", type: "purchase", description: "Supplier - Flour stock", amount: -25000, tax: 0, method: "Mobile Money" },
  { id: "L004", date: "2026-02-09", time: "8:30 AM", type: "payment", description: "Market stall rent", amount: -5000, tax: 0, method: "Transfer" },
  { id: "L005", date: "2026-02-08", time: "5:10 PM", type: "sale", description: "Bouillon cubes - 20 boxes", amount: 8000, tax: 560, method: "Voice" },
  { id: "L006", date: "2026-02-08", time: "3:45 PM", type: "sale", description: "Sugar - 10 bags", amount: 15000, tax: 1050, method: "Mobile Money" },
  { id: "L007", date: "2026-02-08", time: "2:20 PM", type: "purchase", description: "Supplier - Soap restock", amount: -9500, tax: 0, method: "Transfer" },
  { id: "L008", date: "2026-02-08", time: "11:00 AM", type: "sale", description: "Cooking Oil - 3 jerry cans", amount: 22500, tax: 1575, method: "Voice" },
  { id: "L009", date: "2026-02-07", time: "4:30 PM", type: "sale", description: "Soap bars - 24 packs", amount: 9600, tax: 672, method: "WhatsApp" },
  { id: "L010", date: "2026-02-07", time: "1:15 PM", type: "payment", description: "Electricity bill", amount: -3500, tax: 0, method: "Mobile Money" },
  { id: "L011", date: "2026-02-07", time: "10:05 AM", type: "sale", description: "Rice - 2 bags", amount: 9000, tax: 630, method: "Voice" },
  { id: "L012", date: "2026-02-06", time: "6:00 PM", type: "purchase", description: "Supplier - Beverages", amount: -18000, tax: 0, method: "Transfer" },
  { id: "L013", date: "2026-02-06", time: "11:40 AM", type: "sale", description: "Mixed groceries", amount: 6800, tax: 476, method: "Voice" },
]

const DATE_FILTERS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All", value: "all" },
] as const

const TYPE_FILTERS: { label: string; value: TransactionType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Sales", value: "sale" },
  { label: "Purchases", value: "purchase" },
  { label: "Payments", value: "payment" },
]

/* ─── Helpers ─── */

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const today = new Date("2026-02-09")
  const yesterday = new Date("2026-02-08")

  if (d.toDateString() === today.toDateString()) return "Today"
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday"

  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

function groupByDate(entries: LedgerEntry[]): Record<string, LedgerEntry[]> {
  const groups: Record<string, LedgerEntry[]> = {}
  for (const entry of entries) {
    const key = entry.date
    if (!groups[key]) groups[key] = []
    groups[key].push(entry)
  }
  return groups
}

/* ─── Component ─── */

export function LedgerScreen() {
  const [mounted, setMounted] = useState(false)
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showDateDropdown, setShowDateDropdown] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  /* Filter logic */
  const filtered = useMemo(() => {
    let data = [...LEDGER_DATA]

    // Date filter
    if (dateFilter === "today") {
      data = data.filter((e) => e.date === "2026-02-09")
    } else if (dateFilter === "yesterday") {
      data = data.filter((e) => e.date === "2026-02-08")
    } else if (dateFilter === "week") {
      data = data.filter((e) => e.date >= "2026-02-03")
    }

    // Type filter
    if (typeFilter !== "all") {
      data = data.filter((e) => e.type === typeFilter)
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      data = data.filter((e) => e.description.toLowerCase().includes(q))
    }

    return data
  }, [dateFilter, typeFilter, searchQuery])

  /* Totals */
  const totals = useMemo(() => {
    const sales = filtered.filter((e) => e.amount > 0).reduce((s, e) => s + e.amount, 0)
    const vat = filtered.reduce((s, e) => s + e.tax, 0)
    const net = filtered.reduce((s, e) => s + e.amount, 0)
    return { sales, vat, net }
  }, [filtered])

  const grouped = useMemo(() => groupByDate(filtered), [filtered])
  const dateKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ background: "hsl(220 33% 98.4%)" }}
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 border-b border-border/60 px-4 pb-3 pt-4"
        style={{
          background: "hsl(220 20% 99% / 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto max-w-lg">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-lg font-bold text-foreground">Tax-Ready Ledger</h1>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Export ledger"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-border/60 bg-secondary/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Date filter */}
          <div className="relative mb-2">
            <button
              type="button"
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Calendar className="h-4 w-4 text-primary" />
              {DATE_FILTERS.find((d) => d.value === dateFilter)?.label}
              <ChevronDown
                className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${showDateDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {showDateDropdown && (
              <div
                className="absolute left-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-border/60 shadow-lg"
                style={{ background: "hsl(220 20% 99%)" }}
              >
                {DATE_FILTERS.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => {
                      setDateFilter(d.value)
                      setShowDateDropdown(false)
                    }}
                    className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors hover:bg-secondary ${
                      dateFilter === d.value
                        ? "font-semibold text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Type filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {TYPE_FILTERS.map((f) => {
              const isActive = typeFilter === f.value
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setTypeFilter(f.value)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                  style={!isActive ? { background: "hsl(220 20% 99%)" } : undefined}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* ── Transaction List ── */}
      <main className="flex-1 px-4 pb-40 pt-4">
        <div className="mx-auto max-w-lg">
          {dateKeys.length === 0 ? (
            <div
              className={`flex flex-col items-center gap-3 rounded-2xl border border-border/60 px-6 py-12 text-center transition-all duration-500 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ background: "hsl(220 20% 99%)" }}
            >
              <Filter className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">
                No transactions match your filters
              </p>
              <button
                type="button"
                onClick={() => {
                  setDateFilter("all")
                  setTypeFilter("all")
                  setSearchQuery("")
                }}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {dateKeys.map((dateKey, gi) => (
                <section key={dateKey} aria-label={`Transactions for ${formatDate(dateKey)}`}>
                  {/* Date group header */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {formatDate(dateKey)}
                    </span>
                    <span className="h-px flex-1 bg-border/60" />
                    <span className="text-[10px] font-medium text-muted-foreground/60">
                      {grouped[dateKey].length} items
                    </span>
                  </div>

                  {/* Entries */}
                  <div
                    className="overflow-hidden rounded-2xl border border-border/60"
                    style={{ background: "hsl(220 20% 99%)" }}
                  >
                    {grouped[dateKey].map((entry, i) => {
                      const { Icon, color, bg, label } = getTransactionVisual(entry.type)
                      const isCredit = entry.amount > 0
                      const isLast = i === grouped[dateKey].length - 1

                      return (
                        <div
                          key={entry.id}
                          className={`flex items-center gap-3 px-4 py-3.5 transition-all duration-500 hover:bg-secondary/40 ${
                            !isLast ? "border-b border-border/30" : ""
                          } ${
                            mounted
                              ? "translate-y-0 opacity-100"
                              : "translate-y-3 opacity-0"
                          }`}
                          style={{
                            transitionDelay: `${(gi * 3 + i) * 50}ms`,
                          }}
                        >
                          {/* Icon */}
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                            style={{ background: bg }}
                          >
                            <Icon className="h-4 w-4" style={{ color }} />
                          </div>

                          {/* Details */}
                          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <span className="truncate text-sm font-semibold text-foreground">
                              {entry.description}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] text-muted-foreground">
                                {entry.time}
                              </span>
                              <span
                                className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium"
                                style={{ background: bg, color }}
                              >
                                {label}
                              </span>
                              <span
                                className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium"
                                style={{
                                  background: "hsl(216 14% 94%)",
                                  color: "hsl(0 0% 33%)",
                                }}
                              >
                                {entry.method}
                              </span>
                            </div>
                          </div>

                          {/* Amount + Tax */}
                          <div className="flex shrink-0 flex-col items-end gap-0.5">
                            <span
                              className="text-sm font-bold tabular-nums"
                              style={{
                                color: isCredit
                                  ? "hsl(152 87% 32%)"
                                  : "hsl(4 89% 55%)",
                              }}
                            >
                              {isCredit ? "+" : ""}
                              {Math.abs(entry.amount).toLocaleString()}
                              <span className="ml-0.5 text-[10px] font-medium opacity-70">
                                LRD
                              </span>
                            </span>
                            {entry.tax > 0 && (
                              <span className="text-[10px] font-medium text-muted-foreground">
                                VAT {entry.tax.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Sticky Bottom Totals ── */}
      <div
        className="fixed bottom-[68px] left-0 right-0 z-40 border-t border-border/60"
        style={{
          background: "hsl(220 20% 99% / 0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          className={`mx-auto flex max-w-lg items-center justify-between gap-2 px-4 py-3 transition-all duration-600 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Total Sales */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Sales
            </span>
            <span className="text-sm font-bold tabular-nums" style={{ color: "hsl(152 87% 32%)" }}>
              <AnimatedNumber value={totals.sales.toLocaleString()} duration={800} />
            </span>
          </div>

          {/* Separator */}
          <div className="h-8 w-px bg-border/60" />

          {/* VAT Collected */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              VAT
            </span>
            <span className="text-sm font-bold tabular-nums text-primary">
              <AnimatedNumber value={totals.vat.toLocaleString()} duration={800} />
            </span>
          </div>

          {/* Separator */}
          <div className="h-8 w-px bg-border/60" />

          {/* Net Earnings */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Net
            </span>
            <span
              className="text-sm font-bold tabular-nums"
              style={{
                color: totals.net >= 0 ? "hsl(152 87% 32%)" : "hsl(4 89% 55%)",
              }}
            >
              {totals.net >= 0 ? "+" : ""}
              <AnimatedNumber
                value={Math.abs(totals.net).toLocaleString()}
                duration={800}
              />
            </span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
