'use server'

import { createClient } from '@/lib/supabase/server'
import { buildSubdomain, normalizePrice } from '@/lib/persistence/parse'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const generatedConfigSchema = z.object({
  storeName: z.string().min(1),
  hero: z
    .object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      ctaText: z.string().optional(),
      ctaLink: z.string().optional(),
    })
    .optional(),
  products: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.union([z.number(), z.string()]).optional(),
        currency: z.string().optional(),
        category: z.string().optional(),
      })
    )
    .default([]),
})

export type GeneratedStoreConfig = z.infer<typeof generatedConfigSchema>

export type SaveStoreResult =
  | { data: { vendorId: string; storefrontId: string; subdomain: string; productsInserted: number } }
  | { error: string }

export async function saveStoreConfiguration(config: unknown): Promise<SaveStoreResult> {
  const parsed = generatedConfigSchema.safeParse(config)
  if (!parsed.success) {
    return { error: 'Invalid configuration shape' }
  }

  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Not authenticated' }

  const { data: vendor, error: vendorError } = await supabase
    .from('vendors')
    .select('id')
    .eq('user_id', user.id)
    .single()
  if (vendorError || !vendor) return { error: 'Vendor profile not found' }

  const { storeName, hero, products } = parsed.data

  const { error: nameError } = await supabase
    .from('vendors')
    .update({ business_name: storeName, updated_at: new Date().toISOString() })
    .eq('id', vendor.id)
  if (nameError) return { error: 'Failed to update vendor: ' + nameError.message }

  const subdomain = buildSubdomain(storeName, vendor.id)
  const theme = { storeName, hero: hero ?? null }

  const { data: existingStorefront } = await supabase
    .from('storefronts')
    .select('id')
    .eq('vendor_id', vendor.id)
    .maybeSingle()

  let storefrontId: string
  if (existingStorefront) {
    const { error: updateError } = await supabase
      .from('storefronts')
      .update({ subdomain, theme, updated_at: new Date().toISOString() })
      .eq('id', existingStorefront.id)
    if (updateError) return { error: 'Failed to update storefront: ' + updateError.message }
    storefrontId = existingStorefront.id
  } else {
    const { data: newStorefront, error: insertError } = await supabase
      .from('storefronts')
      .insert({ vendor_id: vendor.id, subdomain, theme })
      .select('id')
      .single()
    if (insertError || !newStorefront) {
      return { error: 'Failed to create storefront: ' + (insertError?.message ?? 'unknown error') }
    }
    storefrontId = newStorefront.id
  }

  let productsInserted = 0
  if (products.length > 0) {
    const productRows = products.map((p) => ({
      vendor_id: vendor.id,
      name: p.name,
      description: p.description ?? null,
      category: p.category ?? null,
      price: normalizePrice(p.price),
      currency: p.currency ?? 'GNF',
    }))
    const { data: inserted, error: productsError } = await supabase
      .from('products')
      .insert(productRows)
      .select('id')
    if (productsError) return { error: 'Failed to insert products: ' + productsError.message }
    productsInserted = inserted?.length ?? 0
  }

  revalidatePath('/dashboard/products')
  revalidatePath('/dashboard/store')

  return { data: { vendorId: vendor.id, storefrontId, subdomain, productsInserted } }
}
