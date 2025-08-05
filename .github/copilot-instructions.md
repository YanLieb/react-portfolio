# React Portfolio - Copilot Instructions

## Project Architecture

This is a **React + TypeScript + Vite** portfolio website with **GSAP-heavy animations** and **Tailwind CSS v4**. The architecture is component-based with three main sections:

1. **Hero** (`src/components/Hero/`) - Uses `ScrollSmoother` for smooth scrolling (when enabled)
2. **Projects** (`src/components/Projects/`) - Horizontal scroll galleries with `ScrollTrigger` snap
3. **Contact** - Static section with external links

## Key Technologies & Patterns

### GSAP Animation Architecture

- **useGSAP hook**: Always use with `{ scope: containerRef }` for cleanup
- **ScrollTrigger vs ScrollSmoother**: ScrollSmoother is currently disabled in `App.tsx` due to conflicts with ProjectsList snap functionality. Keep them in separate sections when both are active
- **Animation classes**: Use private ES6 class pattern like `HeroAnim` in `heroAnim.ts`
- **Plugin registration**: Always register GSAP plugins: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother)`

```tsx
// Standard GSAP pattern
useGSAP(
  () => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        pin: true,
        scrub: 1,
      },
    });
  },
  { scope: containerRef }
);
```

### Critical Component Patterns

**ProjectsList**: Implements horizontal scroll with snap points using `gsap.utils.toArray<HTMLDivElement>('.project')` and `xPercent: -100 * (projects.length - 1)`

**Hero**: Complex text animations using `SplitText`, `ScrambleTextPlugin` with font loading awareness (`await document.fonts.ready`)

**Menu**: Shared component with customizable classes (`ulClasses`, `liClasses`) used in both Header and Hero

### Development Workflow

- **Dev server**: `npm run dev` (Vite with SWC for fast refresh)
- **Build**: `npm run build` (TypeScript compilation + Vite build)
- **Fonts**: Custom fonts in `/public/fonts/` with CSS `@font-face` declarations
- **Assets**: SVGs imported as React components via `vite-plugin-svgr` (e.g., `Logo.svg?react`)

### TypeScript Conventions

- **Strict mode**: All files use strict TypeScript with `noUnusedLocals`, `noUnusedParameters`
- **Element typing**: Cast DOM queries explicitly: `document.querySelector(href) as HTMLDivElement`
- **GSAP typing**: Use `gsap.utils.toArray<HTMLDivElement>()` for proper element typing
- **Props**: Simple type definitions like `type ProjectsListProps = { category: string; id: number }`

### Styling Architecture

- **Tailwind v4**: Uses `@theme` syntax in `index.css` for custom properties
- **BEM-like naming**: Component classes follow `component__element--modifier` pattern
- **Responsive**: Desktop-first approach with `sm:` breakpoints
- **Custom fonts**: KulimPark for headings, Ubuntu Sans for body text

### File Organization

```
src/
├── components/
│   ├── Hero/
│   │   ├── Hero.tsx          # Component
│   │   └── heroAnim.ts       # Animation class
│   ├── Projects/
│   │   ├── Projects.tsx      # Container
│   │   └── ProjectsList/     # Nested components
└── assets/svg/              # React-importable SVGs
```

### Common Issues & Solutions

- **ScrollTrigger snap conflicts**: ScrollSmoother conflicts with ProjectsList snap - currently ScrollSmoother is disabled in `App.tsx`
- **Font loading**: Use `await document.fonts.ready` before text animations
- **GSAP cleanup**: Always use `useGSAP` with scope parameter for proper cleanup
- **Element queries**: Scope queries to component containers, not global document

### Planned Features & Architecture

- **Three.js Integration**: `@react-three/fiber` prepared for 3D elements in future iterations
- **GLSL Shaders**: `vite-plugin-glsl` configured for custom shader development (`.vert`, `.frag`, `.glsl` files)
- **Backend API**: NodeJS backend planned for dynamic project data
- **Data Architecture**: Currently uses hardcoded project loops, will transition to API-driven content

### Key Dependencies

- `@gsap/react` - Official GSAP React integration
- `vite-plugin-svgr` - SVG as React components
- `vite-plugin-glsl` - GLSL shader support for Three.js
- `tailwindcss` v4 - Latest Tailwind with new syntax
- `@react-three/fiber` & `@react-three/drei` - Three.js React ecosystem
- `three` - 3D graphics library
