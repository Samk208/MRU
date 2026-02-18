"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { Locale } from "./voice-copy"

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
})

export function LocaleProvider({
  children,
  defaultLocale = "en",
}: {
  children: ReactNode
  defaultLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
