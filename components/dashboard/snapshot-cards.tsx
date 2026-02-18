"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { AnimatedNumber } from "@/components/ui/animated-number"

interface SnapshotCard {
  title: string
  value: string
  currency: string
  change: string
  changeType: "up" | "down" | "neutral"
  detail: string
  accentColor: string
  accentBg: string
}

const cards: SnapshotCard[] = [
  {
    title: "Sales Today",
    value: "48,500",
    currency: "LRD",
    change: "+12%",
    changeType: "up",
    detail: "7 transactions",
    accentColor: "hsl(152 87% 32%)",
    accentBg: "hsl(152 50% 95%)",
  },
  {
    title: "Mobile Money Float",
    value: "325,000",
    currency: "LRD",
    change: "-5%",
    changeType: "down",
    detail: "Last updated 2h ago",
    accentColor: "hsl(216 100% 50%)",
    accentBg: "hsl(216 100% 96%)",
  },
  {
    title: "Pending Payments",
    value: "12,000",
    currency: "LRD",
    change: "3 pending",
    changeType: "neutral",
    detail: "Oldest: 2 days",
    accentColor: "hsl(40 100% 45%)",
    accentBg: "hsl(40 70% 95%)",
  },
]

export function SnapshotCards() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section aria-label="Business snapshot">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Business Snapshot
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl border border-border/60 p-4 transition-all duration-500 hover:shadow-md ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              background: "hsl(220 20% 99%)",
              transitionDelay: `${i * 100}ms`,
            }}
          >
            {/* Left accent bar */}
            <div
              className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl"
              style={{ background: card.accentColor }}
            />

            <div className="flex items-center justify-between pl-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {card.title}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-foreground tabular-nums">
                    <AnimatedNumber value={card.value} />
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {card.currency}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {card.detail}
                </span>
              </div>

              <div className="flex flex-col items-end gap-2">
                {/* Change badge */}
                <div
                  className="flex items-center gap-1 rounded-full px-2.5 py-1"
                  style={{ background: card.accentBg }}
                >
                  {card.changeType === "up" && (
                    <TrendingUp
                      className="h-3.5 w-3.5"
                      style={{ color: card.accentColor }}
                    />
                  )}
                  {card.changeType === "down" && (
                    <TrendingDown
                      className="h-3.5 w-3.5"
                      style={{ color: card.accentColor }}
                    />
                  )}
                  <span
                    className="text-xs font-semibold"
                    style={{ color: card.accentColor }}
                  >
                    {card.change}
                  </span>
                </div>

                {/* Sparkline mini chart */}
                <svg
                  width="64"
                  height="24"
                  viewBox="0 0 64 24"
                  fill="none"
                  className="opacity-40 transition-opacity group-hover:opacity-70"
                  aria-hidden="true"
                >
                  {card.changeType === "up" ? (
                    <path
                      d="M2 20 L12 16 L22 18 L32 12 L42 10 L52 6 L62 4"
                      stroke={card.accentColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : card.changeType === "down" ? (
                    <path
                      d="M2 4 L12 8 L22 6 L32 12 L42 14 L52 18 L62 20"
                      stroke={card.accentColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M2 12 L12 14 L22 10 L32 12 L42 10 L52 14 L62 12"
                      stroke={card.accentColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
