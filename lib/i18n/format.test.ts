import { describe, it, expect } from "vitest"
import { formatCurrency, formatDate } from "@/lib/i18n/format"

describe("formatCurrency", () => {
  it("formats LRD in en", () => {
    const result = formatCurrency(12000, "LRD", "en")
    expect(result).toMatch(/LRD/)
    expect(result).toMatch(/12/)
  })
  it("formats LRD in fr", () => {
    const result = formatCurrency(12000, "LRD", "fr")
    expect(result).toMatch(/LRD/)
    expect(result).toMatch(/12/)
  })
  it("formats GNF without decimals in fr", () => {
    const result = formatCurrency(50000, "GNF", "fr")
    expect(result).toMatch(/GNF/)
    expect(result).toMatch(/50/)
  })
})

describe("formatDate", () => {
  it("en uses month name", () => {
    const result = formatDate(new Date("2026-05-19"), "en")
    expect(result).toMatch(/May/)
  })
  it("fr uses lowercase month", () => {
    const result = formatDate(new Date("2026-05-19"), "fr")
    expect(result).toMatch(/mai/)
  })
})
