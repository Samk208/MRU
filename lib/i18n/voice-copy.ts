/**
 * MRU Merchant OS - Voice Interface Micro-copy
 *
 * Bilingual confirmation messages (English & French)
 * for voice transaction flows. Written for clarity and
 * low-literacy friendliness, localised for West African context.
 *
 * Usage: import { getVoiceCopy } from "@/lib/i18n/voice-copy"
 */

export type Locale = "en" | "fr"

export type TransactionAction = "sale" | "stock" | "balance" | "payment"

export interface VoiceCopySet {
  /* ---- prompts (idle screen) ---- */
  promptTitle: string
  promptSubtitle: string
  chipSale: string
  chipStock: string
  chipBalance: string

  /* ---- listening / processing ---- */
  listening: string
  processing: string
  transcriptionPlaceholder: string

  /* ---- per-action confirmations ---- */
  confirmations: Record<
    TransactionAction,
    {
      /** Short headline in the dialog, e.g. "Sale Logged" */
      title: string
      /**
       * Template with placeholders:
       * {item}, {qty}, {amount}, {currency}, {customer}
       */
      template: string
      /** Past-tense status badge */
      badge: string
      /** Toast / success message after confirming */
      success: string
      /** Cancellation feedback */
      cancelled: string
    }
  >

  /* ---- dialog chrome ---- */
  dialogTitle: string
  dialogDescription: string
  confirmButton: string
  cancelButton: string
  confirmingButton: string

  /* ---- misc ---- */
  transactionReady: string
  parsedLabel: string
  itemLabel: string
  amountLabel: string
  customerLabel: string
  methodLabel: string
  taxLabel: string
}

/* ------------------------------------------------------------------ */
/*  English copy – warm, simple, clear for everyday merchants          */
/* ------------------------------------------------------------------ */

const en: VoiceCopySet = {
  /* prompts */
  promptTitle: "Tap & Speak: Sale, Stock, or Balance",
  promptSubtitle: "Tap the mic and speak",
  chipSale: "Sale",
  chipStock: "Stock",
  chipBalance: "Balance",

  /* listening */
  listening: "Listening...",
  processing: "AI is understanding your words...",
  transcriptionPlaceholder: "Your words will appear here...",

  /* per-action confirmations */
  confirmations: {
    sale: {
      title: "Sale Logged",
      template: "Logged {qty} {item} at {currency} {amount}. Confirm?",
      badge: "Sale",
      success:
        "Sale confirmed! Your ledger has been updated. Keep selling!",
      cancelled: "Sale cancelled. No changes were saved.",
    },
    stock: {
      title: "Stock Added",
      template: "Added {qty} {item} to your inventory at {currency} {amount}. Confirm?",
      badge: "Stock",
      success:
        "Stock added! Your inventory is now up to date.",
      cancelled: "Stock entry cancelled. Nothing was changed.",
    },
    balance: {
      title: "Balance Checked",
      template: "Your current balance is {currency} {amount}.",
      badge: "Balance",
      success: "Balance check complete. All good!",
      cancelled: "Balance check dismissed.",
    },
    payment: {
      title: "Payment Started",
      template: "Sending {currency} {amount} to {customer} via {method}. Confirm?",
      badge: "Payment",
      success:
        "Payment sent! You will get a confirmation on your phone.",
      cancelled: "Payment cancelled. No money was sent.",
    },
  },

  /* dialog chrome */
  dialogTitle: "Are you sure you want to log this transaction?",
  dialogDescription: "Please review the details below before confirming.",
  confirmButton: "Confirm",
  cancelButton: "Cancel",
  confirmingButton: "Logging...",

  /* misc */
  transactionReady: "Transaction ready!",
  parsedLabel: "Transaction Parsed",
  itemLabel: "Item",
  amountLabel: "Amount",
  customerLabel: "Customer",
  methodLabel: "Method",
  taxLabel: "VAT (15%)",
}

/* ------------------------------------------------------------------ */
/*  French copy – warm, simple, localised for Guinean / West African   */
/* ------------------------------------------------------------------ */

const fr: VoiceCopySet = {
  /* prompts */
  promptTitle: "Appuyez & Parlez : Vente, Stock ou Solde",
  promptSubtitle: "Appuyez sur le micro et parlez",
  chipSale: "Vente",
  chipStock: "Stock",
  chipBalance: "Solde",

  /* listening */
  listening: "J'ecoute...",
  processing: "L'IA comprend vos mots...",
  transcriptionPlaceholder: "Vos mots apparaitront ici...",

  /* per-action confirmations */
  confirmations: {
    sale: {
      title: "Vente Enregistree",
      template: "{qty} {item} enregistres a {currency} {amount}. Confirmer ?",
      badge: "Vente",
      success:
        "Vente confirmee ! Votre registre est a jour. Bonne continuation !",
      cancelled: "Vente annulee. Aucune modification n'a ete enregistree.",
    },
    stock: {
      title: "Stock Ajoute",
      template: "{qty} {item} ajoutes au stock a {currency} {amount}. Confirmer ?",
      badge: "Stock",
      success:
        "Stock ajoute ! Votre inventaire est maintenant a jour.",
      cancelled: "Entree de stock annulee. Rien n'a ete modifie.",
    },
    balance: {
      title: "Solde Verifie",
      template: "Votre solde actuel est de {currency} {amount}.",
      badge: "Solde",
      success: "Verification du solde terminee. Tout va bien !",
      cancelled: "Verification du solde fermee.",
    },
    payment: {
      title: "Paiement Lance",
      template: "Envoi de {currency} {amount} a {customer} via {method}. Confirmer ?",
      badge: "Paiement",
      success:
        "Paiement envoye ! Vous recevrez une confirmation sur votre telephone.",
      cancelled: "Paiement annule. Aucun argent n'a ete envoye.",
    },
  },

  /* dialog chrome */
  dialogTitle: "Etes-vous sur de vouloir enregistrer cette transaction ?",
  dialogDescription:
    "Veuillez verifier les details ci-dessous avant de confirmer.",
  confirmButton: "Confirmer",
  cancelButton: "Annuler",
  confirmingButton: "Enregistrement...",

  /* misc */
  transactionReady: "Transaction prete !",
  parsedLabel: "Transaction Analysee",
  itemLabel: "Article",
  amountLabel: "Montant",
  customerLabel: "Client",
  methodLabel: "Methode",
  taxLabel: "TVA (15%)",
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const COPY_MAP: Record<Locale, VoiceCopySet> = { en, fr }

/** Return the full copy set for a given locale */
export function getVoiceCopy(locale: Locale = "en"): VoiceCopySet {
  return COPY_MAP[locale] ?? COPY_MAP.en
}

/**
 * Fill a template string with dynamic values.
 *
 * @example
 * fillTemplate("Logged {qty} {item} at {currency} {amount}. Confirm?", {
 *   qty: "3", item: "bags of rice", currency: "LRD", amount: "12,000"
 * })
 * // => "Logged 3 bags of rice at LRD 12,000. Confirm?"
 */
export function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(
    /\{(\w+)\}/g,
    (_, key: string) => values[key] ?? `{${key}}`,
  )
}
