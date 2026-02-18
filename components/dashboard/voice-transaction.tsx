"use client"

import {
  TransactionConfirmDialog,
  type TransactionSummary,
} from "@/components/dashboard/transaction-confirm-dialog"
import { useLocale } from "@/lib/i18n/locale-context"
import { getVoiceCopy } from "@/lib/i18n/voice-copy"
import { Check, ChevronLeft, Loader2, Mic, X } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

type RecordingState = "idle" | "listening" | "processing" | "confirmed"

import { parseTransaction } from "@/app/dashboard/voice/actions"

// Browser Speech Recognition Types
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string
      }
    }
    length: number
  }
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: SpeechRecognitionErrorEvent) => void
  onend: () => void
}

declare global {
  interface Window {
    SpeechRecognition?: { new(): SpeechRecognition }
    webkitSpeechRecognition?: { new(): SpeechRecognition }
  }
}

function WaveformVisualizer({ active }: { active: boolean }) {
  const barCount = 32
  return (
    <div
      className="flex h-16 items-center justify-center gap-[3px]"
      role="img"
      aria-label={active ? "Voice activity detected" : "Waiting for voice input"}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const delay = `${(i * 60) % 800}ms`
        const baseHeight = Math.sin((i / barCount) * Math.PI) * 100
        return (
          <div
            key={i}
            className="w-[3px] rounded-full transition-all duration-300"
            style={{
              height: active ? `${Math.max(baseHeight, 16)}%` : "12%",
              background: active
                ? `hsl(216 100% ${50 + Math.sin(i * 0.4) * 15}%)`
                : "hsl(216 12% 85%)",
              animation: active
                ? `waveBar ${600 + Math.random() * 400}ms ease-in-out ${delay} infinite`
                : "none",
              transformOrigin: "center",
            }}
          />
        )
      })}
    </div>
  )
}

function TranscriptionArea({
  lines,
  isTyping,
  copy,
}: {
  lines: string[]
  isTyping: boolean
  copy: ReturnType<typeof getVoiceCopy>
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div
      ref={scrollRef}
      className="relative min-h-[120px] w-full overflow-y-auto rounded-2xl border border-border/60 p-4"
      style={{ background: "hsl(220 20% 99%)" }}
      role="log"
      aria-live="polite"
      aria-label="Voice transcription"
    >
      {lines.length === 0 && !isTyping ? (
        <p className="text-center text-sm text-muted-foreground">
          {copy.transcriptionPlaceholder}
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          {lines.map((line, i) => (
            <p
              key={i}
              className="text-base font-medium text-foreground leading-relaxed"
              style={{
                animation: "slideUpBounce 0.4s ease-out forwards",
              }}
            >
              {line}
            </p>
          ))}
          {isTyping && (
            <span
              className="inline-block h-5 w-[2px] bg-primary"
              style={{ animation: "cursorBlink 1s step-end infinite" }}
            />
          )}
        </div>
      )}
    </div>
  )
}

function ParsedSummary({ copy, summary }: { copy: ReturnType<typeof getVoiceCopy>, summary: any }) {
  return (
    <div
      className="w-full rounded-2xl border border-[hsl(152_50%_85%)] p-4"
      style={{
        background: "hsl(152 50% 97%)",
        animation: "slideUpBounce 0.5s ease-out forwards",
      }}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[hsl(152_87%_32%)]">
        {copy.parsedLabel}
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {copy?.itemLabel && <span>{copy.itemLabel}</span>}
          <span className="text-sm font-semibold text-foreground">
            {summary?.item || "..."}
          </span>
        </div>
        <div className="h-px bg-border/60" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{copy.amountLabel}</span>
          <span className="text-sm font-semibold text-foreground">
            {summary?.amount || "..."}
          </span>
        </div>
        <div className="h-px bg-border/60" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{copy.customerLabel}</span>
          <span className="text-sm font-semibold text-foreground">
            {summary?.customer || "..."}
          </span>
        </div>
      </div>
    </div>
  )
}

