"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRight, Play, Mic, Smartphone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [loaded, setLoaded] = useState(false)
  const phoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLoaded(true)
  }, [])

  // Parallax on scroll for phone mockup
  useEffect(() => {
    const onScroll = () => {
      if (!phoneRef.current) return
      const y = window.scrollY
      phoneRef.current.style.transform = `translateY(${y * 0.08}px)`
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const headlineWords = [
    { text: "Voice-First", highlight: false },
    { text: "Commerce", highlight: false },
    { text: "&", highlight: true },
    { text: "Mobile", highlight: true },
    { text: "Money", highlight: true },
    { text: "for", highlight: false },
    { text: "Everyday", highlight: false },
    { text: "Merchants", highlight: false },
  ]

  return (
    <section
      id="home"
      className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20"
      style={{
        background:
          "linear-gradient(180deg, hsl(216 60% 97%) 0%, hsl(220 33% 98.4%) 60%, hsl(220 33% 98.4%) 100%)",
      }}
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(216 100% 50%) 0.5px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      {/* Decorative radial glow */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, hsl(216 100% 50%), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 lg:flex-row lg:gap-16 lg:px-8">
        {/* Left Content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          {/* Badge */}
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-700 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
            Now available in Liberia & Guinea
          </div>

          {/* Headline with word-by-word blur reveal */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className={`inline-block opacity-0 ${loaded ? "animate-word-reveal" : ""} ${
                  word.highlight ? "text-primary" : ""
                } stagger-${i + 1}`}
                style={{ marginRight: "0.3em" }}
              >
                {word.text}
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p
            className={`mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground transition-all delay-700 duration-700 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            Record sales, accept mobile money payments, and track your business
            — all using just your voice on WhatsApp. Powered by OpenAI Whisper,
            Claude, and Gemini. No app download. No literacy required.
          </p>

          {/* CTAs */}
          <div
            className={`mt-8 flex flex-col gap-3 transition-all delay-[900ms] duration-700 sm:flex-row ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <Button
              size="lg"
              className="group gap-2 bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              Get Started for Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group gap-2 border-border bg-transparent px-8 text-base font-semibold text-foreground transition-all hover:bg-secondary"
            >
              <Play className="h-4 w-4 fill-primary text-primary transition-transform group-hover:scale-110" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Row */}
          <div
            className={`mt-10 flex flex-wrap items-center justify-center gap-6 transition-all delay-[1100ms] duration-700 lg:justify-start ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span>Bank-level security</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Smartphone className="h-4 w-4 text-primary" />
              <span>Works on any phone</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">500+</span>{" "}
              merchants onboarded
            </div>
          </div>
        </div>

        {/* Right Visual — Parallax phone mockup */}
        <div
          ref={phoneRef}
          className={`relative flex flex-1 items-center justify-center will-change-transform transition-all delay-500 duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          {/* Decorative rings */}
          <div className="absolute h-72 w-72 rounded-full border border-primary/10 md:h-96 md:w-96" />
          <div className="absolute h-56 w-56 rounded-full border border-primary/20 md:h-72 md:w-72" />

          {/* Phone frame */}
          <div className="relative z-10 w-64 rounded-3xl border-2 border-foreground/10 bg-[hsl(220_20%_99%)] p-4 shadow-2xl md:w-72">
            {/* Status bar */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                9:41 AM
              </span>
              <div className="flex gap-1">
                <div className="h-1.5 w-3 rounded-sm bg-muted-foreground/40" />
                <div className="h-1.5 w-3 rounded-sm bg-muted-foreground/40" />
                <div className="h-1.5 w-3 rounded-sm bg-muted-foreground/40" />
              </div>
            </div>

            {/* Chat header */}
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-primary/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Mic className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  MRU Assistant
                </p>
                <p className="text-xs text-[hsl(var(--success))]">Online</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex flex-col gap-3">
              {/* User voice message */}
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Mic className="h-3.5 w-3.5 text-primary-foreground/80" />
                  <div className="flex gap-0.5">
                    {[3, 5, 2, 6, 4, 7, 3, 5, 2, 4, 6, 3].map((h, i) => (
                      <div
                        key={i}
                        className="w-0.5 rounded-full bg-primary-foreground/70"
                        style={{ height: `${h * 2.5}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-primary-foreground/80">
                    0:04
                  </span>
                </div>
              </div>

              {/* Bot response */}
              <div className="mr-auto max-w-[85%] rounded-2xl rounded-bl-md bg-secondary px-4 py-2.5">
                <p className="text-sm text-foreground">
                  Logged{" "}
                  <span className="font-semibold">3 bags of rice</span> at{" "}
                  <span className="font-semibold">$12 each</span>. Confirm?
                </p>
              </div>

              {/* Confirm button */}
              <div className="mr-auto flex gap-2">
                <div className="rounded-full bg-[hsl(var(--success))] px-4 py-1.5 text-xs font-semibold text-[hsl(220_20%_99%)]">
                  Confirm
                </div>
                <div className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
                  Edit
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-secondary p-2">
              <div className="flex-1 pl-2 text-xs text-muted-foreground">
                Tap to speak...
              </div>
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <Mic className="h-4 w-4 text-primary-foreground" />
                <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="absolute -left-4 top-8 animate-float rounded-xl border border-border bg-[hsl(220_20%_99%)] p-3 shadow-lg md:-left-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--success))]/10">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[hsl(var(--success))]"
                >
                  <path
                    d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  +$36.00
                </p>
                <p className="text-[10px] text-muted-foreground">Sale logged</p>
              </div>
            </div>
          </div>

          <div
            className="absolute -right-4 bottom-16 animate-float rounded-xl border border-border bg-[hsl(220_20%_99%)] p-3 shadow-lg md:-right-8"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Smartphone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  MTN MoMo
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Payment received
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
