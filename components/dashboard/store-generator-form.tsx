'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'; // Ensure sonner is installed, usually is in shadcn setup

export function StoreGeneratorForm() {
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const supabase = createClient()

    async function handleGenerate() {
        if (!prompt.trim()) return

        setLoading(true)
        setResult(null)

        try {
            const { data, error } = await supabase.functions.invoke('store-generator', {
                body: { prompt }
            })

            if (error) {
                console.error("Supabase Invocation Error:", error)
                throw error
            }

            setResult(data)
            toast.success('Store configuration generated!')
        } catch (err: any) {
            console.error("Generation Error:", err)
            toast.error('Failed to generate store: ' + (err.message || "Unknown error"))
        } finally {
            setLoading(false)
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
                        <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? 'Generating...' : 'Generate Configuration'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Configuration</CardTitle>
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
