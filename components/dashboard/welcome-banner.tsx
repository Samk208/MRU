"use client"

import { useEffect, useState } from "react"
import { Bell, Sun, Moon, CloudSun } from "lucide-react"

function getGreeting(): { text: string; Icon: typeof Sun } {
  const hour = new Date().getHours()
  if (hour < 12) return { text: "Good Morning", Icon: Sun }
  if (hour < 17) return { text: "Good Afternoon", Icon: CloudSun }
  return { text: "Good Evening", Icon: Moon }
}

export function WelcomeBanner() {
  const [mounted, setMounted] = useState(false)
  const { text, Icon } = getGreeting()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border/60 p-5 transition-all duration-700 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{
        background:
          "linear-gradient(135deg, hsl(216 100% 50%) 0%, hsl(216 100% 40%) 100%)",
      }}
    >
      {/* Background decorative circles */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10"
        style={{ background: "hsl(0 0% 100%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full opacity-[0.07]"
        style={{ background: "hsl(0 0% 100%)" }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-[hsl(0_0%_100%/0.8)]" />
            <span className="text-sm font-medium text-[hsl(0_0%_100%/0.85)]">
              {text}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(0_0%_100%)]">
            Kadiatou
          </h1>
          <p className="mt-1 text-sm text-[hsl(0_0%_100%/0.75)]">
            Here is your business today
          </p>
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(0_0%_100%/0.15)] transition-colors hover:bg-[hsl(0_0%_100%/0.25)]"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-[hsl(0_0%_100%)]" />
          {/* Notification dot */}
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-[hsl(4_89%_55%)]" />
        </button>
      </div>

      {/* Date pill */}
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[hsl(0_0%_100%/0.15)] px-3 py-1">
        <span className="text-xs font-medium text-[hsl(0_0%_100%/0.9)]">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  )
}
