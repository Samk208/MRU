import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { Package } from 'lucide-react'
import { ProductForm } from './product-form'

export const dynamic = 'force-dynamic'

async function getProducts() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    // Get vendor id first
    const { data: vendor } = await supabase
        .from('vendors')
        .select('id')
        .eq('user_id', user.id)
        .single()

    if (!vendor) return []

    const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', vendor.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    return products || []
}

export default async function ProductsPage() {
    const products = await getProducts()

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground">Manage your inventory and pricing.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Product List */}
                <div className="order-2 lg:order-1 space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Inventory ({products.length})
                    </h2>

                    {products.length === 0 ? (
                        <Card className="border-dashed">
                            <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                                <Package className="h-10 w-10 mb-2 opacity-20" />
                                <p>No products yet.</p>
                                <p className="text-sm">Add your first item using the form.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {products.map((product) => (
                                <Card key={product.id} className="overflow-hidden">
                                    {product.images && product.images[0] && (
                                        <div className="aspect-video w-full relative bg-gray-100">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <CardHeader className="p-4 pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-base font-medium line-clamp-1">{product.name}</CardTitle>
                                            <Badge variant={product.stock_quantity > 0 ? "outline" : "destructive"}>
                                                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <div className="text-lg font-bold text-primary">
                                            GNF {product.price.toLocaleString()}
                                        </div>
                                        {product.sku && (
                                            <p className="text-xs text-muted-foreground mt-1">SKU: {product.sku}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add Product Form */}
                <div className="order-1 lg:order-2">
                    <div className="sticky top-8">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            Add New Product
                        </h2>
                        <ProductForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
