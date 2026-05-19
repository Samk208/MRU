"use client"

import { useLocale, useTranslations } from "next-intl"
import { useTransition } from "react"
import { useRouter, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { setPreferredLocale } from "@/app/[locale]/dashboard/profile/actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

const LABELS: Record<string, string> = {
  en: "English",
  fr: "Francais",
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations("common")

  const change = (next: string) => {
    if (next === locale) return
    startTransition(async () => {
      try { await setPreferredLocale(next) } catch { /* ignore */ }
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isPending} aria-label={t("language")} className="min-h-[44px]">
          <Languages className="h-4 w-4 mr-2" />
          {LABELS[locale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((loc) => (
          <DropdownMenuItem key={loc} onSelect={() => change(loc)}>
            {LABELS[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
