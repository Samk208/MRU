"use client"

import { useEffect, useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Package,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { useLocale } from "@/lib/i18n/locale-context"

/* ---------- i18n ---------- */

const copy = {
  en: {
    heading: "AI Insights",
    subheading: "Smart predictions based on your data",
    viewAll: "View details",
    dismiss: "Got it",
  },
  fr: {
    heading: "Insights IA",
    subheading: "Predictions intelligentes basees sur vos donnees",
    viewAll: "Voir details",
    dismiss: "Compris",
  },
} as const

/* ---------- insights data ---------- */

type InsightSeverity = "success" | "warning" | "danger" | "info"

interface Insight {
  id: string
  title: string
  titleFr: string
  description: string
  descriptionFr: string
  metric: string
  severity: InsightSeverity
  icon: "trending-up" | "trending-down" | "alert" | "package"
  actionLabel: string
  actionLabelFr: string
}

const insights: Insight[] = [
  {
    id: "sales-trend",
    title: "Sales Up 12% This Week",
    titleFr: "Ventes en hausse de 12% cette semaine",
    description:
      "Your sales are trending above last week. Rice and palm oil are your top sellers. Keep your stock levels up!",
    descriptionFr:
      "Vos ventes depassent la semaine derniere. Le riz et l'huile de palme sont vos meilleurs produits. Gardez votre stock a niveau !",
    metric: "+12%",
    severity: "success",
    icon: "trending-up",
    actionLabel: "View sales",
    actionLabelFr: "Voir les ventes",
  },
  {
    id: "float-warning",
    title: "Low MoMo Float Warning",
    titleFr: "Alerte : Float MoMo bas",
    description:
      "Your MTN MoMo float is 5% below last week and may run out by tomorrow at current transaction rates. Consider topping up today.",
    descriptionFr:
      "Votre float MTN MoMo est 5% en dessous de la semaine derniere et pourrait s'epuiser demain au rythme actuel. Pensez a recharger aujourd'hui.",
    metric: "-5%",
    severity: "warning",
    icon: "alert",
    actionLabel: "Top up float",
    actionLabelFr: "Recharger le float",
  },
  {
    id: "inventory-low",
    title: "3 Items Running Low",
    titleFr: "3 Articles en stock bas",
    description:
      "Rice (2 bags), Palm Oil (1 jug), and Bouillon (5 boxes) are below your reorder threshold. Restock soon to avoid missed sales.",
    descriptionFr:
      "Riz (2 sacs), Huile de palme (1 bidon) et Bouillon (5 boites) sont en dessous de votre seuil de reapprovisionnement.",
    metric: "3 items",
    severity: "danger",
    icon: "package",
    actionLabel: "Check inventory",
    actionLabelFr: "Verifier le stock",
  },
  {
    id: "payment-collection",
    title: "Pending Payments Aging",
    titleFr: "Paiements en attente vieillissants",
    description:
      "You have LRD 12,000 in pending payments. The oldest is 2 days. Sending reminders could improve your cash flow.",
    descriptionFr:
      "Vous avez 12 000 LRD de paiements en attente. Le plus ancien date de 2 jours. Envoyer des rappels pourrait ameliorer votre tresorerie.",
    metric: "LRD 12K",
    severity: "info",
    icon: "trending-down",
    actionLabel: "Send reminders",
    actionLabelFr: "Envoyer des rappels",
  },
]

/* ---------- severity config ---------- */

const severityConfig: Record<
  InsightSeverity,
  { color: string; bg: string; border: string; iconBg: string }
> = {
  success: {
    color: "hsl(152 87% 32%)",
    bg: "hsl(152 50% 97%)",
    border: "hsl(152 50% 88%)",
    iconBg: "hsl(152 50% 93%)",
  },
  warning: {
    color: "hsl(40 100% 40%)",
    bg: "hsl(40 70% 97%)",
    border: "hsl(40 70% 88%)",
    iconBg: "hsl(40 70% 92%)",
  },
  danger: {
    color: "hsl(4 89% 50%)",
    bg: "hsl(4 50% 97%)",
    border: "hsl(4 50% 90%)",
    iconBg: "hsl(4 50% 93%)",
  },
  info: {
    color: "hsl(216 100% 50%)",
    bg: "hsl(216 100% 97%)",
    border: "hsl(216 40% 90%)",
    iconBg: "hsl(216 100% 94%)",
  },
}

const iconMap = {
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  alert: AlertTriangle,
  package: Package,
}

/* ---------- component ---------- */

export function PredictiveInsights() {
  const { locale } = useLocale()
  const t = copy[locale]

  const [mounted, setMounted] = useState(false)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const visibleInsights = insights.filter((i) => !dismissed.has(i.id))

  if (visibleInsights.length === 0) return null

  return (
    <section aria-label="Predictive insights">
      {/* Section header */}
      <div className="mb-3 flex items-center gap-2">
        <div
          className="flex h-6 w-6 items-center justify-center rounded-md"
          style={{ background: "hsl(216 100% 96%)" }}
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="flex flex-1 flex-col">
          <h2 className="text-sm font-semibold text-foreground">
            {t.heading}
          </h2>
          <p className="text-[10px] text-muted-foreground">
            {t.subheading}
          </p>
        </div>
      </div>

      {/* Insight cards */}
      <div className="flex flex-col gap-3">
        {visibleInsights.map((insight, i) => {
          const sev = severityConfig[insight.severity]
          const Icon = iconMap[insight.icon]
          const isExpanded = expanded === insight.id

          return (
            <div
              key={insight.id}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                borderColor: sev.border,
                background: "hsl(220 20% 99%)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Severity accent bar */}
              <div
                className="absolute bottom-0 left-0 top-0 w-1.5 rounded-l-2xl"
                style={{ background: sev.color }}
              />

              {/* Main row -- always visible */}
              <button
                type="button"
                onClick={() =>
                  setExpanded(isExpanded ? null : insight.id)
                }
                className="flex w-full items-center gap-3 py-3.5 pl-5 pr-4 text-left"
                aria-expanded={isExpanded}
              >
                {/* Icon */}
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                  style={{ background: sev.iconBg }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: sev.color }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-sm font-bold text-foreground leading-snug">
                    {locale === "fr" ? insight.titleFr : insight.title}
                  </span>
                  {!isExpanded && (
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {locale === "fr"
                        ? insight.descriptionFr
                        : insight.description}
                    </span>
                  )}
                </div>

                {/* Metric badge */}
                <div
                  className="shrink-0 rounded-full px-2.5 py-1"
                  style={{ background: sev.bg }}
                >
                  <span
                    className="text-xs font-bold tabular-nums"
                    style={{ color: sev.color }}
                  >
                    {insight.metric}
                  </span>
                </div>
              </button>

              {/* Expanded description + actions */}
              {isExpanded && (
                <div
                  className="flex flex-col gap-3 border-t px-5 pb-4 pt-3"
                  style={{
                    borderColor: sev.border,
                    animation: "slideUpBounce 0.25s ease-out forwards",
                  }}
                >
                  <p className="text-[13px] text-foreground/80 leading-relaxed">
                    {locale === "fr"
                      ? insight.descriptionFr
                      : insight.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl text-xs font-semibold text-[hsl(0_0%_100%)] transition-all active:scale-[0.97]"
                      style={{ background: sev.color }}
                    >
                      {locale === "fr"
                        ? insight.actionLabelFr
                        : insight.actionLabel}
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDismissed(
                          (prev) => new Set([...prev, insight.id])
                        )
                      }}
                      className="flex h-9 items-center gap-1 rounded-xl border border-border/60 px-3 text-xs font-medium text-muted-foreground transition-all hover:text-foreground active:scale-[0.97]"
                      style={{ background: "hsl(220 20% 99%)" }}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {t.dismiss}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
