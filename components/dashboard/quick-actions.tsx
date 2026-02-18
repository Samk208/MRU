"use client"

import { useEffect, useState } from "react"
import { Mic, Wallet, Store } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    label: "Log Voice Transaction",
    shortLabel: "Voice Sale",
    Icon: Mic,
    color: "hsl(216 100% 50%)",
    bgColor: "hsl(216 100% 96%)",
    description: "Tap & speak",
    href: "/dashboard/voice",
  },
  {
    label: "View Balance",
    shortLabel: "Balance",
    Icon: Wallet,
    color: "hsl(152 87% 32%)",
    bgColor: "hsl(152 50% 95%)",
    description: "Your money",
    href: "/dashboard",
  },
  {
    label: "View Store",
    shortLabel: "Store",
    Icon: Store,
    color: "hsl(40 100% 45%)",
    bgColor: "hsl(40 70% 95%)",
    description: "Your shop",
    href: "/dashboard/store",
  },
]

export function QuickActions() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section aria-label="Quick actions">
      <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Quick Actions
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, i) => (
          <Link
            key={action.label}
            href={action.href}
            className={`group flex flex-col items-center gap-2.5 rounded-2xl border border-border/60 p-4 transition-all duration-500 hover:shadow-md active:scale-95 ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              background: "hsl(220 20% 99%)",
              transitionDelay: `${i * 80}ms`,
            }}
            aria-label={action.label}
          >
            {/* Icon circle */}
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
              style={{ background: action.bgColor }}
            >
              <action.Icon
                className="h-6 w-6"
                style={{ color: action.color }}
              />
            </div>

            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-semibold text-foreground">
                {action.shortLabel}
              </span>
              <span className="text-xs text-muted-foreground">
                {action.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
