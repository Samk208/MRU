"use client"

import { useState } from "react"
import { Check, Mic, Package, Wallet, CreditCard, Globe } from "lucide-react"
import {
  getVoiceCopy,
  fillTemplate,
  type Locale,
  type TransactionAction,
} from "@/lib/i18n/voice-copy"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import Link from "next/link"

const actions: {
  key: TransactionAction
  Icon: typeof Mic
  color: string
  bg: string
  sampleValues: Record<string, string>
}[] = [
  {
    key: "sale",
    Icon: Mic,
    color: "hsl(152 87% 32%)",
    bg: "hsl(152 50% 95%)",
    sampleValues: {
      qty: "3",
      item: "bags of rice",
      currency: "LRD",
      amount: "12,000",
      customer: "Mamadou",
      method: "Voice",
    },
  },
  {
    key: "stock",
    Icon: Package,
    color: "hsl(216 100% 50%)",
    bg: "hsl(216 100% 96%)",
    sampleValues: {
      qty: "10",
      item: "bottles of palm oil",
      currency: "LRD",
      amount: "8,500",
      customer: "",
      method: "",
    },
  },
  {
    key: "balance",
    Icon: Wallet,
    color: "hsl(40 100% 45%)",
    bg: "hsl(40 70% 95%)",
    sampleValues: {
      qty: "",
      item: "",
      currency: "LRD",
      amount: "245,000",
      customer: "",
      method: "MTN MoMo",
    },
  },
  {
    key: "payment",
    Icon: CreditCard,
    color: "hsl(4 89% 55%)",
    bg: "hsl(4 50% 95%)",
    sampleValues: {
      qty: "",
      item: "",
      currency: "LRD",
      amount: "5,000",
      customer: "Fatu",
      method: "Orange Money",
    },
  },
]

