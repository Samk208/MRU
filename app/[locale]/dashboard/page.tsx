import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { Package, PlusCircle, QrCode, ShoppingBag, TrendingUp } from 'lucide-react'

async function getDashboardMetrics() {
  const supabase = await createClient()

  // In a real app, these would be separate parallel queries or a single RPC
  // For now, these are placeholders or simple counts
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
  const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })

  return {
    totalSales: 'GNF 0', // Placeholder
    activeOrders: orderCount || 0,
    totalProducts: productCount || 0
  }
}

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex gap-2">
          <Button size="sm" className="hidden md:flex">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalSales}</div>
            <p className="text-xs text-muted-foreground">+0% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeOrders}</div>
            <p className="text-xs text-muted-foreground">0 pending shipment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalProducts}</div>
            <p className="text-xs text-muted-foreground">0 low stock alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions (Mobile Focused) */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        <Button className="h-24 flex-col gap-2" variant="outline">
          <PlusCircle className="h-8 w-8 text-primary" />
          <span>New Product</span>
        </Button>
        <Button className="h-24 flex-col gap-2" variant="outline">
          <QrCode className="h-8 w-8 text-primary" />
          <span>Scan Order</span>
        </Button>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              No recent sales
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              No data available
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
