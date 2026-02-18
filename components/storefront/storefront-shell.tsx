"use client"

import { useEffect, useMemo, useState } from "react"
import { StoreHeader } from "./store-header"
import { StoreSearch } from "./store-search"
import { ProductCard } from "./product-card"
import type { Product } from "./product-card"
import { WhatsAppFab } from "./whatsapp-fab"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { Package } from "lucide-react"

const products: Product[] = [
  {
    id: "1",
    name: "Premium Palm Oil (1L)",
    price: 350,
    currency: "LRD",
    image: "/images/products/palm-oil.jpg",
    inStock: true,
    category: "Oils",
  },
  {
    id: "2",
    name: "Long Grain Rice (25kg)",
    price: 3200,
    currency: "LRD",
    image: "/images/products/rice-bag.jpg",
    inStock: true,
    category: "Grains",
  },
  {
    id: "3",
    name: "Bar Soap Pack (3 pcs)",
    price: 175,
    currency: "LRD",
    image: "/images/products/soap-bar.jpg",
    inStock: true,
    category: "Household",
  },
  {
    id: "4",
    name: "Bouillon Seasoning Cubes",
    price: 50,
    currency: "LRD",
    image: "/images/products/bouillon-cubes.jpg",
    inStock: true,
    category: "Spices",
  },
  {
    id: "5",
    name: "White Sugar (1kg)",
    price: 200,
    currency: "LRD",
    image: "/images/products/sugar-bag.jpg",
    inStock: false,
    category: "Baking",
  },
  {
    id: "6",
    name: "Vegetable Cooking Oil (5L)",
    price: 1500,
    currency: "LRD",
    image: "/images/products/cooking-oil.jpg",
    inStock: true,
    category: "Oils",
  },
]

export function StorefrontShell() {
  const [query, setQuery] = useState("")
  const [cardsVisible, setCardsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCardsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Reset visibility on query change for stagger re-trigger
  useEffect(() => {
    setCardsVisible(false)
    const timer = setTimeout(() => setCardsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [query])

  const filtered = useMemo(() => {
    if (!query.trim()) return products
    const q = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div
      className="relative flex min-h-screen flex-col pb-20"
      style={{ background: "hsl(220 33% 98.4%)" }}
    >
      <StoreHeader />

      <main className="flex flex-1 flex-col gap-5 px-4 py-5 md:mx-auto md:max-w-lg md:px-0">
        {/* Merchant banner */}
        <div
          className="overflow-hidden rounded-2xl border border-border/60 p-5"
          style={{
            background:
              "linear-gradient(135deg, hsl(216 100% 50%) 0%, hsl(216 100% 38%) 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-primary-foreground"
              style={{ background: "hsl(0 0% 100% / 0.2)" }}
            >
              KS
            </div>
            <div className="flex flex-col gap-0.5">
              <h1 className="text-lg font-bold text-[hsl(0_0%_100%)] leading-tight">
                {"Kadiatou's Shop"}
              </h1>
              <p className="text-xs text-[hsl(0_0%_100%/0.75)]">
                Monrovia, Waterside Market
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[hsl(142_70%_45%)]" />
                <span className="text-[11px] font-medium text-[hsl(0_0%_100%/0.85)]">
                  Open now
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <StoreSearch
          query={query}
          onQueryChange={setQuery}
          resultCount={filtered.length}
        />

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                visible={cardsVisible}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: "hsl(216 20% 95.5%)" }}
            >
              <Package className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              No products match your search
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      <WhatsAppFab />
      <BottomNav />
    </div>
  )
}
