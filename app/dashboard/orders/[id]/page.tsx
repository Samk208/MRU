import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/lib/supabase/server'
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { OrderStatusControls } from '../status-controls'

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    // Fetch Order with Items and Products
    const { data: order } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                products (
                    name,
                    sku,
                    images
                )
            )
        `)
        .eq('id', id)
        .single()

    if (!order) {
        notFound()
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/orders">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Order #{order.id.slice(0, 8)}</h1>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString()}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Content: Items */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {order.order_items.map((item: any) => (
                                <div key={item.id} className="flex justify-between items-start">
                                    <div className="flex gap-3">
                                        <div className="h-12 w-12 bg-gray-100 rounded-md border overflow-hidden">
                                            {item.products?.images?.[0] && (
                                                <img src={item.products.images[0]} alt="" className="h-full w-full object-cover" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{item.products?.name || 'Unknown Product'}</p>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity} × {order.currency} {item.unit_price}</p>
                                        </div>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {order.currency} {item.subtotal.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>{order.currency} {order.total_amount.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <OrderStatusControls order={order} />
                </div>

                {/* Sidebar: Customer Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Customer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="font-medium">{order.customer_name}</div>
                            {order.customer_email && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <a href={`mailto:${order.customer_email}`} className="hover:underline">{order.customer_email}</a>
                                </div>
                            )}
                            {order.customer_phone && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <a href={`tel:${order.customer_phone}`} className="hover:underline">{order.customer_phone}</a>
                                </div>
                            )}
                            {order.delivery_address && (
                                <div className="flex items-start gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4 mt-0.5" />
                                    <span>{order.delivery_address}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground italic">
                                {order.notes || 'No notes provided.'}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
