import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "MRU Merchant OS — Voice-First Commerce & Mobile Money",
  description:
    "Voice-first fintech and commerce platform for everyday merchants and mobile money agents in West Africa. Record sales, accept payments, and track your business using just your voice.",
  keywords: [
    "mobile money",
    "merchant",
    "voice commerce",
    "fintech",
    "West Africa",
    "Liberia",
    "Guinea",
  ],
}

export const viewport: Viewport = {
  themeColor: "#0062FF",
  width: "device-width",
  initialScale: 1,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
