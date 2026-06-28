# DESIGN_TOKENS.md — All Design Tokens in One Place

> **The complete token reference. Copy-paste ready.**
>
> **Version**: 1.0.0

---

## 1. Spacing Tokens

```css
--space-0:  0px;
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-14: 56px;
--space-16: 64px;
--space-18: 72px;
--space-20: 80px;
--space-24: 96px;
```

## 2. Radius Tokens

```css
--radius-0:    0px;
--radius-sm:   6px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-2xl:  20px;
--radius-full: 9999px;
```

## 3. Typography Tokens

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Menlo, monospace;

--text-xs:      11px;
--text-sm:      12px;
--text-base-sm: 13px;
--text-base:    14px;
--text-md:      16px;
--text-lg:      18px;
--text-xl:      20px;
--text-2xl:     24px;
--text-3xl:     30px;
--text-4xl:     36px;
--text-5xl:     48px;

--leading-tight:   1.2;
--leading-snug:    1.33;
--leading-normal:  1.5;
--leading-relaxed: 1.625;

--tracking-tighter: -0.04em;
--tracking-tight:    -0.02em;
--tracking-normal:   0;
--tracking-wide:     0.025em;
--tracking-wider:    0.05em;
--tracking-widest:   0.1em;
```

## 4. Motion Tokens

```css
--duration-instant:   0ms;
--duration-fast:      150ms;
--duration-normal:    200ms;
--duration-slow:      300ms;
--duration-slower:    400ms;
--duration-cinematic: 600ms;

--ease-default:  cubic-bezier(0.22, 1, 0.36, 1);
--ease-in:       cubic-bezier(0.4, 0, 1, 1);
--ease-out:      cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-linear:   linear;
```

## 5. Elevation Tokens

```css
/* Light */
--shadow-1: 0 1px 2px rgba(0,0,0,0.04);
--shadow-2: 0 2px 8px rgba(0,0,0,0.06);
--shadow-3: 0 4px 16px rgba(0,0,0,0.08);
--shadow-4: 0 8px 32px rgba(0,0,0,0.10);
--shadow-5: 0 12px 40px rgba(0,0,0,0.12);

/* Dark */
--shadow-1-dark: 0 1px 2px rgba(0,0,0,0.3);
--shadow-2-dark: 0 2px 8px rgba(0,0,0,0.4);
--shadow-3-dark: 0 4px 16px rgba(0,0,0,0.5);
--shadow-4-dark: 0 8px 32px rgba(0,0,0,0.6);
--shadow-5-dark: 0 12px 40px rgba(0,0,0,0.7);
```

## 6. Glassmorphism Tokens

```css
--glass-bg:       rgba(255, 255, 255, 0.72);  /* light */
--glass-bg-dark:  rgba(20, 26, 33, 0.72);     /* dark */
--glass-border:       rgba(255, 255, 255, 0.18);
--glass-border-dark:  rgba(255, 255, 255, 0.06);
--glass-blur:     20px;
--glass-saturate: 180%;
```

## 7. Z-Index Tokens

```css
--z-base:        0;
--z-dropdown:    1000;
--z-sticky:      1100;
--z-overlay:     1200;
--z-modal:       1300;
--z-popover:     1400;
--z-toast:       1500;
--z-tooltip:     1600;
--z-map-controls: 500;
--z-map-overlay:  600;
```

## 8. Color Tokens (Summary)

See `02_COLORS.md` for the complete color token system. Key tokens:

```css
/* Surfaces */
--surface-canvas, --surface-card, --surface-card-muted, --surface-overlay, --surface-inverse

/* Text */
--text-primary, --text-secondary, --text-muted, --text-subtle, --text-inverse, --text-accent, --text-on-accent

/* Borders */
--border-default, --border-strong, --border-accent, --border-subtle

/* Accent */
--accent, --accent-hover, --accent-pressed, --accent-subtle

/* Status */
--success, --warning, --danger, --info (each with -hover, -subtle, -text)

/* Severity */
--severity-1 through --severity-5 (each with -bg, -text)

/* Agents */
--agent-1 through --agent-9 (each with -light, -bg)
--agent-followup

/* Map */
--map-bg, --map-water, --map-land, --map-road, --map-text
```

## 9. TypeScript Constants

```ts
// lib/constants.ts

export const SPACING = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24,
  8: 32, 10: 40, 12: 48, 14: 56, 16: 64, 18: 72, 20: 80, 24: 96,
} as const

export const RADIUS = {
  none: 0, sm: 6, md: 8, lg: 12, xl: 16, '2xl': 20, full: 9999,
} as const

export const DURATION = {
  instant: 0, fast: 150, normal: 200, slow: 300, slower: 400, cinematic: 600,
} as const

export const EASING = {
  default: [0.22, 1, 0.36, 1],
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
  inOut: [0.4, 0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const

export const AGENT_COLORS = {
  1: { name: 'Capture', color: '#64748B', light: '#94A3B8' },
  2: { name: 'Vision', color: '#6366F1', light: '#818CF8' },
  3: { name: 'Severity', color: '#F59E0B', light: '#FBBF24' },
  4: { name: 'Jurisdiction', color: '#0EA5E9', light: '#38BDF8' },
  5: { name: 'Duplicate Detection', color: '#8B5CF6', light: '#A78BFA' },
  6: { name: 'Impact Prediction', color: '#A78BFA', light: '#C4B5FD' },
  7: { name: 'Community Verification', color: '#10B981', light: '#34D399' },
  8: { name: 'Repair Recommendation', color: '#F97316', light: '#FB923C' },
  9: { name: 'Government Routing', color: '#EF4444', light: '#F87171' },
  followup: { name: 'Follow-up', color: '#64748B', light: '#94A3B8' },
} as const

export const SEVERITY_COLORS = {
  1: { color: '#A8A29E', label: 'Cosmetic' },
  2: { color: '#38BDF8', label: 'Minor' },
  3: { color: '#FBBF24', label: 'Moderate' },
  4: { color: '#FB923C', label: 'Serious' },
  5: { color: '#F87171', label: 'Dangerous' },
} as const

export const STATUS_COLORS = {
  new: '#6366F1',
  confirmed: '#818CF8',
  routed: '#0EA5E9',
  in_progress: '#F59E0B',
  fixed: '#10B981',
  closed: '#6EE7B7',
  disputed: '#F87171',
  hidden: '#A8A29E',
} as const
```

---

## End of DESIGN_TOKENS.md
