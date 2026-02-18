"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href="https://wa.me/?text=Hi!%20I%27m%20interested%20in%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-500 hover:scale-110 active:scale-95 md:bottom-8 md:right-6 ${
        visible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-75"
      }`}
      style={{
        background: "hsl(142 70% 40%)",
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-[hsl(0_0%_100%)]" />

      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "hsl(142 70% 40% / 0.3)",
          animation: "pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />

      {/* Tooltip */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-[hsl(220_20%_99%)] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  )
}
