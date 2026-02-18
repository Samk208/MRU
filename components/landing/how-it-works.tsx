"use client"

import { MessageSquare, Mic, CheckCircle2 } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Open WhatsApp",
    description:
      "Simply message the MRU Merchant OS WhatsApp number. No app to install, no account to create.",
  },
  {
    number: "02",
    icon: Mic,
    title: "Speak Your Action",
    description:
      'Say things like "I sold 4 bags of rice at $12 each" or "Check my balance" in English or French.',
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Confirm & Done",
    description:
      "Our AI pipeline — Whisper for speech, Claude and Gemini for understanding — processes your voice, shows a summary, and logs it once you confirm. It takes seconds.",
  },
]

export function HowItWorks() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "mx-auto mb-12 max-w-2xl text-center opacity-0 md:mb-16",
            isVisible && "animate-fade-up",
          )}
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            How It Works
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            No training needed. If you can speak, you can use MRU Merchant OS.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={cn(
                "relative flex flex-col items-center text-center opacity-0",
                isVisible && "animate-fade-up",
              )}
              style={{ animationDelay: `${200 + i * 200}ms` }}
            >
              {/* Animated connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+40px)] top-10 hidden h-px overflow-hidden md:block" style={{ width: "calc(100% - 80px)" }}>
                  <div
                    className={cn(
                      "h-full bg-primary/30",
                      isVisible && "animate-line-draw",
                    )}
                    style={{ animationDelay: `${600 + i * 400}ms` }}
                  />
                </div>
              )}

              {/* Icon circle */}
              <div
                className={cn(
                  "relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[hsl(220_20%_99%)] shadow-md transition-all duration-500",
                  isVisible && "hover:shadow-lg hover:shadow-primary/10",
                )}
              >
                <step.icon className="h-8 w-8 text-primary" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md">
                  {step.number}
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="max-w-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
