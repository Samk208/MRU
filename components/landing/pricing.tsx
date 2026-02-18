"use client"

import React from "react"

import { useCallback, useRef } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for getting started with voice commerce.",
    features: [
      "AI voice sales logging",
      "Up to 50 transactions/month",
      "Basic ledger reports",
      "English & French support",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$5",
    period: "/month",
    description: "For active merchants who need full-featured tools.",
    features: [
      "Unlimited transactions",
      "MTN MoMo & Orange Money APIs",
      "Digital storefront",
      "Tax-ready Supabase ledger",
      "Float tracking",
      "Priority WhatsApp support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Agent Pro",
    price: "$12",
    period: "/month",
    description: "Built for mobile money agents & wholesalers.",
    features: [
      "Everything in Business",
      "Multi-SIM float management",
      "Commission tracking",
      "Advanced AI analytics",
      "Team access (Supabase RBAC)",
      "Dedicated support line",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

function TiltPricingCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -4
      const rotateY = ((x - centerX) / centerX) * 4
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`
    },
    [],
  )

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)"
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

export function Pricing() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section id="pricing" className="bg-secondary/50 py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "mx-auto mb-12 max-w-2xl text-center opacity-0 md:mb-16",
            isVisible && "animate-fade-up",
          )}
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Pricing
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Start free. Upgrade when you grow. No hidden fees.
          </p>
        </div>

        {/* Plans with tilt */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {plans.map((plan, i) => (
            <TiltPricingCard
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 opacity-0 md:p-8",
                plan.highlighted
                  ? "border-primary bg-[hsl(220_20%_99%)] shadow-xl shadow-primary/10"
                  : "border-border bg-[hsl(220_20%_99%)]",
                isVisible && "animate-fade-up",
              )}
              style={{ animationDelay: `${200 + i * 150}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Check className="h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full transition-all",
                  plan.highlighted
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl"
                    : "border-primary text-primary hover:bg-primary/5",
                )}
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </TiltPricingCard>
          ))}
        </div>
      </div>
    </section>
  )
}
