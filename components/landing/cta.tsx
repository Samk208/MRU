"use client"

import React from "react"

import { useCallback, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

function MagneticButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
    },
    [],
  )

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    btn.style.transform = "translate(0, 0)"
  }, [])

  return (
    <Button
      ref={btnRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
      {...props}
    >
      {children}
    </Button>
  )
}

export function CTA() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "hsl(220 33% 98.4%)" }}
    >
      <div
        ref={ref}
        className={cn(
          "relative mx-auto max-w-4xl rounded-3xl bg-foreground px-6 py-12 text-center opacity-0 md:px-16 md:py-16",
          isVisible && "animate-scale-in",
        )}
      >
        {/* Background grid */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-[0.06]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 0.5px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <h2 className="relative text-balance text-3xl font-bold tracking-tight text-background md:text-4xl">
          Ready to grow your business with your voice?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg leading-relaxed text-background/70">
          Join hundreds of merchants across Liberia and Guinea who are already
          using MRU Merchant OS. Start for free today.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton
            size="lg"
            className="group gap-2 bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 hover:shadow-xl"
          >
            Get Started for Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            variant="outline"
            size="lg"
            className="gap-2 border-background/20 bg-transparent px-8 text-base font-semibold text-background hover:bg-background/10"
          >
            Talk to Sales
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
