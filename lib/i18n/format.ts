import type { AppLocale } from "@/i18n/routing"

const ZERO_DECIMAL_CURRENCIES = new Set(["GNF", "XOF", "XAF", "KMF"])

export function formatCurrency(amount: number, currency: string, locale: AppLocale): string {
  const decimals = ZERO_DECIMAL_CURRENCIES.has(currency) ? 0 : 2
  try {
    return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
  } catch {
    return `${amount.toFixed(decimals)} ${currency}`
  }
}

export function formatDate(date: Date, locale: AppLocale): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function formatRelative(date: Date, locale: AppLocale): string {
  const rtf = new Intl.RelativeTimeFormat(locale === "fr" ? "fr-FR" : "en-US", { numeric: "auto" })
  const diffMs = date.getTime() - Date.now()
  const diffMin = Math.round(diffMs / 60_000)
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute")
  const diffHr = Math.round(diffMin / 60)
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour")
  const diffDay = Math.round(diffHr / 24)
  return rtf.format(diffDay, "day")
}
