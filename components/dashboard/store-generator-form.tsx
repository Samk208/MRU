'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { saveStoreConfiguration } from '@/app/dashboard/store/actions'

export function StoreGeneratorForm() {
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [result, setResult] = useState<unknown>(null)

    const supabase = createClient()

    async function handleGenerate() {
        if (!prompt.trim()) return
        setLoading(true)
        setResult(null)
        try {
            const { data, error } = await supabase.functions.invoke('store-generator', {
                body: { prompt }
            })
            if (error) throw error
            setResult(data)
            toast.success('Store configuration generated')
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown error'
            toast.error('Failed to generate store: ' + msg)
        } finally {
            setLoading(false)
        }
    }

    async function handleSave() {
        if (!result) return
        setSaving(true)
        try {
            const res = await saveStoreConfiguration(result)
            if ('error' in res) {
                toast.error(res.error)
                return
            }
            const n = res.data.productsInserted
            toast.success(`Saved · ${n} product${n === 1 ? '' : 's'} added`)
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown error'
            toast.error('Failed to save: ' + msg)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>AI Store Generator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Describe your business, and our AI will generate a complete store configuration (branding, hero section, products) for you.
                    </p>
                    <Textarea
                        placeholder="Describe your store (e.g., 'I sell handcrafted leather shoes for men and women in Monrovia')"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={4}
                        className="resize-none"
                    />
                    <div className="flex justify-end">
                        <Button
                            onClick={handleGenerate}
                            disabled={loading || !prompt.trim()}
                            className="min-h-[44px]"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? 'Generating...' : 'Generate Configuration'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result !== null && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Generated Configuration</CardTitle>
                        <Button onClick={handleSave} disabled={saving} className="min-h-[44px]">
                            {saving ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            {saving ? 'Saving...' : 'Save Store'}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs max-h-[500px]">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
