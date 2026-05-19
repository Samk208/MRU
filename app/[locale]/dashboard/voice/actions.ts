'use server'
import { getLocale } from 'next-intl/server'

import { model } from "@/lib/gemini";
import { createClient } from '@/lib/supabase/server'
import { parseAmount, extractCurrency, parseQuantity } from '@/lib/persistence/parse'
import { revalidatePath } from 'next/cache'
import { z } from "zod";

const transactionSchema = z.object({
    type: z.enum(["sale", "expense", "stock_in", "stock_out"]).optional().default("sale"),
    item: z.string().describe("The name of the item or product involved"),
    amount: z.string().describe("The monetary value with currency if present, e.g. 'LRD 500'"),
    customer: z.string().optional().describe("Updates customer name if mentioned"),
    quantity: z.string().optional().describe("Quantity of items if mentioned"),
});

export async function parseTransaction(transcript: string) {
    const locale = await getLocale()
    if (!transcript || transcript.trim().length < 5) {
        return { error: 'Transcript too short' };
    }

    const localeInstruction = locale === "fr" ? "Reponds en francais. Utilise un vocabulaire simple comprehensible par un commercant ouest-africain." : "Respond in English. Use West African English idioms where natural."
    const prompt = `
    Extract transaction details from the following voice transcript spoken by a merchant in Guinea/Liberia.
    Return ONLY a JSON object. Do not include markdown formatting like \`\`\`json.

    Transcript: "${transcript}"

    ${localeInstruction}

    Output JSON keys:
    - type: "sale" | "expense" | "stock_in" | "stock_out" (default to "sale" if ambiguous)
    - item: string (e.g., "3 bags of rice")
    - amount: string (e.g., "LRD 15,000", keep original currency if stated, else infer local context)
    - customer: string (optional, e.g., "pending" or name like "Mamadou")
    - quantity: number (optional, raw number)
    - currency: string (optional, inferred currency code e.g. "GNF" or "LRD")
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean potential markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(cleanedText);

        // Basic validation could go here
        return { data };
    } catch (error) {
        console.error("Gemini Parse Error:", error);
        return { error: "Failed to parse transaction" };
    }
}

const parsedTransactionSchema = z.object({
    type: z.enum(['sale', 'expense', 'stock_in', 'stock_out']).default('sale'),
    item: z.string(),
    amount: z.string().optional().default(''),
    customer: z.string().optional(),
    quantity: z.union([z.string(), z.number()]).optional(),
    currency: z.string().optional(),
})

export type ConfirmVoiceTransactionInput = {
    transcript: string
    parsed: unknown
}

export type ConfirmVoiceTransactionResult =
    | { data: { kind: 'transaction'; transactionId: string } }
    | { data: { kind: 'inventory'; inventoryLogId: string } }
    | { error: string }

export async function confirmVoiceTransaction(
    input: ConfirmVoiceTransactionInput
): Promise<ConfirmVoiceTransactionResult> {
    const parsedResult = parsedTransactionSchema.safeParse(input.parsed)
    if (!parsedResult.success) {
        return { error: 'Invalid parsed transaction shape' }
    }
    const parsed = parsedResult.data

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

    await supabase.from('voice_interactions').insert({
        vendor_id: vendor.id,
        transcription: input.transcript,
        intent: parsed.type,
        entities: parsed,
        status: 'confirmed',
    })

    const amount = parseAmount(parsed.amount)
    const currency = parsed.currency ?? extractCurrency(parsed.amount) ?? 'GNF'

    if (parsed.type === 'sale' || parsed.type === 'expense') {
        const { data: tx, error: txError } = await supabase
            .from('transactions')
            .insert({
                vendor_id: vendor.id,
                transaction_type: parsed.type,
                amount,
                currency,
                status: 'confirmed',
                metadata: { transcript: input.transcript, parsed },
            })
            .select('id')
            .single()
        if (txError || !tx) {
            return { error: 'Failed to save transaction: ' + (txError?.message ?? 'unknown') }
        }
        revalidatePath('/dashboard')
        revalidatePath('/dashboard/transactions')
        return { data: { kind: 'transaction', transactionId: tx.id } }
    }

    if (parsed.type === 'stock_in' || parsed.type === 'stock_out') {
        const qty = parseQuantity(parsed.quantity)
        const change = parsed.type === 'stock_in' ? Math.abs(qty) : -Math.abs(qty)
        const { data: inv, error: invError } = await supabase
            .from('inventory_logs')
            .insert({
                vendor_id: vendor.id,
                change_type: parsed.type === 'stock_in' ? 'restock' : 'sale',
                quantity_change: change,
                notes: input.transcript,
            })
            .select('id')
            .single()
        if (invError || !inv) {
            return { error: 'Failed to save inventory log: ' + (invError?.message ?? 'unknown') }
        }
        revalidatePath('/dashboard')
        return { data: { kind: 'inventory', inventoryLogId: inv.id } }
    }

    return { error: 'Unknown transaction type' }
}
