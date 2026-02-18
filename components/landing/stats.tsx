"use client"

import { useEffect, useRef, useState } from "react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

interface StatItem {
  target: number
  suffix: string
  prefix: string
  label: string
}

const stats: StatItem[] = [
  { target: 500, suffix: "+", prefix: "", label: "Merchants Active" },
  { target: 50, suffix: "K+", prefix: "", label: "Transactions Processed" },
  { target: 98, suffix: "%", prefix: "", label: "Voice Accuracy" },
  { target: 2, suffix: " min", prefix: "", label: "Onboarding Time" },
]

function AnimatedCounter({
  target,
  suffix,
  prefix,
  isVisible,
}: {
  target: number
  suffix: string
  prefix: string
  isVisible: boolean
}) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 1800
    const startTime = performance.now()
    const easeOutExpo = (t: number) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isVisible, target])

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

export function Stats() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section ref={ref} className="border-y border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4 md:py-16 lg:px-8">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col items-center gap-1 text-center opacity-0",
              isVisible && "animate-count-pop",
            )}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <span className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                prefix={stat.prefix}
                isVisible={isVisible}
              />
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
