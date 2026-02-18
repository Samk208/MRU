"use client"

import { Star } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Kadiatou Diallo",
    role: "Market Merchant, Conakry",
    quote:
      "I cannot read well, but I can talk. MRU lets me track every sale with my voice. My business has never been this organized.",
    rating: 5,
    initials: "KD",
  },
  {
    name: "Emmanuel Kollie",
    role: "Mobile Money Agent, Monrovia",
    quote:
      "I used to lose track of my float across two SIMs. Now I just say 'check my balance' and everything is there. It saves me real money.",
    rating: 5,
    initials: "EK",
  },
  {
    name: "Mariama Camara",
    role: "Wholesaler, Nzerekore",
    quote:
      "My customers can see my products on my shop page and order through WhatsApp. I get more orders now, even from far away.",
    rating: 5,
    initials: "MC",
  },
]

export function Testimonials() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section
      id="about"
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
            Testimonials
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Trusted by merchants across West Africa
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Hear from the people who use MRU Merchant OS every day.
          </p>
        </div>

        {/* Testimonial Cards — alternating slide directions */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((t, i) => {
            const animClass =
              i === 0
                ? "animate-slide-in-left"
                : i === 2
                  ? "animate-slide-in-right"
                  : "animate-fade-up"

            return (
              <div
                key={t.name}
                className={cn(
                  "flex flex-col rounded-2xl border border-border bg-[hsl(220_20%_99%)] p-6 opacity-0 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5 md:p-8",
                  isVisible && animClass,
                )}
                style={{ animationDelay: `${200 + i * 150}ms` }}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mb-6 flex-1 text-base leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
