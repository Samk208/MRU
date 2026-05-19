'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

    if (error) {
        return { error: 'Failed to update order status' }
    }

    revalidatePath(`/dashboard/orders/${orderId}`)
    revalidatePath('/dashboard/orders')
}

export async function updatePaymentStatus(orderId: string, newStatus: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('orders')
        .update({ payment_status: newStatus })
        .eq('id', orderId)

    if (error) {
        return { error: 'Failed to update payment status' }
    }

    revalidatePath(`/dashboard/orders/${orderId}`)
    revalidatePath('/dashboard/orders')
}
