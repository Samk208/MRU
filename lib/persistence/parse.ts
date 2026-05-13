const KNOWN_CURRENCIES = ['GNF', 'LRD', 'XAF', 'XOF', 'USD', 'EUR'] as const

export function parseAmount(raw: string | undefined | null): number {
  if (!raw) return 0
  const digits = String(raw).replace(/,/g, '').replace(/[^\d.]/g, '')
  const n = parseFloat(digits)
  return isNaN(n) ? 0 : n
}

export function extractCurrency(raw: string | undefined | null): string | null {
  if (!raw) return null
  const upper = String(raw).toUpperCase()
  for (const code of KNOWN_CURRENCIES) {
    if (upper.includes(code)) return code
  }
  return null
}

export function parseQuantity(raw: string | number | undefined | null): number {
  if (typeof raw === 'number' && !isNaN(raw)) return raw
  if (!raw) return 1
  const n = parseInt(String(raw), 10)
  return isNaN(n) ? 1 : n
}

export function normalizePrice(raw: number | string | undefined | null): number {
  if (typeof raw === 'number' && !isNaN(raw)) return raw
  if (typeof raw === 'string') return parseAmount(raw)
  return 0
}

export function buildSubdomain(name: string, vendorId: string): string {
  const slug = String(name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  const suffix = vendorId.replace(/-/g, '').slice(-8)
  return `${slug || 'store'}-${suffix}`
}
