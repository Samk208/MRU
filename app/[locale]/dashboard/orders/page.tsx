import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { ChevronRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getOrders() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data: vendor } = await supabase
        .from('vendors')
        .select('id')
        .eq('user_id', user.id)
        .single()

    if (!vendor) return []

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('vendor_id', vendor.id)
        .order('created_at', { ascending: false })

    return orders || []
}

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    pending: 'secondary',
    processing: 'default',
    completed: 'outline', // Green-ish ideally, but using outline for now
    cancelled: 'destructive',
}

export default async function OrdersPage() {
    const orders = await getOrders()

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
                <p className="text-muted-foreground">Track and manage customer orders.</p>
            </div>

            <div className="grid gap-4">
                {orders.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                            <ShoppingBag className="h-10 w-10 mb-2 opacity-20" />
                            <p>No orders yet.</p>
                            <p className="text-sm">Share your storefront to start selling!</p>
                        </CardContent>
                    </Card>
                ) : (
                    orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden hover:bg-gray-50/50 transition-colors">
                            <CardHeader className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base">
                                            {order.customer_name || 'Guest Customer'}
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            #{order.id.slice(0, 8)} • {new Date(order.created_at).toLocaleDateString()}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={statusColors[order.status] || 'outline'}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex items-center justify-between">
                                <div className="font-semibold">
                                    {order.currency} {order.total_amount.toLocaleString()}
                                </div>
                                <Button asChild size="sm" variant="ghost">
                                    <Link href={`/dashboard/orders/${order.id}`}>
                                        Details
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
