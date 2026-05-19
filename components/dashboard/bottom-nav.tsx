"use client"

import { useTranslations } from "next-intl"

import { useState } from "react"
import {
  Home,
  ArrowLeftRight,
  Store,
  Wallet,
  User,
} from "lucide-react"

const navItems = (t: any) => [
  { label: t("home"), Icon: Home, href: "/dashboard" },
  { label: t("transactions"), Icon: ArrowLeftRight, href: "/dashboard/transactions" },
  { label: t("storefront"), Icon: Store, href: "/dashboard/store" },
  { label: t("wallet"), Icon: Wallet, href: "/dashboard/wallet" },
  { label: t("profile"), Icon: User, href: "/dashboard/profile" },
]

export function BottomNav() {
  const t = useTranslations("dashboard.bottomNav")
  const [active, setActive] = useState("Home")

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60"
      style={{
        background: "hsl(220 20% 99% / 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1.5">
        {navItems(t).map((item) => {
          const isActive = active === item.label
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(item.label)}
              className={`group relative flex min-h-[52px] min-w-[52px] flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1.5 transition-all duration-300 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active indicator pill */}
              {isActive && (
                <span
                  className="absolute -top-1.5 h-1 w-6 rounded-full bg-primary transition-all duration-300"
                  style={{
                    animation: "scaleIn 0.3s ease-out forwards",
                  }}
                />
              )}

              <item.Icon
                className={`h-5.5 w-5.5 transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-105"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-medium leading-none transition-all duration-300 ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Home indicator bar for iOS feel */}
      <div className="flex justify-center pb-1">
        <div className="h-1 w-32 rounded-full bg-foreground/10" />
      </div>
    </nav>
  )
}
