# 🧠 Brainstorming: Hybrid AI + Template System

**Date:** 2026-02-17
**Topic:** Leveraging Pre-built Architectures vs. Pure Generative UI
**Status:** Strategic Plan

## The Core Problem
Generating entire websites pixel-by-pixel with AI is:
1.  **Slow** (Latency)
2.  **Unreliable** (Hallucinations, broken layouts)
3.  **Hard to Maintain** (Spaguetti code)

## The Solution: "Smart Lego Blocks"
Instead of asking AI to "build a house from sand" (raw code), we ask it to "assemble a house from Lego blocks" (pre-built, high-quality/premium templates).

### 1. The Component Library (The "Legos")
We build a robust set of rigid, high-quality React components.
*   **Hero Sections:** `HeroVideo`, `HeroSimple`, `HeroSplit`
*   **Product Displays:** `GridHighDensity` (Grocery), `GridFocus` (Fashion), `ListSimple` (Service)
*   **Info Sections:** `FAQAccordion`, `ContactMap`, `TestimonialSlider`
*   **Nav/Footers:** Standard patterns.

**Tech Step:** Create `components/templates/*` directory.

### 2. The Archetypes (The "Blueprints")
We define "Starter Packs" for common industries.
*   **The "Boutique" (Fashion/Art)**
    *   Order: `HeroSplit` -> `GridFocus` -> `TestimonialSlider`
    *   Vibe: Serif fonts, muted colors, large images.
*   **The "Mart" (Grocery/Electronics)**
    *   Order: `HeroSimple` -> `GridHighDensity` -> `FAQAccordion`
    *   Vibe: Sans-serif, bright colors, compact layout.
*   **The "Service" (Consulting/Repairs)**
    *   Order: `HeroVideo` -> `ListSimple` (Services) -> `ContactMap`

### 3. The AI's Role (The "Architect")
The AI does **Configuration, not Coding**.
*   **Input:** "I sell handmade soaps."
*   **Selection:** AI chooses "Boutique" Blueprint.
*   **Customization:**
    *   Selects `HeroSplit`.
    *   Writes Copy: "Natural glow for your skin."
    *   Sets Color Theme: `Lavender` & `Cream`.
    *   Populates `props`: `{ title: "...", image: "soap.jpg", cta: "Shop Now" }`

## Benefits
1.  **Consistency:** Every store looks professional because the *bones* are professional.
2.  **Speed:** Instant loading (no code generation, just JSON config).
3.  **Flexibility:** AI can mix-and-match blocks if the standard blueprint isn't quite right.

## Proposed Data Structure (JSON)
```json
{
  "store_id": "123",
  "theme": {
    "primary": "#ff0000",
    "font": "Inter"
  },
  "sections": [
    {
      "type": "HeroSplit",
      "props": {
        "title": "Best Soaps in Town",
        "image_url": "..."
      }
    },
    {
      "type": "ProductGrid",
      "props": { "category": "best-sellers" }
    }
  ]
}
```

## Next Steps
1.  **Audit:** Identify the top 3-5 "Master Templates" we need (Retail, Food, Service).
2.  **Build:** Create the "Lego Blocks" (React Components) for these templates.
3.  **Map:** Write the prompt that teaches Gemini how to pick the right block for the user's intent.
