'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const productSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    price: z.coerce.number().min(0),
    stock_quantity: z.coerce.number().int().min(0),
    category: z.string().optional(),
    sku: z.string().optional(),
    // image handling is done separately via FormData
})

export async function createProduct(formData: FormData) {
    const supabase = await createClient()
    const user = (await supabase.auth.getUser()).data.user

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // 1. Validate Form Data
    const rawData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        stock_quantity: formData.get('stock'),
        category: formData.get('category'),
        sku: formData.get('sku'),
    }

    const validation = productSchema.safeParse(rawData)
    if (!validation.success) {
        return { error: 'Invalid input data' }
    }

    const data = validation.data
    let imageUrls: string[] = []

    // 2. Handle Image Upload (Single image for now)
    const imageFile = formData.get('image') as File
    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${user.id}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(fileName, imageFile)

        if (uploadError) {
            console.error('Upload error:', uploadError)
            return { error: 'Failed to upload image' }
        }

        const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(fileName)

        imageUrls.push(publicUrl)
    }

    // 3. Get Vendor ID
    const { data: vendor } = await supabase
        .from('vendors')
        .select('id')
        .eq('user_id', user.id)
        .single()

    if (!vendor) {
        return { error: 'Vendor profile not found' }
    }

    // 4. Insert Product
    const { error } = await supabase
        .from('products')
        .insert({
            vendor_id: vendor.id,
            name: data.name,
            description: data.description,
            price: data.price,
            stock_quantity: data.stock_quantity,
            category: data.category,
            sku: data.sku,
            images: imageUrls,
            is_active: true
        })

    if (error) {
        console.error('Insert error:', error)
        return { error: 'Failed to create product' }
    }

    revalidatePath('/dashboard/products')
    redirect('/dashboard/products')
}

export async function deleteProduct(id: string) {
    const supabase = await createClient()

    // Soft delete
    const { error } = await supabase
        .from('products')
        .update({ is_active: false })
        .eq('id', id)

    if (error) {
        return { error: 'Failed to delete product' }
    }

    revalidatePath('/dashboard/products')
}
