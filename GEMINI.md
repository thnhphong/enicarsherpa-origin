# GEMINI.md - Enicar Chronicle

This document provides instructional context for Gemini CLI when working on the **Enicar Chronicle** project.

## Project Overview

**Enicar Chronicle** is an interactive storytelling website built to present the history and products of the Enicar watch brand. It is designed to clone the interaction style and aesthetic of the [Omega Chronicle](https://www.omegawatches.com/chronicle/), featuring scroll-driven storytelling, timeline animations, and a premium responsive UI.

### Core Tech Stack
- **Frontend:** React 19, Vite, TypeScript
- **Styling:** TailwindCSS v4 (configured via `@theme` in `src/index.css`)
- **Animations:** 
  - **Framer Motion:** Component-level entrance/exit and interactive animations.
  - **GSAP + ScrollTrigger:** Advanced scroll-driven storytelling (pinning, scrubbing).
- **Icons:** Lucide-React
- **State/Hooks:** standard React hooks + `react-use`

---

## Building and Running

| Command | Action |
|---------|--------|
| `npm run dev` | Starts the development server at `http://localhost:5173`. |
| `npm run build` | Runs TypeScript compilation (`tsc -b`) and Vite production build. |
| `npm run lint` | Executes ESLint on all `.ts` and `.tsx` files. |
| `npm run preview` | Previews the production build locally. |

> **Note:** No testing framework is currently configured. Do not introduce one without explicit user approval.

---

## Development Conventions

### 1. TypeScript & Code Style
- **Strict Mode:** Always enabled. Avoid `any` at all costs.
- **Imports:**
  - Use `import type` for type-only imports (e.g., `import type { Product } from './data/productsData'`).
  - Order: React → External Libraries → Internal Components/Data.
- **Exports:** 
  - Use **named exports** for all components (`export const Component = ...`).
  - Use **default exports** only for entry points (`App.tsx`, `main.tsx`).
- **Interfaces:** Prefer `interface` over `type` for data shapes. Define interfaces in the same file as the data or a dedicated `.ts` file in `src/data/`.

### 2. Styling (TailwindCSS v4)
- **Theme:** Configured in `src/index.css` using the `@theme` directive. **Do not use `tailwind.config.js`**.
- **Colors:** Use theme variables:
  - `gold`: `#D4AF37` (Primary accent)
  - `charcoal`: `#FFFFFF` (Background - *Wait, check index.css for actual values*)
  - `ivory`: `#121212` (Text)
  - `yellow`: `#FFDE17` (Used in Timeline)
- **Fonts:** `font-sans` (Outfit), `font-serif` (Playfair Display).

### 3. Component Architecture
- **Location:** `src/components/`.
- **Naming:** PascalCase for component files (e.g., `Hero.tsx`) and functions.
- **Animations:** 
  - Prefer `motion.div` for entry animations.
  - Use GSAP for pinning sections or complex scroll-scrubbing.
  - **Caution:** Do not mix GSAP and Framer Motion on the same DOM element.

### 4. Data Management
- **Static Data:** Located in `src/data/` (e.g., `timelineData.ts`, `productsData.ts`).
- **JSON:** Some data may reside in `.json` files (e.g., `src/Timeline.json`) and is imported directly.
- **Assets:** Images should be placed in `src/assets/images/` and referenced relatively or via `/src/assets/...` paths as seen in `Timeline.tsx`.

### 5. Interaction Patterns
- **Scroll Storytelling:** Sections often use `useScroll` from Framer Motion or GSAP `ScrollTrigger`.
- **Preloader:** `App.tsx` manages an `isLoading` state to show a `Preloader` component before revealing the site.

---

## File Structure Reference
- `src/components/`: UI components (Navbar, Hero, Timeline, etc.).
- `src/data/`: Data definitions and interfaces.
- `src/assets/`: Images, icons, and fonts.
- `src/index.css`: Global styles and Tailwind v4 theme configuration.
- `AGENTS.md`: Detailed agent-specific instructions (refer to this for strict linting/style rules).

---

## Success Criteria for Changes
- `npm run lint` passes with no errors.
- `npm run build` completes successfully.
- No `any` types or unused variables/parameters.
- Animations remain smooth and consistent with the "Chronicle" storytelling style.
