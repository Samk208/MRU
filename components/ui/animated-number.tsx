"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedNumberProps {
  value: string
  duration?: number
  className?: string
}

export function AnimatedNumber({
  value,
  duration = 1200,
  className,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState("0")
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    const numericValue = Number.parseInt(value.replace(/,/g, ""), 10)
    const steps = 30
    const stepTime = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += 1
      const progress = current / steps
      const eased = 1 - (1 - progress) ** 3
      const val = Math.round(numericValue * eased)
      setDisplay(val.toLocaleString())
      if (current >= steps) {
        clearInterval(timer)
        setDisplay(value)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
