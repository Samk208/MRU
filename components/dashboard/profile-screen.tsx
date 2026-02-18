"use client"

import { useEffect, useState } from "react"
import {
  ArrowLeft,
  ChevronRight,
  Globe,
  Bell,
  BellOff,
  Smartphone,
  Headphones,
  FileText,
  Shield,
  LogOut,
  CheckCircle2,
  AlertCircle,
  User,
  Store,
  Languages,
  MessageSquare,
  Mail,
  Share2,
  Link2,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { BottomNav } from "./bottom-nav"
import { useLocale } from "@/lib/i18n/locale-context"

/* ---------- types ---------- */

interface ToggleState {
  pushSales: boolean
  pushPayments: boolean
  pushPromos: boolean
  smsAlerts: boolean
  whatsappRecap: boolean
}

interface ProviderConnection {
  name: string
  shortName: string
  logo: string
  brandColor: string
  brandBg: string
  brandDark: string
  connected: boolean
  phone: string
}

/* ---------- data ---------- */

const merchantInfo = {
  name: "Kadiatou Bah",
  initials: "KB",
  businessName: "Kadiatou's General Store",
  businessType: "Retail / General Goods",
  phone: "+231 77 123 4567",
  email: "kadiatou@mru.app",
  location: "Waterside Market, Monrovia",
  memberSince: "January 2025",
}

const providerConnections: ProviderConnection[] = [
  {
    name: "MTN Mobile Money",
    shortName: "MTN MoMo",
    logo: "M",
    brandColor: "#FFCC00",
    brandBg: "hsl(48 100% 95%)",
    brandDark: "hsl(48 100% 35%)",
    connected: true,
    phone: "+231 77 123 4567",
  },
  {
    name: "Orange Money",
    shortName: "Orange Money",
    logo: "O",
    brandColor: "#FF6600",
    brandBg: "hsl(24 100% 96%)",
    brandDark: "hsl(24 100% 40%)",
    connected: false,
    phone: "",
  },
]

interface SocialPlatform {
  id: string
  name: string
  color: string
  bg: string
  darkColor: string
  icon: "facebook" | "instagram" | "tiktok" | "x"
  connected: boolean
  handle: string
}

const initialSocialPlatforms: SocialPlatform[] = [
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877F2",
    bg: "hsl(214 89% 96%)",
    darkColor: "hsl(214 89% 52%)",
    icon: "facebook",
    connected: true,
    handle: "Kadiatou's General Store",
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "#E4405F",
    bg: "hsl(340 75% 96%)",
    darkColor: "hsl(340 75% 48%)",
    icon: "instagram",
    connected: false,
    handle: "",
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#000000",
    bg: "hsl(0 0% 94%)",
    darkColor: "hsl(0 0% 20%)",
    icon: "tiktok",
    connected: false,
    handle: "",
  },
  {
    id: "x",
    name: "X (Twitter)",
    color: "#000000",
    bg: "hsl(0 0% 94%)",
    darkColor: "hsl(0 0% 20%)",
    icon: "x",
    connected: false,
    handle: "",
  },
]

const supportLinks = [
  {
    label: "Help Center",
    description: "Find answers to common questions",
    Icon: Headphones,
    href: "#",
  },
  {
    label: "WhatsApp Support",
    description: "Chat with our team",
    Icon: MessageSquare,
    href: "#",
  },
  {
    label: "Terms of Service",
    description: "Read our legal terms",
    Icon: FileText,
    href: "#",
  },
  {
    label: "Privacy Policy",
    description: "How we protect your data",
    Icon: Shield,
    href: "#",
  },
]

/* ---------- sub-components ---------- */

function SocialIcon({ platform, size = 16 }: { platform: "facebook" | "instagram" | "tiktok" | "x"; size?: number }) {
  switch (platform) {
    case "facebook":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    case "instagram":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
        </svg>
      )
    case "tiktok":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      )
    case "x":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
  }
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {title}
    </h3>
  )
}

