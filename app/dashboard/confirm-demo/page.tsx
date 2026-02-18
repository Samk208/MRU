"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import {
  TransactionConfirmDialog,
  type TransactionSummary,
} from "@/components/dashboard/transaction-confirm-dialog"
import { BottomNav } from "@/components/dashboard/bottom-nav"

const demoTransactions: TransactionSummary[] = [
  {
    type: "sale",
    item: "3 bags of rice",
    amount: "LRD 15,000",
    customer: "Mamadou",
    method: "Voice",
    tax: "LRD 2,250",
  },
  {
    type: "purchase",
    item: "50 kg sugar wholesale",
    amount: "LRD 8,500",
    method: "Mobile Money",
    tax: "LRD 1,275",
  },
  {
    type: "payment",
    item: "Electricity bill - March",
    amount: "LRD 3,200",
    method: "Orange Money",
  },
]

export default function ConfirmDemoPage() {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [confirmed, setConfirmed] = useState<number | null>(null)

  function handleConfirm() {
    setConfirmed(activeIndex)
    setOpen(false)
  }

  function handleCancel() {
    setOpen(false)
  }

  return (
    <div
      className="relative flex min-h-screen flex-col pb-20"
      style={{ background: "hsl(220 33% 98.4%)" }}
    >
      {/* Header */}
      <div className="px-4 py-6 md:mx-auto md:max-w-lg md:px-0">
        <h1 className="text-xl font-bold text-foreground">
          Transaction Confirmation
        </h1>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Tap any transaction below to preview the confirmation dialog.
        </p>
      </div>

      {/* Transaction cards */}
      <div className="flex flex-col gap-3 px-4 md:mx-auto md:max-w-lg md:px-0">
        {demoTransactions.map((tx, i) => {
          const isConfirmed = confirmed === i
          return (
            <button
              key={tx.item}
              type="button"
              onClick={() => {
                setActiveIndex(i)
                setConfirmed(null)
                setOpen(true)
              }}
              className="group flex items-center gap-4 rounded-2xl border border-border/60 p-4 text-left transition-all duration-300 hover:border-primary/30 hover:shadow-md active:scale-[0.98]"
              style={{
                background: isConfirmed
                  ? "hsl(152 50% 97%)"
                  : "hsl(220 20% 99%)",
                borderColor: isConfirmed
                  ? "hsl(152 50% 85%)"
                  : undefined,
                animation: `slideUpBounce 0.5s ease-out ${i * 100}ms forwards`,
                opacity: 0,
              }}
            >
              {/* Type dot */}
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background:
                    tx.type === "sale"
                      ? "hsl(152 50% 95%)"
                      : tx.type === "purchase"
                        ? "hsl(216 100% 96%)"
                        : "hsl(40 70% 95%)",
                }}
              >
                <span
                  className="text-lg"
                  role="img"
                  aria-hidden="true"
                >
                  {tx.type === "sale"
                    ? "\u2193"
                    : tx.type === "purchase"
                      ? "\u2191"
                      : "\u21C4"}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">
                  {tx.item}
                </span>
                <span className="text-xs text-muted-foreground">
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  {tx.method ? ` \u00B7 ${tx.method}` : ""}
                </span>
              </div>

              {/* Amount / status */}
              <div className="flex flex-col items-end gap-0.5">
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{
                    color:
                      tx.type === "sale"
                        ? "hsl(152 87% 32%)"
                        : tx.type === "purchase"
                          ? "hsl(4 89% 55%)"
                          : "hsl(0 0% 13.3%)",
                  }}
                >
                  {tx.type === "sale" ? "+" : tx.type === "purchase" ? "-" : ""}
                  {tx.amount}
                </span>
                {isConfirmed && (
                  <span
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: "hsl(152 87% 32%)" }}
                  >
                    <Check className="h-3 w-3" />
                    Logged
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Hint */}
      <p className="mt-6 px-4 text-center text-xs text-muted-foreground md:mx-auto md:max-w-lg">
        This is a demo of the reusable confirmation dialog component.
      </p>

      {/* The confirmation dialog */}
      <TransactionConfirmDialog
        open={open}
        onOpenChange={setOpen}
        summary={demoTransactions[activeIndex]}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <BottomNav />
    </div>
  )
}
