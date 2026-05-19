import { Hero } from "@/components/templates/retail/Hero";
import { Navbar } from "@/components/templates/retail/Navbar";
import { ProductGrid } from "@/components/templates/retail/ProductGrid";

// Mock Data simulates what the AI would generate
const STORE_DATA = {
    name: "Mama's Rice Kitchen",
    hero: {
        title: "Authentic Flavors of Douala",
        subtitle: "Hand-picked ingredients, traditional recipes, and the warmth of home cooking delivered to your doorstep.",
        ctaText: "Order Now",
        ctaLink: "#products",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000", // Salad/Food image
    },
    products: [
        {
            id: "1",
            name: "Jollof Rice Special",
            description: "Smoky party jollof with fried plantains and spicy chicken.",
            price: 2500,
            currency: "XAF",
            imageUrl: "https://images.unsplash.com/photo-1604329760661-e71dc70859f3?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: "2",
            name: "Egusi Soup & Pounded Yam",
            description: "Rich melon seed soup with goat meat and fresh pounded yam.",
            price: 3000,
            currency: "XAF",
            imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: "3",
            name: "Fried Rice & Beef",
            description: "Classic Nigerian style fried rice with tender beef chunks.",
            price: 2800,
            currency: "XAF",
            imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: "4",
            name: "Pepper Soup",
            description: "Spicy catfish pepper soup, perfect for cold evenings.",
            price: 2000,
            currency: "XAF",
            imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800",
        },
    ]
};

export default function DemoStorePage() {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            {/* 1. Navigation */}
            <Navbar storeName={STORE_DATA.name} />

            <main>
                {/* 2. Hero Section */}
                <Hero
                    title={STORE_DATA.hero.title}
                    subtitle={STORE_DATA.hero.subtitle}
                    ctaText={STORE_DATA.hero.ctaText}
                    ctaLink={STORE_DATA.hero.ctaLink}
                    imageUrl={STORE_DATA.hero.imageUrl}
                />

                {/* 3. Products Grid */}
                <div id="products">
                    <ProductGrid
                        title="Our Menu"
                        products={STORE_DATA.products}
                    />
                </div>
            </main>

            {/* 4. Footer (Basic) */}
            <footer className="border-t py-12 text-center text-muted-foreground">
                <p>© 2026 {STORE_DATA.name}. Powered by MRU Merchant OS.</p>
            </footer>
        </div>
    );
}
