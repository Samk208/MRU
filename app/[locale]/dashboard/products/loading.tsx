import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="order-2 lg:order-1 space-y-4">
                    <Skeleton className="h-6 w-[150px]" />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[...Array(4)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <Skeleton className="aspect-video w-full" />
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start">
                                        <Skeleton className="h-4 w-[120px]" />
                                        <Skeleton className="h-5 w-[80px]" />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <Skeleton className="h-6 w-[100px]" />
                                    <Skeleton className="h-3 w-[60px] mt-2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <div className="sticky top-8 space-y-4">
                        <Skeleton className="h-6 w-[150px]" />
                        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-24 w-full" />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
