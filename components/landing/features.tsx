"use client"

import React from "react"

import { useCallback, useRef } from "react"
import { Mic, Smartphone, FileText, ArrowRight } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Mic,
    title: "Voice Transactions",
    description:
      "Speak your sales, inventory, and expenses naturally. Powered by OpenAI Whisper, Anthropic Claude, and Google Gemini — our AI understands English and French, even in noisy market conditions.",
    details: [
      "Multi-model AI: Whisper, Claude & Gemini",
      "Works in noisy environments",
      "English & French support",
    ],
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: Smartphone,
    title: "Mobile Payments",
    description:
      "Accept MTN MoMo and Orange Money directly through WhatsApp. Integrated via official mobile money APIs. No POS terminal needed — just your phone.",
    details: [
      "MTN MoMo & Orange Money APIs",
      "Instant settlement alerts",
      "Float balance tracking",
    ],
    accent: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  },
  {
    icon: FileText,
    title: "Tax-Ready Ledger",
    description:
      "Every transaction is automatically logged, categorized, and tax-ready. VAT and withholding calculations built in.",
    details: [
      "Automatic VAT calculations",
      "Exportable ledger reports",
      "Powered by Supabase PostgreSQL",
    ],
    accent: "bg-accent/10 text-accent",
  },
]

function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)"
  }, [])

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export function Features() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section
      id="features"
      className="relative py-16 md:py-24"
      style={{
        background:
          "linear-gradient(180deg, hsl(220 33% 98.4%) 0%, hsl(216 25% 96.5%) 50%, hsl(220 33% 98.4%) 100%)",
      }}
    >
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "mx-auto mb-12 max-w-2xl text-center opacity-0 md:mb-16",
            isVisible && "animate-fade-up",
          )}
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Features
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything you need to run your business
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Built for how you actually work — by voice, on your phone, in the
            market.
          </p>
        </div>

        {/* Feature Cards with 3D tilt */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {features.map((feature, i) => (
            <TiltCard
              key={feature.title}
              className={cn(
                "group relative cursor-default rounded-2xl border border-border bg-[hsl(220_20%_99%)] p-6 opacity-0 shadow-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 md:p-8",
                isVisible && "animate-fade-up",
              )}
              style={{ animationDelay: `${200 + i * 150}ms` }}
            >
              {/* Shimmer sweep on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-shimmer" />

              {/* Icon */}
              <div
                className={cn(
                  "relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  feature.accent,
                )}
              >
                <feature.icon className="h-6 w-6" />
              </div>

              <h3 className="relative mb-3 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="relative mb-5 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>

              {/* Detail list */}
              <ul className="relative flex flex-col gap-2.5">
                {feature.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Hover arrow */}
              <div className="relative mt-6 flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
