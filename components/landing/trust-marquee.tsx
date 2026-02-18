"use client"

const partners = [
  { name: "MTN MoMo", icon: "M" },
  { name: "Orange Money", icon: "O" },
  { name: "WhatsApp Business", icon: "W" },
  { name: "OpenAI", icon: "O" },
  { name: "Anthropic", icon: "A" },
  { name: "Google Gemini", icon: "G" },
  { name: "Supabase", icon: "S" },
  { name: "Vercel", icon: "V" },
  { name: "Liberia Revenue Authority", icon: "L" },
  { name: "BCRG Guinea", icon: "B" },
  { name: "Central Bank of Liberia", icon: "C" },
]

export function TrustMarquee() {
  // Double the list for seamless loop
  const items = [...partners, ...partners]

  return (
    <section className="overflow-hidden border-y border-border bg-secondary/30 py-6">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
        Trusted by leading institutions
      </p>
      <div className="relative">
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-secondary/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-secondary/80 to-transparent" />

        <div className="flex animate-marquee items-center gap-12">
          {items.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-[hsl(220_20%_99%)] text-xs font-bold text-foreground/40">
                {partner.icon}
              </div>
              <span className="whitespace-nowrap text-sm font-medium">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
