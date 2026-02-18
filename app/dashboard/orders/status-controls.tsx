'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateOrderStatus, updatePaymentStatus } from './actions'

export function OrderStatusControls({ order }: { order: any }) {

    const handleStatusChange = (value: string) => {
        // Optimistic UI updates could be added here
        updateOrderStatus(order.id, value)
    }

    const handlePaymentChange = (value: string) => {
        updatePaymentStatus(order.id, value)
    }

    return (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-sm text-foreground">Manage Order</h3>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Order Status</label>
                    <Select defaultValue={order.status} onValueChange={handleStatusChange}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Payment Status</label>
                    <Select defaultValue={order.payment_status} onValueChange={handlePaymentChange}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
