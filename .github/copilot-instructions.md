# React Portfolio - Copilot Instructions

## Project Architecture

This is a **React + TypeScript + Vite** portfolio website with **GSAP-heavy animations** and **Tailwind CSS v4**. The architecture is component-based with three main sections:

1. **Hero** (`src/components/Hero/`) - Complex text animations with ScrollTrigger
2. **ProjectsList** (`src/components/Projects/`) - Multi-category horizontal sliders with GSAP Observer
3. **Contact** - Static section with external links

## Key Technologies & Patterns

### GSAP Animation Architecture

- **useGSAP hook**: Always use with `{ scope: containerRef, dependencies: [stateVar] }` for cleanup and re-initialization
- **Animation classes**: Use private ES6 class pattern like `HeroAnim` in `HeroAnim.ts` with constructor injection
- **Plugin registration**: Always register GSAP plugins at module level: `gsap.registerPlugin(Observer, SplitText)`
- **ScrollTrigger positioning**: Use `start: \`-=\${window.scrollY}px\`` for scroll-position-aware triggers

```tsx
// Standard GSAP pattern with state dependencies
useGSAP(() => {
  if (!containerRef.current) return;
  // GSAP logic here
}, { scope: containerRef, dependencies: [activeCategoryId] });
```

### Critical Component Patterns

**ProjectsList**: Multi-category slider with state-driven re-initialization
- Uses `activeCategoryId` state to switch between categories (JavaScript, WordPress, PrestaShop)
- `useMemo` with `[activeCategoryId]` dependency for category data recalculation
- `useGSAP` with `dependencies: [activeCategoryId]` to reinitialize animations on category change
- GSAP Observer for swipe/click interactions with duplicate prevention (`index === currentIndex`)

**Animation Classes**: Constructor-based pattern for complex animations
```tsx
// HeroAnim.ts - Class with private container field
export default class HeroAnim {
  #container: HTMLDivElement;
  constructor(container: HTMLDivElement) {
    this.#container = container;
  }
}
```

**HeaderAnim**: Scroll-position-aware animations using `window.scrollY` offset for immediate activation

### State Management Patterns

**Category Switching**: Single active category pattern
```tsx
const [activeCategoryId, setActiveCategoryId] = useState(1);
const setActiveCategory = (categoryId: number) => (e: React.MouseEvent) => {
  e.preventDefault();
  setActiveCategoryId(categoryId);
}
// Only category with matching ID gets isActive: true
isActive: activeCategoryId === id
```

### GSAP Observer Interaction Patterns

**Click Prevention**: Avoid duplicate actions on active elements
```tsx
if (target.closest('.projects__list-item') === entry) {
  if (index === currentIndex) return; // Prevent clicking active item
  slide(index);
}
```

**Direction Calculation**: Intelligent shortest-path sliding
```tsx
const forwardDistance = (followingIndex - currentIndex + totalSlides) % totalSlides;
const backwardDistance = (currentIndex - followingIndex + totalSlides) % totalSlides;
const shouldGoForward = forwardDistance <= backwardDistance;
```

### Development Workflow

- **Dev server**: `npm run dev:front` (from root) or `npm run dev` (from front/)
- **Build**: `npm run build` (TypeScript compilation + Vite build)
- **Project structure**: Monorepo with `/front` containing React app
- **Fonts**: Custom fonts in `/public/fonts/` with CSS `@font-face` declarations

### Common Issues & Solutions

- **useGSAP dependencies**: Always include state variables that affect DOM structure in `dependencies` array
- **Observer passive events**: Replace `<a>` links with clickable `<div>` + `<span>` to avoid preventDefault errors
- **SplitText cleanup**: Call `.revert()` on SplitText instances in timeline `onComplete` callbacks
- **Font loading**: Use `await document.fonts.ready` before complex text animations
- **Scroll conflicts**: ScrollSmoother enabled in App.tsx, ensure no conflicts with Observer interactions

### File Organization

```
front/src/components/
├── Hero/
│   ├── Hero.tsx              # Component with useGSAP
│   └── HeroAnim.ts           # Animation class
├── Projects/
│   ├── ProjectsList.tsx      # Main container with category state
│   ├── Project.tsx           # Individual project component
│   └── ProjectsMenu.tsx      # Category-specific project menu
├── Header/
│   ├── Header.tsx            # Component
│   └── HeaderAnim.ts         # Animation class
└── Menu/
    └── Menu.tsx              # Shared menu with customizable classes
```

### TypeScript Conventions

- **Strict mode**: `noUnusedLocals`, `noUnusedParameters` enabled
- **GSAP typing**: Use `gsap.utils.toArray<HTMLDivElement>()` for proper element typing
- **Event handlers**: Curry functions for parameterized event handlers: `(id: number) => (e: React.MouseEvent) => {}`
- **Private fields**: Use `#` syntax for private class fields

### Key Dependencies

- `@gsap/react` - Official GSAP React integration with useGSAP hook
- `vite-plugin-svgr` - SVG imports as React components (`Logo.svg?react`)
- `vite-plugin-glsl` - GLSL shader support for future Three.js integration
- `tailwindcss` v4 - Latest Tailwind with `@theme` syntax in CSS