export function VoiceTransaction() {
  const [state, setState] = useState<RecordingState>("idle")
  const [transcriptLines, setTranscriptLines] = useState<string[]>([])
  const [showParsed, setShowParsed] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [summary, setSummary] = useState<TransactionSummary | null>(null)
  const { locale } = useLocale()
  const copy = getVoiceCopy(locale)

  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const processTranscript = async (lines: string[]) => {
    setState("processing")
    const fullText = lines.join(" ")

    // Call server action
    const result = await parseTransaction(fullText)

    if (result.data) {
      setSummary({
        type: result.data.type,
        item: result.data.item,
        amount: result.data.amount,
        customer: result.data.customer || "Unknown",
        method: "Voice",
        tax: "Included" // Simplification
      })
      setShowParsed(true)
      setState("confirmed")
    } else {
      // Handle error (could add toast here)
      console.error(result.error)
      setState("idle")
    }
  }

  const startRecording = useCallback(() => {
    setState("listening")
    setTranscriptLines([])
    setShowParsed(false)
    setSummary(null)

    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition!()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = (event) => {
        const lines: string[] = []
        for (let i = 0; i < event.results.length; i++) {
          lines.push(event.results[i][0].transcript)
        }
        setTranscriptLines(lines)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setState("idle")
      }

      recognition.onend = () => {
        // If we stopped manually, state is already processing or idle
        // If it stopped automatically, we might want to process
      }

      recognitionRef.current = recognition
      recognition.start()
    } else {
      alert("Speech Recognition not supported in this browser. Try Chrome/Edge.")
      setState("idle")
    }

  }, [])

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    // Trigger processing with current lines
    if (transcriptLines.length > 0) {
      processTranscript(transcriptLines)
    } else {
      setState("idle")
    }
  }, [transcriptLines])

  const cancelRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setState("idle")
    setTranscriptLines([])
    setShowParsed(false)
  }, [])

  const confirmTransaction = useCallback(() => {
    setState("idle")
    setTranscriptLines([])
    setShowParsed(false)
  }, [])

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const isRecordingOrProcessing = state === "listening" || state === "processing"

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ background: "hsl(220 33% 98.4%)" }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-4 md:mx-auto md:max-w-lg md:px-0">
        <button
          type="button"
          onClick={cancelRecording}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 transition-colors hover:bg-secondary"
          style={{ background: "hsl(220 20% 99%)" }}
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Log Transaction</h1>
          <p className="text-xs text-muted-foreground">Speak to record a sale</p>
        </div>
      </div>

      {/* Main content area */}
      <main className="flex flex-1 flex-col items-center gap-6 px-4 pb-8 md:mx-auto md:max-w-lg md:px-0">
        {/* Status text */}
        <div className="flex flex-col items-center gap-1 text-center">
          {state === "idle" && (
            <p className="text-base font-medium text-muted-foreground leading-relaxed">
              {copy.promptSubtitle}
            </p>
          )}
          {state === "listening" && (
            <p className="text-base font-semibold text-primary">
              {copy.listening}
            </p>
          )}
          {state === "processing" && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <p className="text-base font-semibold text-primary">
                {copy.processing}
              </p>
            </div>
          )}
          {state === "confirmed" && (
            <p className="text-base font-semibold text-[hsl(152_87%_32%)]">
              {copy.transactionReady}
            </p>
          )}
        </div>

        {/* Prompt chips */}
        {state === "idle" && (
          <div
            className="flex flex-wrap items-center justify-center gap-2"
            style={{ animation: "slideUpBounce 0.5s ease-out forwards" }}
          >
            {[copy.chipSale, copy.chipStock, copy.chipBalance].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary"
                style={{ background: "hsl(216 100% 96%)" }}
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Microphone button */}
        <div className="relative flex items-center justify-center py-4">
          {/* Ripple rings when listening */}
          {state === "listening" && (
            <>
              <span
                className="absolute h-28 w-28 rounded-full bg-primary/20"
                style={{ animation: "rippleExpand 2s ease-out 0s infinite" }}
              />
              <span
                className="absolute h-28 w-28 rounded-full bg-primary/20"
                style={{ animation: "rippleExpand 2s ease-out 0.6s infinite" }}
              />
              <span
                className="absolute h-28 w-28 rounded-full bg-primary/20"
                style={{ animation: "rippleExpand 2s ease-out 1.2s infinite" }}
              />
            </>
          )}

          {/* Breathing glow when idle */}
          {state === "idle" && (
            <span
              className="absolute h-28 w-28 rounded-full"
              style={{ animation: "breatheGlow 3s ease-in-out infinite" }}
            />
          )}

          <button
            type="button"
            onClick={
              state === "idle"
                ? startRecording
                : isRecordingOrProcessing
                  ? stopRecording // Changed to stop instead of cancel to trigger processing
                  : undefined
            }
            disabled={state === "confirmed"}
            className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full shadow-lg transition-all duration-300 active:scale-95 ${state === "listening"
              ? "bg-destructive shadow-destructive/30"
              : state === "confirmed"
                ? "bg-[hsl(152_87%_38%)] shadow-[hsl(152_87%_38%)]/20"
                : "bg-primary shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
              }`}
            aria-label={
              state === "idle"
                ? "Start recording"
                : state === "listening"
                  ? "Stop recording"
                  : "Recording complete"
            }
          >
            {state === "listening" ? (
              <div className="h-6 w-6 rounded-sm bg-[hsl(0_0%_100%)]" />
            ) : state === "processing" ? (
              <Loader2 className="h-10 w-10 animate-spin text-[hsl(0_0%_100%)]" />
            ) : state === "confirmed" ? (
              <Check className="h-10 w-10 text-[hsl(0_0%_100%)]" />
            ) : (
              <Mic className="h-10 w-10 text-[hsl(0_0%_100%)]" />
            )}
          </button>
        </div>

        {/* Prompt text for idle state */}
        {state === "idle" && (
          <p className="text-center text-lg font-semibold text-foreground">
            {copy.promptTitle}
          </p>
        )}

        {/* Waveform visualizer */}
        {isRecordingOrProcessing && (
          <div className="w-full px-4">
            <WaveformVisualizer active={state === "listening"} />
          </div>
        )}

        {/* Transcription area */}
        {(isRecordingOrProcessing || state === "confirmed") && (
          <div className="w-full">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Transcription
            </p>
            <TranscriptionArea
              lines={transcriptLines}
              isTyping={state === "listening"}
              copy={copy}
            />
          </div>
        )}

        {/* Parsed transaction summary */}
        {showParsed && summary && <ParsedSummary copy={copy} summary={summary} />}

        {/* Action buttons */}
        {state === "confirmed" && (
          <div
            className="flex w-full gap-3"
            style={{ animation: "slideUpBounce 0.4s ease-out forwards" }}
          >
            <button
              type="button"
              onClick={cancelRecording}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-border/60 text-base font-semibold text-foreground transition-all hover:bg-secondary active:scale-[0.98]"
              style={{ background: "hsl(220 20% 99%)" }}
            >
              <X className="h-5 w-5" />
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmDialog(true)}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary text-base font-semibold text-[hsl(0_0%_100%)] shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
            >
              <Check className="h-5 w-5" />
              Confirm
            </button>
          </div>
        )}

        {/* Confirmation modal dialog */}
        <TransactionConfirmDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          summary={summary!}
          onConfirm={() => {
            setShowConfirmDialog(false)
            confirmTransaction()
          }}
          onCancel={() => {
            setShowConfirmDialog(false)
          }}
        />
      </main>
    </div>
  )
}
