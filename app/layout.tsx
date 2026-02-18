import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'MRU Merchant OS — Voice-First Commerce & Mobile Money',
  description:
    'Voice-first fintech and commerce platform for everyday merchants and mobile money agents in West Africa. Record sales, accept payments, and track your business using just your voice.',
  keywords: [
    'mobile money',
    'merchant',
    'voice commerce',
    'fintech',
    'West Africa',
    'Liberia',
    'Guinea',
  ],
}

export const viewport: Viewport = {
  themeColor: '#0062FF',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
