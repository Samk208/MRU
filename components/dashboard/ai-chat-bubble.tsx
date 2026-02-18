"use client"

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Loader2,
  Sparkles,
  ChevronDown,
} from "lucide-react"
import { useLocale } from "@/lib/i18n/locale-context"

/* ---------- i18n ---------- */

const copy = {
  en: {
    title: "MRU Assistant",
    subtitle: "Ask about sales, balance, float, or anything",
    inputPlaceholder: "Type a message...",
    voiceHint: "Tap to speak",
    listening: "Listening...",
    thinking: "Thinking...",
    poweredBy: "Powered by Claude, Gemini & Whisper",
    suggestions: [
      "What are my sales today?",
      "Check my MoMo balance",
      "Is my float low?",
      "Show pending payments",
    ],
  },
  fr: {
    title: "Assistant MRU",
    subtitle: "Demandez vos ventes, solde, float, ou autre",
    inputPlaceholder: "Tapez un message...",
    voiceHint: "Appuyez pour parler",
    listening: "J'ecoute...",
    thinking: "Je reflechis...",
    poweredBy: "Propulse par Claude, Gemini & Whisper",
    suggestions: [
      "Quelles sont mes ventes aujourd'hui ?",
      "Verifier mon solde MoMo",
      "Mon float est-il bas ?",
      "Paiements en attente",
    ],
  },
} as const

/* ---------- simulated responses ---------- */

function getSimulatedResponse(
  message: string,
  locale: "en" | "fr"
): string {
  const m = message.toLowerCase()

  if (locale === "fr") {
    if (m.includes("vente"))
      return "Aujourd'hui vous avez fait 7 ventes pour un total de 48 500 LRD. C'est 12% de plus que la semaine derniere. Continuez comme ca !"
    if (m.includes("solde") || m.includes("momo") || m.includes("balance"))
      return "Votre solde MTN MoMo est de 325 000 LRD. Votre solde Orange Money est de 180 000 LRD. Tout va bien !"
    if (m.includes("float"))
      return "Votre float MTN est a 325 000 LRD, c'est 5% en dessous de la semaine derniere. Pensez a recharger bientot."
    if (m.includes("paiement") || m.includes("attente"))
      return "Vous avez 3 paiements en attente d'un montant total de 12 000 LRD. Le plus ancien date de 2 jours."
    if (m.includes("stock") || m.includes("inventaire"))
      return "Vous avez 3 produits avec un stock bas : Riz (2 sacs restants), Huile de palme (1 bidon), et Bouillon (5 boites)."
    return "J'ai bien compris votre question. Sur la base de vos donnees, tout semble en ordre. Que voulez-vous savoir d'autre ?"
  }

  if (m.includes("sale"))
    return "Today you've made 7 sales totalling LRD 48,500. That's 12% up from last week. Great job, keep it up!"
  if (m.includes("balance") || m.includes("momo"))
    return "Your MTN MoMo balance is LRD 325,000. Your Orange Money balance is LRD 180,000. All looking healthy!"
  if (m.includes("float"))
    return "Your MTN float is at LRD 325,000, which is 5% below last week. Consider topping up soon."
  if (m.includes("pending") || m.includes("payment"))
    return "You have 3 pending payments totalling LRD 12,000. The oldest is 2 days old."
  if (m.includes("stock") || m.includes("inventory"))
    return "You have 3 items running low: Rice (2 bags left), Palm Oil (1 jug), and Bouillon (5 boxes)."
  return "I understand your question. Based on your data, everything looks on track. What else would you like to know?"
}

/* ---------- types ---------- */

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

/* ---------- component ---------- */

