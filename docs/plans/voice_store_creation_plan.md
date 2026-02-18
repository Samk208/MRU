# 🧠 Brainstorming: Voice-First Store Creation

**Status:** Plan Proposed
**Date:** 2026-02-17
**Goal:** Enable users to create a store via conversational AI (Voice/Text) with validation.

---

## 1. User Journey (Web-First)

1.  **Trigger:** User clicks "Create Store" (Microphone Icon) on Dashboard.
2.  **Input:** User speaks: "I sell rice and beans in Douala."
3.  **Processing:**
    *   **Transcription:** Whisper API converts audio to text.
    *   **Intent:** AI identifies `CREATE_STORE`.
    *   **Extraction:**
        *   Store Name: ??? (Missing)
        *   Product: "Rice", "Beans"
        *   Location: "Douala"
4.  **Clarification Loop (Chat):**
    *   **AI:** "Got it, rice and beans in Douala. What should we name your shop?"
    *   **User:** "Mama's Kitchen."
5.  **Confirmation:**
    *   **AI:** "Creating 'Mama's Kitchen' with products: Rice, Beans. Does this look right?"
    *   **User:** "Yes."
6.  **Action:**
    *   Creates Store Record.
    *   Creates 2 Product Records.
    *   Redirects to Store Dashboard.

---

## 2. Architecture & Tech Stack

### Frontend (Next.js)
*   **Interface:** `useChat` from Vercel AI SDK.
*   **Input:** Text area + Mic button (using `MediaRecorder` API).
*   **State:** Streaming UI for real-time feedback.

### Backend (Supabase Edge Functions)
*   **Function:** `chat-store-creator`
*   **Model:** Gemini 1.5 Flash (Fast, low cost).
*   **System Prompt:** "You are a helpful assistant for African merchants. Extract structured data (JSON) for store creation. Ask clarifying questions if name or products are missing."

### Database Schema
*   **New Table:** `storefronts`
    *   `id`: UUID
    *   `vendor_id`: UUID (Foreign Key)
    *   `name`: Text
    *   `slug`: Text (Unique, URL-friendly)
    *   `description`: Text
    *   `currency`: Text (Default 'XAF')

---

## 3. URL Strategy (SEO Friendly)

**Decision:** Path-based Routing
**Format:** `mru.com/shop/[slug]`

*   **Example:** `mru.com/shop/mamas-rice-kitchen`
*   **Why:**
    *   **SEO:** Keywords in URL help ranking.
    *   **Easy:** No wildcard DNS or complex subdomain config needed locally.
    *   **Portable:** Works on any host (Vercel, Netlify, Docker).

**Slug Generation Logic:**
1.  Take `store_name`: "Mama's Rice Kitchen"
2.  Slugify: `mamas-rice-kitchen`
3.  **Check Uniqueness:** If exists, append random suffix or location?
    *   *Correction:* Better to append location: `mamas-rice-kitchen-douala`
    *   *Fallback:* `mamas-rice-kitchen-123`

---

## 4. Implementation Steps

1.  **Database Migration:** Create `storefronts` table.
2.  **Edge Function:** Set up `gemini-store-creator`.
3.  **UI Component:** Build `<VoiceStoreCreator />` with `useChat`.
4.  **Integration:** Connect UI to Edge Function.
5.  **Testing:** Verify "Happy Path" and "Clarification Path".
