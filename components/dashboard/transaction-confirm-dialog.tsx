"use client"

import { useState } from "react"
import { Check, X, Loader2, ShoppingBag } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useLocale } from "@/lib/i18n/locale-context"
import { getVoiceCopy } from "@/lib/i18n/voice-copy"

export interface TransactionSummary {
  type: "sale" | "purchase" | "payment"
  item: string
  amount: string
  customer?: string
  method?: string
  tax?: string
}

interface TransactionConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  summary: TransactionSummary
  onConfirm: () => void
  onCancel: () => void
}

const typeConfig: Record<
  TransactionSummary["type"],
  { label: string; color: string; bg: string }
> = {
  sale: {
    label: "Sale",
    color: "hsl(152 87% 32%)",
    bg: "hsl(152 50% 95%)",
  },
  purchase: {
    label: "Purchase",
    color: "hsl(216 100% 50%)",
    bg: "hsl(216 100% 96%)",
  },
  payment: {
    label: "Payment",
    color: "hsl(40 100% 45%)",
    bg: "hsl(40 70% 95%)",
  },
}

export function TransactionConfirmDialog({
  open,
  onOpenChange,
  summary,
  onConfirm,
  onCancel,
}: TransactionConfirmDialogProps) {
  const [confirming, setConfirming] = useState(false)
  const { locale } = useLocale()
  const copy = getVoiceCopy(locale)
  const config = typeConfig[summary.type]

  function handleConfirm() {
    setConfirming(true)
    // Simulate a brief processing delay for feedback
    setTimeout(() => {
      setConfirming(false)
      onConfirm()
    }, 800)
  }

  function handleCancel() {
    onCancel()
    onOpenChange(false)
  }

  const summaryRows: { label: string; value: string }[] = [
    { label: copy.itemLabel, value: summary.item },
    { label: copy.amountLabel, value: summary.amount },
  ]
  if (summary.customer) {
    summaryRows.push({ label: copy.customerLabel, value: summary.customer })
  }
  if (summary.method) {
    summaryRows.push({ label: copy.methodLabel, value: summary.method })
  }
  if (summary.tax) {
    summaryRows.push({ label: copy.taxLabel, value: summary.tax })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="mx-4 max-w-sm rounded-3xl border-border/60 p-0 shadow-2xl sm:mx-auto"
        style={{ background: "hsl(220 33% 98.4%)" }}
      >
        {/* Top accent bar */}
        <div
          className="h-1.5 w-full rounded-t-3xl"
          style={{ background: config.color }}
        />

        <div className="flex flex-col gap-5 px-6 pb-6 pt-5">
          {/* Icon + title */}
          <AlertDialogHeader className="flex flex-col items-center gap-3 text-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: config.bg,
                animation: "scaleIn 0.4s ease-out forwards",
              }}
            >
              <ShoppingBag
                className="h-7 w-7"
                style={{ color: config.color }}
              />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-foreground leading-tight">
              {copy.dialogTitle}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
              {copy.dialogDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Type badge */}
          <div className="flex justify-center">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold"
              style={{ background: config.bg, color: config.color }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: config.color }}
              />
              {config.label}
            </span>
          </div>

          {/* Summary card */}
          <div
            className="rounded-2xl border border-border/60 p-4"
            style={{
              background: "hsl(220 20% 99%)",
              animation: "slideUpBounce 0.5s ease-out forwards",
            }}
          >
            <div className="flex flex-col gap-3">
              {summaryRows.map((row, i) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {row.label}
                    </span>
                    <span
                      className={`text-sm font-semibold text-foreground ${
                        row.label === "Amount" || row.label === "VAT (15%)"
                          ? "tabular-nums"
                          : ""
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                  {i < summaryRows.length - 1 && (
                    <div className="mt-3 h-px bg-border/50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <AlertDialogFooter className="flex flex-row gap-3 sm:flex-row sm:space-x-0">
            <AlertDialogCancel
              onClick={handleCancel}
              disabled={confirming}
              className="mt-0 flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border-border/60 bg-[hsl(220_20%_99%)] text-base font-semibold text-foreground transition-all hover:bg-secondary active:scale-[0.97] sm:mt-0"
            >
              <X className="h-5 w-5" />
              {copy.cancelButton}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={confirming}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary text-base font-semibold text-[hsl(0_0%_100%)] shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
            >
              {confirming ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {copy.confirmingButton}
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  {copy.confirmButton}
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
