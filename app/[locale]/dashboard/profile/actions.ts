"use server"

import { createClient } from "@/lib/supabase/server"
import { routing } from "@/i18n/routing"

export async function setPreferredLocale(locale: string) {
  if (!routing.locales.includes(locale as any)) {
    throw new Error(`Invalid locale: ${locale}`)
  }
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")
  const { error } = await supabase
    .from("vendors")
    .update({ preferred_locale: locale })
    .eq("user_id", user.id)
  if (error) throw error
  return { ok: true }
}
