/**
 * Voice flow micro-copy types only.
 * Strings now live in messages/{en,fr}.json under the voiceCopy namespace.
 * Access via useTranslations("voiceCopy") from next-intl.
 */

export type Locale = "en" | "fr"

export type TransactionAction = "sale" | "stock" | "balance" | "payment"

export interface VoiceCopySet {
  promptTitle: string
  promptSubtitle: string
  chipSale: string
  chipStock: string
  chipBalance: string
  listening: string
  processing: string
  transcriptionPlaceholder: string
  confirmations: Record<
    TransactionAction,
    {
      title: string
      template: string
      badge: string
      success: string
      cancelled: string
    }
  >
  dialogTitle: string
  dialogDescription: string
  confirmButton: string
  cancelButton: string
  confirmingButton: string
  transactionReady: string
  parsedLabel: string
  itemLabel: string
  amountLabel: string
  customerLabel: string
  methodLabel: string
  taxLabel: string
}

/**
 * Fill a template string with dynamic values.
 * Kept for backward compatibility until all consumers migrate to next-intl.
 */
export function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`)
}
