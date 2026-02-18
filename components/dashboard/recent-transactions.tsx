"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getTransactionVisual } from "@/lib/transaction-icons"
import type { TransactionType } from "@/lib/transaction-icons"

interface Transaction {
  id: string
  type: TransactionType
  description: string
  amount: string
  time: string
  method: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "sale",
    description: "Rice - 4 bags",
    amount: "+18,000 LRD",
    time: "10:42 AM",
    method: "Voice",
  },
  {
    id: "2",
    type: "received",
    description: "Mobile Money - MTN",
    amount: "+5,500 LRD",
    time: "9:15 AM",
    method: "Mobile Money",
  },
  {
    id: "3",
    type: "transfer",
    description: "Supplier Payment",
    amount: "-12,000 LRD",
    time: "8:30 AM",
    method: "Transfer",
  },
  {
    id: "4",
    type: "sale",
    description: "Palm Oil - 2 gallons",
    amount: "+6,000 LRD",
    time: "Yesterday",
    method: "Voice",
  },
]



export function RecentTransactions() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section aria-label="Recent transactions">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Recent Activity
        </h2>
        <Link
          href="/dashboard/transactions"
          className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
        >
          See all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div
        className={`overflow-hidden rounded-2xl border border-border/60 transition-all duration-600 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ background: "hsl(220 20% 99%)" }}
      >
        {transactions.map((tx, i) => {
          const { Icon, color, bg } = getTransactionVisual(tx.type)
          const isLast = i === transactions.length - 1
          const isPositive = tx.amount.startsWith("+")

          return (
            <div
              key={tx.id}
              className={`flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-secondary/50 ${
                !isLast ? "border-b border-border/40" : ""
              }`}
            >
              {/* Icon */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: bg }}
              >
                <Icon className="h-4.5 w-4.5" style={{ color }} />
              </div>

              {/* Details */}
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-semibold text-foreground">
                  {tx.description}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">{tx.time}</span>
                  <span className="text-xs text-muted-foreground/50">
                    {"  "}
                  </span>
                  <span
                    className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium"
                    style={{
                      background: bg,
                      color: color,
                    }}
                  >
                    {tx.method}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <span
                className="shrink-0 text-sm font-bold tabular-nums"
                style={{
                  color: isPositive ? "hsl(152 87% 32%)" : "hsl(4 89% 55%)",
                }}
              >
                {tx.amount}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