export function AIChatBubble() {
  const { locale } = useLocale()
  const t = copy[locale]

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isVoice, setIsVoice] = useState(false)
  const [voiceActive, setVoiceActive] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* auto-scroll on new message */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  /* focus input when opened */
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setShowSuggestions(false)
      setIsTyping(true)

      /* simulate AI response */
      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: getSimulatedResponse(text, locale),
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMsg])
        setIsTyping(false)
      }, 1200 + Math.random() * 800)
    },
    [locale]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  /* voice recording simulation */
  const toggleVoice = () => {
    if (voiceActive) {
      setVoiceActive(false)
      setIsVoice(false)
      /* simulate transcription */
      const demoQueries =
        locale === "fr"
          ? [
              "Quelles sont mes ventes aujourd'hui ?",
              "Verifier mon solde MoMo",
            ]
          : ["What are my sales today?", "Check my MoMo balance"]
      const randomQuery =
        demoQueries[Math.floor(Math.random() * demoQueries.length)]
      sendMessage(randomQuery)
    } else {
      setVoiceActive(true)
      setIsVoice(true)
      /* auto-stop after 3 seconds */
      setTimeout(() => {
        setVoiceActive(false)
        setIsVoice(false)
        const demoQueries =
          locale === "fr"
            ? ["Mon float est-il bas ?", "Paiements en attente"]
            : ["Is my float low?", "Show pending payments"]
        const randomQuery =
          demoQueries[Math.floor(Math.random() * demoQueries.length)]
        sendMessage(randomQuery)
      }, 2500)
    }
  }

  const formatTime = (d: Date) =>
    d.toLocaleTimeString(locale === "fr" ? "fr-FR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-4 z-[60] flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border/60 shadow-2xl shadow-primary/10 md:bottom-6 md:right-6"
          style={{
            background: "hsl(220 33% 98.4%)",
            height: "min(540px, calc(100vh - 140px))",
            animation: "scaleIn 0.25s ease-out forwards",
            transformOrigin: "bottom right",
          }}
        >
          {/* Header */}
          <div className="relative flex shrink-0 items-center gap-3 px-4 py-3.5 text-[hsl(0_0%_100%)]"
            style={{
              background: "linear-gradient(135deg, hsl(216 100% 50%) 0%, hsl(216 100% 40%) 100%)",
            }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(0_0%_100%/0.2)]">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-bold">{t.title}</span>
              <span className="text-[11px] text-[hsl(0_0%_100%/0.7)]">
                {t.subtitle}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(0_0%_100%/0.15)] transition-colors hover:bg-[hsl(0_0%_100%/0.25)] active:scale-95"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages area */}
          <div
            ref={scrollRef}
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "hsl(216 100% 96%)" }}
                >
                  <Bot className="h-7 w-7 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-foreground">
                    {t.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t.subtitle}
                  </p>
                </div>
              </div>
            )}

            {/* Suggestion chips */}
            {showSuggestions && messages.length === 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {t.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Message list */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
                style={{ animation: "slideUpBounce 0.3s ease-out forwards" }}
              >
                {/* Avatar */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[hsl(0_0%_100%)] ${
                    msg.role === "assistant"
                      ? "bg-primary"
                      : "bg-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="h-3.5 w-3.5" />
                  ) : (
                    <User className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${
                    msg.role === "user"
                      ? "rounded-br-md bg-primary text-[hsl(0_0%_100%)]"
                      : "rounded-bl-md border border-border/60"
                  }`}
                  style={
                    msg.role === "assistant"
                      ? { background: "hsl(220 20% 99%)" }
                      : undefined
                  }
                >
                  <p
                    className={`text-[13px] leading-relaxed ${
                      msg.role === "assistant"
                        ? "text-foreground"
                        : "text-[hsl(0_0%_100%)]"
                    }`}
                  >
                    {msg.content}
                  </p>
                  <p
                    className={`mt-1 text-[10px] ${
                      msg.role === "user"
                        ? "text-[hsl(0_0%_100%/0.6)] text-right"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2"
                style={{ animation: "fadeIn 0.3s ease-out forwards" }}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-[hsl(0_0%_100%)]">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div
                  className="flex gap-1 rounded-2xl rounded-bl-md border border-border/60 px-4 py-3"
                  style={{ background: "hsl(220 20% 99%)" }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="block h-2 w-2 rounded-full bg-primary/40"
                      style={{
                        animation: `waveBar 1s ease-in-out ${i * 150}ms infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Powered by label */}
          <div className="flex justify-center border-t border-border/40 py-1.5">
            <span className="text-[9px] font-medium text-muted-foreground/50">
              {t.poweredBy}
            </span>
          </div>

          {/* Input area */}
          <div className="shrink-0 border-t border-border/60 px-3 py-2.5"
            style={{ background: "hsl(220 20% 99%)" }}
          >
            {/* Voice active state */}
            {voiceActive && (
              <div
                className="mb-2 flex items-center justify-center gap-2 rounded-xl py-2"
                style={{
                  background: "hsl(216 100% 96%)",
                  animation: "fadeIn 0.2s ease-out forwards",
                }}
              >
                {/* Mini waveform */}
                <div className="flex h-5 items-end gap-[2px]">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={i}
                      className="block w-[3px] rounded-full bg-primary"
                      style={{
                        height: "100%",
                        animation: `waveBar ${0.6 + Math.random() * 0.4}s ease-in-out ${i * 50}ms infinite`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-primary">
                  {t.listening}
                </span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2"
            >
              {/* Voice toggle */}
              <button
                type="button"
                onClick={toggleVoice}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 active:scale-90 ${
                  voiceActive
                    ? "bg-destructive text-[hsl(0_0%_100%)]"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
                aria-label={voiceActive ? "Stop recording" : "Start voice input"}
              >
                {voiceActive ? (
                  <MicOff className="h-4.5 w-4.5" />
                ) : (
                  <Mic className="h-4.5 w-4.5" />
                )}
              </button>

              {/* Text input */}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  voiceActive ? t.voiceHint : t.inputPlaceholder
                }
                disabled={voiceActive}
                className="h-10 flex-1 rounded-xl border border-border/60 bg-background px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
              />

              {/* Send */}
              <button
                type="submit"
                disabled={!input.trim() || voiceActive}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-[hsl(0_0%_100%)] transition-all duration-200 hover:bg-primary/90 active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Send message"
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating trigger bubble */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`fixed bottom-20 right-4 z-[60] flex items-center justify-center rounded-full shadow-xl transition-all duration-300 active:scale-90 md:bottom-6 md:right-6 ${
          open
            ? "h-0 w-0 scale-0 opacity-0"
            : "h-14 w-14 scale-100 opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(135deg, hsl(216 100% 50%) 0%, hsl(216 100% 40%) 100%)",
          animation: open ? undefined : "breatheGlow 3s ease-in-out infinite",
        }}
        aria-label="Open AI chat assistant"
      >
        <MessageSquare className="h-6 w-6 text-[hsl(0_0%_100%)]" />

        {/* Notification dot */}
        {!open && messages.length === 0 && (
          <span
            className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-[hsl(220_20%_99%)]"
            style={{ background: "hsl(4 89% 55%)" }}
          />
        )}
      </button>
    </>
  )
}
