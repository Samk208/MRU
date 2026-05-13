import { describe, it, expect } from 'vitest'
import {
  parseAmount,
  extractCurrency,
  parseQuantity,
  normalizePrice,
  buildSubdomain,
} from './parse'

describe('parseAmount', () => {
  it('extracts plain number', () => {
    expect(parseAmount('5000')).toBe(5000)
  })
  it('extracts number from currency string', () => {
    expect(parseAmount('LRD 15,000')).toBe(15000)
    expect(parseAmount('GNF 5000')).toBe(5000)
  })
  it('returns 0 for empty input', () => {
    expect(parseAmount('')).toBe(0)
    expect(parseAmount(undefined)).toBe(0)
    expect(parseAmount(null)).toBe(0)
  })
  it('handles decimal', () => {
    expect(parseAmount('LRD 1,250.50')).toBe(1250.5)
  })
})

describe('extractCurrency', () => {
  it('returns GNF when present', () => {
    expect(extractCurrency('GNF 5000')).toBe('GNF')
  })
  it('returns LRD when present', () => {
    expect(extractCurrency('LRD 15,000')).toBe('LRD')
  })
  it('is case insensitive', () => {
    expect(extractCurrency('gnf 5000')).toBe('GNF')
  })
  it('returns null when no currency found', () => {
    expect(extractCurrency('5000')).toBeNull()
    expect(extractCurrency('')).toBeNull()
    expect(extractCurrency(undefined)).toBeNull()
  })
})

describe('parseQuantity', () => {
  it('returns number unchanged', () => {
    expect(parseQuantity(5)).toBe(5)
  })
  it('parses string number', () => {
    expect(parseQuantity('3')).toBe(3)
  })
  it('defaults to 1 for missing or invalid', () => {
    expect(parseQuantity(undefined)).toBe(1)
    expect(parseQuantity('')).toBe(1)
    expect(parseQuantity('not-a-number')).toBe(1)
    expect(parseQuantity(null)).toBe(1)
  })
})

describe('normalizePrice', () => {
  it('passes numbers through', () => {
    expect(normalizePrice(99.5)).toBe(99.5)
  })
  it('parses string prices', () => {
    expect(normalizePrice('1,250.00')).toBe(1250)
    expect(normalizePrice('$50')).toBe(50)
  })
  it('returns 0 for invalid', () => {
    expect(normalizePrice(undefined)).toBe(0)
    expect(normalizePrice(NaN)).toBe(0)
    expect(normalizePrice(null)).toBe(0)
  })
})

describe('buildSubdomain', () => {
  const vendorId = '11111111-2222-3333-4444-555566667777'

  it('slugifies the name and appends vendor suffix', () => {
    expect(buildSubdomain('Mama Aisha Shop', vendorId)).toBe('mama-aisha-shop-66667777')
  })
  it('strips accents', () => {
    expect(buildSubdomain('Café Bénin', vendorId)).toBe('cafe-benin-66667777')
  })
  it('handles empty name with fallback', () => {
    expect(buildSubdomain('', vendorId)).toBe('store-66667777')
  })
  it('caps slug at 60 chars', () => {
    const long = 'a'.repeat(100)
    const result = buildSubdomain(long, vendorId)
    expect(result.length).toBeLessThanOrEqual(60 + 1 + 8)
  })
})
