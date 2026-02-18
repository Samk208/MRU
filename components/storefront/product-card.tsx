"use client"

import { useState } from "react"
import Image from "next/image"
import { MessageCircle, Share2, X } from "lucide-react"

export interface Product {
  id: string
  name: string
  price: number
  currency: string
  image: string
  inStock: boolean
  category: string
}

interface ProductCardProps {
  product: Product
  index: number
  visible: boolean
}

const shareChannels = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    color: "#25D366",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    getUrl: (product: Product) =>
      `https://wa.me/?text=${encodeURIComponent(`Check out ${product.name} (${product.currency} ${product.price.toLocaleString()}) at Kadiatou's Shop on MRU Merchant OS!`)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    color: "#1877F2",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    getUrl: () =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://mrumerchant.com/s/kadiatou")}`,
  },
  {
    id: "x",
    label: "X",
    color: "#000000",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    getUrl: (product: Product) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${product.name} for just ${product.currency} ${product.price.toLocaleString()} at Kadiatou's Shop!`)}&url=${encodeURIComponent("https://mrumerchant.com/s/kadiatou")}`,
  },
]

export function ProductCard({ product, index, visible }: ProductCardProps) {
  const [showShare, setShowShare] = useState(false)

  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to buy ${product.name} (${product.currency} ${product.price.toLocaleString()}) from Kadiatou's Shop.`
  )
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-6 scale-95 opacity-0"
      }`}
      style={{
        background: "hsl(220 20% 99%)",
        transitionDelay: `${index * 60}ms`,
      }}
    >
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Stock badge */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
            <span className="rounded-full bg-[hsl(220_20%_99%)] px-3 py-1 text-xs font-semibold text-foreground">
              Out of Stock
            </span>
          </div>
        )}

        {/* Category tag */}
        <span className="absolute left-2 top-2 rounded-full bg-[hsl(220_20%_99%/0.9)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
          {product.category}
        </span>

        {/* Share button */}
        <button
          type="button"
          onClick={() => setShowShare(!showShare)}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 active:scale-90 ${
            showShare
              ? "bg-primary text-[hsl(0_0%_100%)]"
              : "bg-[hsl(220_20%_99%/0.9)] text-muted-foreground hover:text-foreground"
          }`}
          aria-label={`Share ${product.name}`}
        >
          {showShare ? (
            <X className="h-3.5 w-3.5" />
          ) : (
            <Share2 className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Share overlay */}
        {showShare && (
          <div
            className="absolute inset-x-2 bottom-2 flex gap-2 rounded-xl p-2 backdrop-blur-md"
            style={{
              background: "hsl(0 0% 0% / 0.6)",
              animation: "scaleIn 0.2s ease-out forwards",
            }}
          >
            {shareChannels.map((ch) => (
              <a
                key={ch.id}
                href={ch.getUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShare(false)}
                className="flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[hsl(0_0%_100%)] transition-colors hover:bg-[hsl(0_0%_100%/0.15)] active:scale-95"
                aria-label={`Share on ${ch.label}`}
              >
                <span style={{ color: ch.color }}>{ch.icon}</span>
                <span className="text-[9px] font-medium">{ch.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {product.name}
          </h3>
          <p className="text-base font-bold text-primary">
            {product.currency} {product.price.toLocaleString()}
          </p>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.97] ${
            product.inStock
              ? "bg-[hsl(142_70%_40%)] text-[hsl(0_0%_100%)] shadow-sm hover:bg-[hsl(142_70%_35%)]"
              : "pointer-events-none bg-muted text-muted-foreground"
          }`}
          aria-label={`Buy ${product.name} on WhatsApp`}
          aria-disabled={!product.inStock}
        >
          <MessageCircle className="h-4 w-4" />
          <span>Buy on WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