function CopyCard({
  locale,
  action,
}: {
  locale: Locale
  action: (typeof actions)[number]
}) {
  const copy = getVoiceCopy(locale)
  const conf = copy.confirmations[action.key]
  const filled = fillTemplate(conf.template, action.sampleValues)

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-border/60 p-4"
      style={{ background: "hsl(220 20% 99%)" }}
    >
      {/* badge */}
      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: action.bg }}
        >
          <action.Icon className="h-4 w-4" style={{ color: action.color }} />
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
          style={{ background: action.bg, color: action.color }}
        >
          {conf.badge}
        </span>
        <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
          {locale === "en" ? "EN" : "FR"}
        </span>
      </div>

      {/* confirmation prompt */}
      <div className="rounded-xl border border-border/40 p-3" style={{ background: "hsl(220 33% 98.4%)" }}>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {locale === "en" ? "Confirmation Prompt" : "Message de Confirmation"}
        </p>
        <p className="mt-1.5 text-sm font-semibold text-foreground leading-relaxed">
          {filled}
        </p>
      </div>

      {/* success */}
      <div className="flex items-start gap-2 rounded-xl border border-[hsl(152_50%_85%)] p-3" style={{ background: "hsl(152 50% 97%)" }}>
        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "hsl(152 87% 32%)" }} />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "hsl(152 87% 32%)" }}>
            {locale === "en" ? "Success" : "Succes"}
          </p>
          <p className="mt-0.5 text-xs text-foreground leading-relaxed">
            {conf.success}
          </p>
        </div>
      </div>

      {/* cancelled */}
      <div className="flex items-start gap-2 rounded-xl border border-border/40 p-3" style={{ background: "hsl(220 20% 99%)" }}>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {locale === "en" ? "Cancelled" : "Annule"}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
            {conf.cancelled}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CopyPreviewPage() {
  const [activeLocale, setActiveLocale] = useState<Locale>("en")
  const copy = getVoiceCopy(activeLocale)

  return (
    <div
      className="relative flex min-h-screen flex-col pb-20"
      style={{ background: "hsl(220 33% 98.4%)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b border-border/60"
        style={{ background: "hsl(220 33% 98.4% / 0.9)", backdropFilter: "blur(12px)" }}
      >
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link
            href="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-secondary"
            aria-label="Back"
          >
            <span className="text-lg">&#8592;</span>
          </Link>
          <h1 className="flex-1 text-lg font-bold text-foreground">
            Voice Copy Preview
          </h1>
          {/* Language toggle */}
          <div className="flex rounded-lg border border-border/60 p-0.5" style={{ background: "hsl(220 20% 99%)" }}>
            {(["en", "fr"] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setActiveLocale(loc)}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeLocale === loc
                    ? "bg-primary text-[hsl(0_0%_100%)] shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe className="h-3 w-3" />
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-4 py-5 md:mx-auto md:max-w-lg md:px-0">
        {/* Prompt section */}
        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {activeLocale === "en" ? "Idle Screen Prompts" : "Ecran d'Attente"}
          </h2>
          <div
            className="flex flex-col gap-3 rounded-2xl border border-border/60 p-4"
            style={{ background: "hsl(220 20% 99%)" }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {activeLocale === "en" ? "Title" : "Titre"}
              </span>
              <p className="text-base font-bold text-foreground">{copy.promptTitle}</p>
            </div>
            <div className="h-px bg-border/50" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {activeLocale === "en" ? "Subtitle" : "Sous-titre"}
              </span>
              <p className="text-sm text-foreground">{copy.promptSubtitle}</p>
            </div>
            <div className="h-px bg-border/50" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {activeLocale === "en" ? "Action Chips" : "Boutons d'Action"}
              </span>
              <div className="flex gap-2">
                {[copy.chipSale, copy.chipStock, copy.chipBalance].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-primary/20 px-3 py-1 text-xs font-semibold text-primary"
                    style={{ background: "hsl(216 100% 96%)" }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-px bg-border/50" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {activeLocale === "en" ? "States" : "Etats"}
              </span>
              <p className="text-sm text-primary font-semibold">{copy.listening}</p>
              <p className="text-sm text-muted-foreground">{copy.processing}</p>
              <p className="text-sm font-semibold" style={{ color: "hsl(152 87% 32%)" }}>{copy.transactionReady}</p>
            </div>
          </div>
        </section>

        {/* Dialog chrome */}
        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {activeLocale === "en" ? "Dialog Chrome" : "Elements du Dialogue"}
          </h2>
          <div
            className="flex flex-col gap-3 rounded-2xl border border-border/60 p-4"
            style={{ background: "hsl(220 20% 99%)" }}
          >
            <p className="text-sm font-bold text-foreground">{copy.dialogTitle}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{copy.dialogDescription}</p>
            <div className="flex gap-2">
              <span className="flex h-10 flex-1 items-center justify-center rounded-xl border border-border/60 text-xs font-semibold text-foreground" style={{ background: "hsl(220 20% 99%)" }}>
                {copy.cancelButton}
              </span>
              <span className="flex h-10 flex-1 items-center justify-center rounded-xl bg-primary text-xs font-semibold text-[hsl(0_0%_100%)]">
                {copy.confirmButton}
              </span>
            </div>
            <p className="text-center text-[10px] text-muted-foreground">
              {activeLocale === "en" ? "Loading state:" : "Etat de chargement :"} <span className="font-semibold">{copy.confirmingButton}</span>
            </p>
          </div>
        </section>

        {/* Per-action confirmations */}
        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {activeLocale === "en" ? "Action Confirmations" : "Confirmations par Action"}
          </h2>
          <div className="flex flex-col gap-4">
            {actions.map((action) => (
              <CopyCard key={action.key} locale={activeLocale} action={action} />
            ))}
          </div>
        </section>

        {/* Side-by-side comparison */}
        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Side-by-Side Comparison
          </h2>
          <div className="flex flex-col gap-4">
            {actions.map((action) => {
              const enCopy = getVoiceCopy("en")
              const frCopy = getVoiceCopy("fr")
              const enFilled = fillTemplate(
                enCopy.confirmations[action.key].template,
                action.sampleValues,
              )
              const frFilled = fillTemplate(
                frCopy.confirmations[action.key].template,
                action.sampleValues,
              )
              return (
                <div
                  key={action.key}
                  className="rounded-2xl border border-border/60 overflow-hidden"
                  style={{ background: "hsl(220 20% 99%)" }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2.5">
                    <action.Icon className="h-4 w-4" style={{ color: action.color }} />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      {action.key}
                    </span>
                  </div>
                  {/* EN row */}
                  <div className="flex items-start gap-3 border-b border-border/30 px-4 py-3">
                    <span className="mt-0.5 shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                      EN
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{enFilled}</p>
                  </div>
                  {/* FR row */}
                  <div className="flex items-start gap-3 px-4 py-3">
                    <span className="mt-0.5 shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                      FR
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{frFilled}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
