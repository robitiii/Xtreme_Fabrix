# Xtreme Fabrix Theme Guide

This file documents the visual theme used in the Xtreme Fabrix Solutions website: colors, gradients, and typography. It is meant as a **design reference** for future work or other projects that want to reuse this look.

---

## 1. Core Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (with CSS variables)
- **Base font:** `Inter`
- **Theme mode:** Dark-first (black background, light text)

All main colors are defined as **HSL CSS variables** in `src/index.css` and exposed through Tailwind tokens in `tailwind.config.ts`.

---

## 2. Design Tokens (CSS Variables)

Defined under `:root` in `src/index.css`.

### 2.1 Surface & Text

- `--background: 0 0% 0%`  
  Deep Black `#000000`
- `--foreground: 0 0% 100%`  
  Pure White `#FFFFFF`

- `--card: 0 0% 11%`  
  Dark Card Grey `#1C1C1C`
- `--card-foreground: 0 0% 100%`

- `--popover: 0 0% 11%`
- `--popover-foreground: 0 0% 100%`

- `--border: 0 0% 18%`  
  Border Grey `#2E2E2E`
- `--input: 0 0% 11%`

- `--muted: 0 0% 11%`
- `--muted-foreground: 0 0% 70%`

- `--destructive: 0 84% 60%`
- `--destructive-foreground: 0 0% 100%`

- `--ring: 54 94% 54%`  
  Bright Yellow focus outline

- `--radius: 0.5rem`  
  Base border radius for components

### 2.2 Brand Palette

**Brand Identity Colors**

- `--brand-yellow: 54 94% 54%`  
  Bright Yellow `#F8E71C` (primary accent)
- `--brand-purple: 264 100% 56%`  
  Vibrant Purple `#8C1EFF` (secondary accent)
- `--brand-white: 0 0% 100%`  
  Pure White `#FFFFFF`
- `--brand-black: 0 0% 0%`  
  Deep Black `#000000`
- `--brand-grey-dark: 0 0% 11%`  
  Dark Grey `#1C1C1C`
- `--brand-grey-medium: 0 0% 18%`  
  Medium Grey `#2E2E2E`

**Legacy Automotive Colors** (kept for compatibility / potential use)

- `--automotive-red: 0 84% 60%`
- `--industrial-grey: 0 0% 40%`
- `--metallic-grey: 0 0% 70%`
- `--charcoal: 0 0% 15%`
- `--deep-black: 0 0% 0%`

### 2.3 Gradients & Effects

- `--gradient-hero`
  - `linear-gradient(135deg, hsl(0 0% 0%) 0%, hsl(264 100% 56% / 0.2) 100%)`
  - Used behind hero sections for a subtle purple glow over black.

- `--gradient-card`
  - `linear-gradient(145deg, hsl(0 0% 11%) 0%, hsl(0 0% 18%) 100%)`
  - Soft depth on cards / panels.

- `--gradient-accent`
  - `linear-gradient(135deg, hsl(54 94% 54%) 0%, hsl(264 100% 56%) 100%)`
  - Strong yellow → purple gradient for highlight areas.

- `--gradient-purple`
  - `linear-gradient(135deg, hsl(264 100% 56%) 0%, hsl(264 80% 45%) 100%)`