function ToggleSwitch({
  id,
  checked,
  onChange,
  label,
  description,
  Icon,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description?: string
  Icon: typeof Bell
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{ background: "hsl(216 20% 95.5%)" }}
      >
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <label htmlFor={id} className="flex flex-1 cursor-pointer flex-col">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
          checked ? "bg-primary" : "bg-[hsl(216_12%_82%)]"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full shadow-sm transition-transform duration-300 ${
            checked
              ? "translate-x-6 bg-[hsl(0_0%_100%)]"
              : "translate-x-1 bg-[hsl(0_0%_100%)]"
          }`}
        />
      </button>
    </div>
  )
}

/* ---------- main component ---------- */

export function ProfileScreen() {
  const [mounted, setMounted] = useState(false)
  const { locale: language, setLocale: setLanguage } = useLocale()
  const [toggles, setToggles] = useState<ToggleState>({
    pushSales: true,
    pushPayments: true,
    pushPromos: false,
    smsAlerts: true,
    whatsappRecap: true,
  })
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileName, setProfileName] = useState(merchantInfo.name)
  const [businessType, setBusinessType] = useState(merchantInfo.businessType)
  const [socials, setSocials] = useState<SocialPlatform[]>(initialSocialPlatforms)
  const [connectingId, setConnectingId] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  function updateToggle(key: keyof ToggleState) {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function toggleSocial(id: string) {
    setConnectingId(id)
    setTimeout(() => {
      setSocials((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                connected: !s.connected,
                handle: !s.connected ? `@kadiatou_${s.id}` : "",
              }
            : s
        )
      )
      setConnectingId(null)
    }, 1200)
  }

  const delay = (i: number) => `${150 + i * 80}ms`

  return (
    <div
      className="relative flex min-h-screen flex-col pb-20"
      style={{ background: "hsl(220 33% 98.4%)" }}
    >
      {/* ---- top bar ---- */}
      <header
        className="sticky top-0 z-40 border-b border-border/60"
        style={{
          background: "hsl(220 33% 98.4% / 0.9)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link
            href="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-secondary"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-lg font-bold text-foreground">
            Settings
          </h1>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-4 py-5 md:mx-auto md:max-w-lg md:px-0">
        {/* ==== MERCHANT INFO ==== */}
        <section
          className={`transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: delay(0) }}
        >
          <SectionHeader title="Merchant Profile" />

          <div
            className="overflow-hidden rounded-2xl border border-border/60"
            style={{ background: "hsl(220 20% 99%)" }}
          >
            {/* Avatar + name banner */}
            <div
              className="flex items-center gap-4 px-5 py-5"
              style={{
                background:
                  "linear-gradient(135deg, hsl(216 100% 50%) 0%, hsl(216 100% 40%) 100%)",
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(0_0%_100%/0.2)] text-xl font-black text-[hsl(0_0%_100%)]">
                {merchantInfo.initials}
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-lg font-bold text-[hsl(0_0%_100%)]">
                  {merchantInfo.name}
                </span>
                <span className="text-sm text-[hsl(0_0%_100%/0.8)]">
                  {merchantInfo.businessName}
                </span>
                <span className="mt-0.5 text-xs text-[hsl(0_0%_100%/0.6)]">
                  Member since {merchantInfo.memberSince}
                </span>
              </div>
            </div>

            {/* Editable fields */}
            <div className="flex flex-col gap-0 divide-y divide-border/50 px-5">
              {/* Name */}
              <div className="flex items-center gap-3 py-3.5">
                <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex flex-1 flex-col">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Full Name
                  </span>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="mt-0.5 rounded-lg border border-border bg-background px-2 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                      aria-label="Full name"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-foreground">
                      {profileName}
                    </span>
                  )}
                </div>
              </div>

              {/* Business type */}
              <div className="flex items-center gap-3 py-3.5">
                <Store className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex flex-1 flex-col">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Business Type
                  </span>
                  {editingProfile ? (
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="mt-0.5 rounded-lg border border-border bg-background px-2 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                      aria-label="Business type"
                    >
                      <option>Retail / General Goods</option>
                      <option>Food & Provisions</option>
                      <option>Mobile Money Agent</option>
                      <option>Electronics / Accessories</option>
                      <option>Services</option>
                    </select>
                  ) : (
                    <span className="text-sm font-semibold text-foreground">
                      {businessType}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 py-3.5">
                <Smartphone className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex flex-1 flex-col">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Phone
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {merchantInfo.phone}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 py-3.5">
                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex flex-1 flex-col">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Email
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {merchantInfo.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit / Save button */}
            <div className="px-5 pb-4 pt-2">
              <button
                type="button"
                onClick={() => setEditingProfile(!editingProfile)}
                className="flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.97]"
                style={{
                  background: editingProfile
                    ? "hsl(216 100% 50%)"
                    : "hsl(216 20% 95.5%)",
                  color: editingProfile
                    ? "hsl(0 0% 100%)"
                    : "hsl(216 100% 50%)",
                }}
              >
                {editingProfile ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>
        </section>

        {/* ==== LANGUAGE ==== */}
        <section
          className={`transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: delay(1) }}
        >
          <SectionHeader title="Preferred Language" />

          <div
            className="flex gap-3 rounded-2xl border border-border/60 p-3"
            style={{ background: "hsl(220 20% 99%)" }}
          >
            {(
              [
                { code: "en" as const, label: "English", flag: "EN" },
                { code: "fr" as const, label: "French", flag: "FR" },
              ] as const
            ).map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`flex flex-1 flex-col items-center gap-2 rounded-xl px-4 py-3.5 transition-all duration-300 ${
                  language === lang.code
                    ? "border-2 border-primary shadow-sm"
                    : "border-2 border-transparent hover:bg-secondary"
                }`}
                style={{
                  background:
                    language === lang.code
                      ? "hsl(216 100% 97%)"
                      : "transparent",
                }}
                aria-pressed={language === lang.code}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                    language === lang.code
                      ? "bg-primary text-[hsl(0_0%_100%)]"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <Languages className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-foreground">
                  {lang.flag}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {lang.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ==== NOTIFICATIONS ==== */}
        <section
          className={`transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: delay(2) }}
        >
          <SectionHeader title="Notifications" />

          <div
            className="flex flex-col gap-0 divide-y divide-border/50 rounded-2xl border border-border/60 px-4 py-1"
            style={{ background: "hsl(220 20% 99%)" }}
          >
            <div className="py-3">
              <ToggleSwitch
                id="push-sales"
                checked={toggles.pushSales}
                onChange={() => updateToggle("pushSales")}
                label="Sale Alerts"
                description="Get notified for each sale"
                Icon={Bell}
              />
            </div>
            <div className="py-3">
              <ToggleSwitch
                id="push-payments"
                checked={toggles.pushPayments}
                onChange={() => updateToggle("pushPayments")}
                label="Payment Alerts"
                description="Mobile money in/out alerts"
                Icon={Bell}
              />
            </div>
            <div className="py-3">
              <ToggleSwitch
                id="push-promos"
                checked={toggles.pushPromos}
                onChange={() => updateToggle("pushPromos")}
                label="Promotions"
                description="Tips, offers & updates"
                Icon={BellOff}
              />
            </div>
            <div className="py-3">
              <ToggleSwitch
                id="sms-alerts"
                checked={toggles.smsAlerts}
                onChange={() => updateToggle("smsAlerts")}
                label="SMS Backup Alerts"
                description="Receive critical alerts via SMS"
                Icon={Smartphone}
              />
            </div>
            <div className="py-3">
              <ToggleSwitch
                id="whatsapp-recap"
                checked={toggles.whatsappRecap}
                onChange={() => updateToggle("whatsappRecap")}
                label="Daily WhatsApp Recap"
                description="End-of-day business summary"
                Icon={MessageSquare}
              />
            </div>
          </div>
        </section>

        {/* ==== MOBILE MONEY CONNECTIONS ==== */}
        <section
          className={`transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: delay(3) }}
        >
          <SectionHeader title="Mobile Money Connections" />

          <div className="flex flex-col gap-3">
            {providerConnections.map((p) => (
              <div
                key={p.name}
                className="relative overflow-hidden rounded-2xl border border-border/60"
                style={{ background: "hsl(220 20% 99%)" }}
              >
                {/* brand accent */}
                <div
                  className="absolute bottom-0 left-0 top-0 w-1.5 rounded-l-2xl"
                  style={{ background: p.brandColor }}
                />

                <div className="flex items-center gap-3 py-4 pl-5 pr-4">
                  {/* logo */}
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-black"
                    style={{ background: p.brandBg, color: p.brandDark }}
                  >
                    {p.logo}
                  </div>

                  {/* info */}
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-bold text-foreground">
                      {p.shortName}
                    </span>
                    {p.connected ? (
                      <div className="flex items-center gap-1 text-xs" style={{ color: "hsl(152 87% 32%)" }}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span className="font-medium">
                          Connected &middot; {p.phone}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span className="font-medium">Not connected</span>
                      </div>
                    )}
                  </div>

                  {/* action */}
                  <button
                    type="button"
                    className="flex h-9 items-center rounded-lg px-3.5 text-xs font-semibold transition-all duration-200 active:scale-95"
                    style={{
                      background: p.connected ? p.brandBg : p.brandColor,
                      color: p.connected ? p.brandDark : "hsl(0 0% 100%)",
                    }}
                  >
                    {p.connected ? "Manage" : "Connect"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==== SOCIAL CONNECTIONS ==== */}
        <section
          className={`transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: delay(4) }}
        >
          <SectionHeader title="Social Media" />

          <div className="flex flex-col gap-3">
            {/* Share store link row */}
            <div
              className="flex items-center gap-3 rounded-2xl border border-border/60 px-4 py-3.5"
              style={{ background: "hsl(220 20% 99%)" }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "hsl(216 100% 96%)" }}
              >
                <Share2 className="h-4.5 w-4.5 text-primary" />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-bold text-foreground">Share Your Store</span>
                <span className="text-xs text-muted-foreground">
                  mrumerchant.com/s/kadiatou
                </span>
              </div>
              <button
                type="button"
                className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-[hsl(0_0%_100%)] transition-all duration-200 active:scale-95"
                onClick={() => {
                  navigator.clipboard?.writeText("https://mrumerchant.com/s/kadiatou")
                }}
              >
                <Link2 className="h-3.5 w-3.5" />
                Copy
              </button>
            </div>

            {/* Platform connections */}
            {socials.map((platform) => (
              <div
                key={platform.id}
                className="relative overflow-hidden rounded-2xl border border-border/60"
                style={{ background: "hsl(220 20% 99%)" }}
              >
                {/* brand accent bar */}
                <div
                  className="absolute bottom-0 left-0 top-0 w-1.5 rounded-l-2xl transition-opacity duration-300"
                  style={{
                    background: platform.color,
                    opacity: platform.connected ? 1 : 0.3,
                  }}
                />

                <div className="flex items-center gap-3 py-4 pl-5 pr-4">
                  {/* icon */}
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{
                      background: platform.connected ? platform.bg : "hsl(0 0% 95%)",
                      color: platform.connected ? platform.darkColor : "hsl(0 0% 55%)",
                    }}
                  >
                    <SocialIcon platform={platform.icon} size={18} />
                  </div>

                  {/* info */}
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-bold text-foreground">
                      {platform.name}
                    </span>
                    {platform.connected ? (
                      <div className="flex items-center gap-1 text-xs" style={{ color: "hsl(152 87% 32%)" }}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span className="font-medium">{platform.handle}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Not connected
                      </span>
                    )}
                  </div>

                  {/* action */}
                  <button
                    type="button"
                    disabled={connectingId === platform.id}
                    onClick={() => toggleSocial(platform.id)}
                    className="flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
                    style={{
                      background: platform.connected ? platform.bg : platform.color,
                      color: platform.connected ? platform.darkColor : "hsl(0 0% 100%)",
                    }}
                  >
                    {connectingId === platform.id ? (
                      <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 60" />
                        </svg>
                        {platform.connected ? "Removing..." : "Connecting..."}
                      </span>
                    ) : (
                      <>
                        {platform.connected ? (
                          <>Manage</>
                        ) : (
                          <>
                            <ExternalLink className="h-3 w-3" />
                            Connect
                          </>
                        )}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==== SUPPORT & HELP ==== */}
        <section
          className={`transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: delay(5) }}
        >
          <SectionHeader title="Support & Help" />

          <div
            className="flex flex-col divide-y divide-border/50 rounded-2xl border border-border/60"
            style={{ background: "hsl(220 20% 99%)" }}
          >
            {supportLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-secondary/50"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "hsl(216 20% 95.5%)" }}
                >
                  <item.Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </a>
            ))}
          </div>
        </section>

        {/* ==== SIGN OUT ==== */}
        <section
          className={`transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: delay(6) }}
        >
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[hsl(4_50%_90%)] text-sm font-semibold transition-all duration-200 active:scale-[0.97]"
            style={{
              background: "hsl(4 80% 97%)",
              color: "hsl(4 89% 50%)",
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            MRU Merchant OS v1.0.0
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
