'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { createProduct } from './actions'

export function ProductForm() {
    const [isPending, setIsPending] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
        }
    }

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true)
        try {
            const result = await createProduct(formData)
            if (result?.error) {
                alert(result.error) // Simple alert for now
            } else {
                formRef.current?.reset()
                setPreview(null)
            }
        } finally {
            setIsPending(false)
        }
    }

    return (
        <form
            ref={formRef}
            action={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow-sm border"
        >
            <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-4">
                    {preview ? (
                        <div className="relative h-24 w-24 rounded-lg overflow-hidden border">
                            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                            <button
                                type="button"
                                onClick={() => {
                                    setPreview(null)
                                    // Reset file input
                                    const fileInput = document.getElementById('image') as HTMLInputElement
                                    if (fileInput) fileInput.value = ''
                                }}
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ) : (
                        <div className="h-24 w-24 rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground bg-gray-50">
                            <Upload className="h-6 w-6" />
                        </div>
                    )}
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="flex-1"
                    />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" required placeholder="e.g. Parboiled Rice (50kg)" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Price (GNF)</Label>
                    <Input id="price" name="price" type="number" required min="0" placeholder="0" />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" name="stock" type="number" required min="0" placeholder="0" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" placeholder="e.g. Grains" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Product details..." />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                    </>
                ) : (
                    'Add Product'
                )}
            </Button>
        </form>
    )
}
