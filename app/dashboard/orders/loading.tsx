import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
            </div>

            <div className="grid gap-4">
                {[...Array(5)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                        <CardHeader className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Skeleton className="h-5 w-[200px]" />
                                    <Skeleton className="h-3 w-[150px]" />
                                </div>
                                <Skeleton className="h-5 w-[80px]" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 flex items-center justify-between">
                            <Skeleton className="h-6 w-[100px]" />
                            <Skeleton className="h-8 w-[80px]" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
