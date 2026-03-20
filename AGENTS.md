# AGENTS.md

**Project:** Enicar Chronicle — Interactive storytelling website for the Enicar watch brand.
**Stack:** React 19 + Vite + TypeScript + TailwindCSS v4 + Framer Motion + GSAP

---

## Project Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # TypeScript compile (tsc -b) + Vite production build
npm run lint     # Run ESLint on all .ts/.tsx files
npm run preview  # Preview production build locally
```

> No test framework is currently configured. Do not add one without user approval.

---

## Code Style

### TypeScript

- **Strict mode enabled** — no `any`, no implicit `any`
- `noUnusedLocals: true` — never commit unused local variables
- `noUnusedParameters: true` — never commit unused function parameters
- `verbatimModuleSyntax: true` — always use `import type` for type-only imports:

  ```ts
  // Correct
  import type { Product } from "../data/productsData";
  import { useState } from "react";

  // Wrong — type-only values should not be imported as values
  // import { Product } from '../data/productsData'; // ❌
  ```

- Define data shapes with `interface`, not `type` aliases, unless union/intersection is needed
- Place interfaces in the same file as the data (e.g., `productsData.ts` exports `Product` interface alongside data)

### ESLint

- Uses **ESLint 9 flat config** (`eslint.config.js`)
- Extends: `@eslint/js/recommended`, `typescript-eslint/recommended`, `react-hooks/recommended`, `react-refresh/vite`
- No Prettier config found — do not auto-format unless user requests it

### Imports

- **Named exports** for all components:
  ```ts
  export const Navbar = () => { ... };
  // import { Navbar } from './components/Navbar';
  ```
- **Default export** only for entry points (`App`, `main.tsx`):
  ```ts
  export default App;
  ```
- **External library imports** (order: React → external → internal):
  ```ts
  import { useState } from "react";
  import { motion } from "framer-motion";
  import { Menu, X } from "lucide-react";
  import { Navbar } from "./components/Navbar";
  ```

### Component Patterns

```tsx
import { motion } from "framer-motion";
import { SomeIcon } from "lucide-react";
import { useState } from "react";

export const ComponentName = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="...">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="..."
      >
        {/* content */}
      </motion.div>
    </section>
  );
};
```

- Always use `motion.` components from `framer-motion` for animated elements
- Prefer `motion.div` over CSS animations for interactive/entry animations
- GSAP is used for advanced scroll-driven storytelling (pinning, scrubbing)

### Naming Conventions

| Thing          | Convention                | Example                              |
| -------------- | ------------------------- | ------------------------------------ |
| Components     | PascalCase, named export  | `export const ProductShowcase`       |
| Interfaces     | PascalCase                | `interface Product { ... }           |
| Data constants | camelCase                 | `productsData`, `timelineData`       |
| File names     | PascalCase for components | `Navbar.tsx`, `Hero.tsx`             |
| File names     | camelCase for data/utils  | `productsData.ts`, `timelineData.ts` |
| CSS classes    | kebab-case (Tailwind)     | `className="text-cyan"`              |
| CSS variables  | kebab-case                | `--color-cyan`, `--font-sans`        |
| Event handlers | `handle{Noun}`            | `handleClick`, `handleOpen`          |

### TailwindCSS v4

- Config lives in `src/index.css` using `@theme` directive — **no `tailwind.config.js`**
- Custom theme colors:
  - `cyan` (#00bcf2) — primary accent
  - `yellow` (#ffde17) — timeline/highlight
  - `red` (#a53134) — preloader, badges
  - `black` (#231f20) — text
  - `white` (#ffffff) — background
- Fonts: `font-sans` (Outfit), `font-serif` (Playfair Display)
- Custom utilities (defined in `index.css`):
  - `.glass` — `bg-white/80 backdrop-blur-md border border-black/10`
  - `.pinned-section` — `relative w-full h-screen flex items-center justify-center overflow-hidden`
  - `.story-content` — `max-w-4xl mx-auto px-6 z-10`

### GSAP / Scroll Animations

- GSAP is used for **scroll-pinned storytelling sections** (see `Timeline.tsx`)
- Use `ScrollTrigger` for pinning and scrubbing
- Use Framer Motion for component-level entrance/exit animations
- Do not mix GSAP and Framer Motion on the same animated element

### Error Handling

- No global error boundary currently exists — do not add one without user approval
- Use `try/catch` for async operations
- Never swallow errors silently

### Working with Data Files

- Data lives in `src/data/` as `.ts` files exporting both the interface and data array
- JSON files (e.g., `Timeline.json`) are imported directly:
  ```ts
  import timelineData from "../Timeline.json";
  ```
- Image paths in data use `/assets/` (public directory):
  ```ts
  image: '/assets/sherpa-graph.png',
  ```

---

## Code Review Checklist

Before marking work complete:

- [ ] `npm run lint` passes with zero errors
- [ ] `npm run build` produces a valid `dist/` without TypeScript errors
- [ ] No `any` types introduced
- [ ] No unused variables or parameters
- [ ] All imports use `import type` for type-only imports
- [ ] Components use named exports
- [ ] No console.log/debugger statements left in code
- [ ] Custom theme colors used instead of hardcoded hex values in JSX
