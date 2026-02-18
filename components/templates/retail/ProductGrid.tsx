import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export interface StoreProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    imageUrl?: string;
    category?: string;
}

interface ProductGridProps {
    title?: string;
    products: StoreProduct[];
}

export function ProductGrid({ title = "Featured Products", products }: ProductGridProps) {
    return (
        <section className="container mx-auto px-4 py-12 md:py-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {title}
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Browse our collection of top-quality items.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <Card key={product.id} className="flex flex-col h-full overflow-hidden transition-all hover:shadow-md">
                        <CardHeader className="p-0">
                            <div className="aspect-square relative w-full overflow-hidden bg-muted">
                                {product.imageUrl ? (
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                                    <CardDescription className="line-clamp-2 text-sm mt-1">
                                        {product.description}
                                    </CardDescription>
                                </div>
                            </div>
                            <div className="font-bold text-lg mt-2">
                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: product.currency }).format(product.price)}
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button className="w-full gap-2">
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
