# Codex Handover - SyncTeamAI Lander Next.js

## Repo
- Current repo: `C:\Users\Marc\Documents\MotorHome\syncteamai-landernextjs`
- Legacy SPA is no longer used.

## Stack
- Next.js App Router + React + TypeScript
- Tailwind v3 (configured)
- No shadcn/ui

## What was completed
- Landing page refactor to waitlist-first with new copy and sections.
- `/progress` route now serves ebook presell page (BookPage).
- Removed old Dev Progress content.
- Added `not-found.tsx`.
- Updated site metadata copy for waitlist focus.
- Added YouTube embed to landing page (standard embed).
- Fixed `gtag` client error and lint errors related to `any` and unescaped entities.

## Key files
- Landing page: `src/components/HomePage.tsx`
- Ebook page: `src/components/BookPage.tsx`
- Route wiring: `src/app/page.tsx`, `src/app/progress/page.tsx`
- Metadata: `src/lib/site.ts`, `src/app/layout.tsx`
- NotFound: `src/app/not-found.tsx`

## Current UX details
- Hero H1: "SyncTeamAI Conference"
- Primary CTA: waitlist form with "Join the Waiting List"
- Secondary CTA only in "While you're on the waiting list..." section (no right-side duplicate).
- YouTube embed on landing: `https://www.youtube.com/embed/jHIy8Tjx56I`

## Pending / To-Do
1. Add book cover image (user will upload later).
   - Place file in `public/images/` (e.g., `book-cover.jpg`).
   - Replace the placeholder in `src/components/BookPage.tsx` with an `<img>` or `next/image` using `/images/book-cover.webp`.
2. Optional: Add the same video to the book page if desired (user said keep it on landing only).

## Notes on gtag
- `HomePage.tsx` uses a typed `track` helper with `window.gtag` and `dataLayer` guard.
- `ShareActions.tsx` calls `window.gtag` only if defined.

## Tests / Lint
- `npm run lint` should pass (fixed explicit `any` + escaped apostrophes).
- No tests configured.

## Quick commands
```bash
npm run lint
npm run build
```
