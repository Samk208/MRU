"use client"

import { Search, SlidersHorizontal } from "lucide-react"

interface StoreSearchProps {
  query: string
  onQueryChange: (value: string) => void
  resultCount: number
}

export function StoreSearch({
  query,
  onQueryChange,
  resultCount,
}: StoreSearchProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search products..."
            className="h-12 w-full rounded-xl border border-border/60 bg-[hsl(220_20%_99%)] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
            aria-label="Search products"
          />
        </div>

        {/* Filter button */}
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-[hsl(220_20%_99%)] transition-colors hover:bg-secondary"
          aria-label="Filter products"
        >
          <SlidersHorizontal className="h-4.5 w-4.5 text-muted-foreground" />
        </button>
      </div>

      {/* Result count */}
      <p className="text-xs text-muted-foreground">
        {resultCount} {resultCount === 1 ? "product" : "products"}{" "}
        {query ? "found" : "available"}
      </p>
    </div>
  )
}