- `--shadow-glow-yellow: 0 0 40px hsl(54 94% 54% / 0.4)`
- `--shadow-glow-purple: 0 0 40px hsl(264 100% 56% / 0.4)`
- `--shadow-card: 0 10px 30px -10px hsl(0 0% 0% / 0.5)`
- `--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

The `.dark` selector in `index.css` mirrors the same palette, since the design is already optimized for a dark UI.

---

## 3. Tailwind Theme Mapping

Configured in `tailwind.config.ts` under `theme.extend.colors`:

### 3.1 Semantic Colors

- `bg-background` → `hsl(var(--background))`
- `text-foreground` → `hsl(var(--foreground))`
- `border-border` → `hsl(var(--border))`
- `bg-card` / `text-card-foreground` → card surfaces
- `bg-popover` / `text-popover-foreground`

- `text-muted-foreground` → softer copy text
- `bg-muted` → subtle surfaces / chips

### 3.2 Primary & Secondary

- `text-primary`, `bg-primary` → brand yellow  
  `primary.DEFAULT = hsl(var(--primary))`
- `text-primary-foreground` → black on yellow

- `text-secondary`, `bg-secondary` → dark grey  
  `secondary.DEFAULT = hsl(var(--secondary))`

### 3.3 Accent & Status

- `bg-accent`, `text-accent-foreground` → purple accent
- `bg-destructive`, `text-destructive-foreground` → error states

### 3.4 Brand & Automotive Utilities

Available if you want explicit brand colors in components:

- `text-brand-yellow`, `bg-brand-yellow`
- `text-brand-purple`, `bg-brand-purple`
- `text-brand-black`, `bg-brand-black`
- `text-brand-grey-dark`, `bg-brand-grey-dark`
- `text-brand-grey-medium`, `bg-brand-grey-medium`

Automotive extras:

- `text-automotive-red`, `bg-automotive-red`
- `text-automotive-grey`, `bg-automotive-grey`
- `text-automotive-metallic`, `bg-automotive-metallic`
- `text-automotive-charcoal`, `bg-automotive-charcoal`

(These are defined via `automotive: { red, grey, metallic, charcoal }` in `tailwind.config.ts`.)

---

## 4. Typography System

### 4.1 Base Font

From `tailwind.config.ts` and `index.css`:

- **Font family:** `Inter`
- **Fallbacks:** `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `system-ui`, `sans-serif`

Tailwind `fontFamily.sans` is configured as:

```ts
fontFamily: {
  sans: ["Inter", "system-ui", "sans-serif"],
}
```

Global body style in `index.css`:

```css
body {
  @apply bg-background text-foreground;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

Headings use:

```css
h1, h2, h3, h4, h5, h6 {
  @apply font-bold tracking-tight;
}
```

### 4.2 Practical Usage

- **Page titles / hero headings**  
  - Tailwind: `text-5xl md:text-6xl font-black tracking-tight`  
  - Use `text-primary` or wrap parts in brand spans for emphasis.

- **Section headings**  
  - `text-3xl–4xl font-black`  
  - Often paired with `text-primary` span for highlighted words.

- **Body text**  
  - `text-base` / `text-lg`  
  - Use `text-muted-foreground` for secondary copy.

---

## 5. Custom Utility Classes

Defined under `@layer components` in `src/index.css`:

- `.hover-lift`  
  - `transition-all duration-300 hover:scale-105 hover:shadow-2xl`  
  - Use on cards or buttons for a subtle 3D lift effect.

- `.gradient-text`  
  - `bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`  
  - Use on headlines for yellow → purple gradient text.

- `.glow-effect`  
  - `drop-shadow(0 0 20px hsl(var(--primary) / 0.5))`  
  - Yellow glow; good for icons/buttons.

- `.glow-effect-purple`  
  - Purple variant of the glow.

- `.brand-gradient`  
  - `background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);`  
  - Use as a background for hero CTAs or highlight blocks.

---

## 6. Quick Copy–Paste Patterns

### Hero Section Background

- Container: `bg-gradient-to-br from-background via-card to-background`
- Heading: `text-5xl md:text-6xl font-black`
- Accent word: `text-primary` or `gradient-text`

### Primary CTA Button

- `variant="hero"` or `variant="cta"` (from the app's UI kit)  
- Tailwind combination: `bg-primary text-primary-foreground hover:bg-primary/90`

### Card Surface

- `bg-card border border-border rounded-xl shadow-[var(--shadow-card)]`

---

## 7. Reusing This Theme in Another Project

1. **Copy variables:**
   - Copy the `:root` and `.dark` blocks from `src/index.css`.
2. **Copy Tailwind config pieces:**
   - `theme.extend.colors`
   - `fontFamily.sans`
   - Any keyframes/animations you want.
3. **Import Inter font:**
   - Via Google Fonts (see `index.html`) or self-host.
4. **Apply global styles:**
   - Ensure `body` uses `bg-background` and `text-foreground`.

This will reproduce the same general look: black automotive background, bright yellow accents, purple glow, and Inter-based typography.
