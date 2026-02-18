import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    imageUrl?: string; // Optional image URL
}

export function Hero({
    title,
    subtitle,
    ctaText,
    ctaLink,
    imageUrl = "/placeholder-hero.jpg", // Default placeholder
}: HeroProps) {
    return (
        <section className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
                {/* Left: Content */}
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                            {title}
                        </h1>
                        <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                            {subtitle}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Button asChild size="lg">
                            <Link href={ctaLink}>{ctaText}</Link>
                        </Button>
                        <Button variant="outline" size="lg">
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="flex items-center justify-center">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl object-cover object-center lg:aspect-square">
                        {/* Using a placeholder if no image provided, but ideally next/image */}
                        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
                            {imageUrl && imageUrl.startsWith("http") ? (
                                <Image
                                    src={imageUrl}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <span>Hero Image Placeholder</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
