import { ArrowDownLeft, ArrowUpRight, RefreshCw, CreditCard } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type TransactionType = "sale" | "purchase" | "payment" | "received" | "transfer"

interface TransactionVisual {
  Icon: LucideIcon
  color: string
  bg: string
  label: string
}

export function getTransactionVisual(type: TransactionType): TransactionVisual {
  switch (type) {
    case "sale":
      return {
        Icon: ArrowDownLeft,
        color: "hsl(152 87% 32%)",
        bg: "hsl(152 50% 95%)",
        label: "Sale",
      }
    case "received":
      return {
        Icon: ArrowDownLeft,
        color: "hsl(216 100% 50%)",
        bg: "hsl(216 100% 96%)",
        label: "Received",
      }
    case "purchase":
      return {
        Icon: ArrowUpRight,
        color: "hsl(4 89% 55%)",
        bg: "hsl(4 50% 95%)",
        label: "Purchase",
      }
    case "payment":
      return {
        Icon: CreditCard,
        color: "hsl(4 89% 55%)",
        bg: "hsl(4 50% 95%)",
        label: "Payment",
      }
    case "transfer":
      return {
        Icon: ArrowUpRight,
        color: "hsl(4 89% 55%)",
        bg: "hsl(4 50% 95%)",
        label: "Transfer",
      }
    default:
      return {
        Icon: RefreshCw,
        color: "hsl(0 0% 33%)",
        bg: "hsl(0 0% 96%)",
        label: "Other",
      }
  }
}
