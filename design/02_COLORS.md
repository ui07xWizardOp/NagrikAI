# COLORS.md — NagrikAI Color Token System

> **The complete color specification for NagrikAI.**
> Pastel-first, dual-theme (light + dark), semantically mapped, accessibility-verified.
>
> **Version**: 1.0.0 | **Last updated**: 2026-06-27

---

## Table of Contents

1. [Color Philosophy](#1-color-philosophy)
2. [Pastel Palette Derivation](#2-pastel-palette-derivation)
3. [Primitive Tokens](#3-primitive-tokens)
4. [Semantic Tokens](#4-semantic-tokens)
5. [Component Tokens](#5-component-tokens)
6. [State Tokens](#6-state-tokens)
7. [Severity Tokens](#7-severity-tokens)
8. [Agent Tokens (9 Agents)](#8-agent-tokens)
9. [Map Tokens](#9-map-tokens)
10. [Chart Tokens](#10-chart-tokens)
11. [Government Tokens](#11-government-tokens)
12. [Status Tokens](#12-status-tokens)
13. [Light Theme](#13-light-theme)
14. [Dark Theme](#14-dark-theme)
15. [Accessibility Pairs](#15-accessibility-pairs)
16. [Tailwind Configuration](#16-tailwind-configuration)
17. [CSS Variables](#17-css-variables)
18. [shadcn/ui Mapping](#18-shadcnui-mapping)
19. [Usage Guidelines](#19-usage-guidelines)

---

## 1. Color Philosophy

NagrikAI's color system is built on three principles:

1. **Pastel-first**: Every color is softened toward gray. No pure saturated hues. This creates the "calm" feeling that distinguishes NagrikAI from typical government apps.
2. **Semantic mapping**: Components never reference primitive colors directly. They reference semantic tokens (`button-primary-bg`, `text-muted`, `border-default`) which are mapped to primitives.
3. **Dual-theme native**: Light and dark themes are designed in parallel, not derived. Each has its own carefully tuned values.

### The Pastel Formula

Every NagrikAI color is derived from a saturated hue using this formula:

```
pastel_color = mix(saturated_hue, neutral_gray, 35-50%)
```

This means:
- Indigo `#6366F1` → pastel indigo `#818CF8` (light) / `#A5B4FC` (lighter)
- Red `#EF4444` → pastel red `#F87171` → softer `#FCA5A5`
- Green `#10B981` → pastel green `#34D399` → softer `#6EE7B7`

The result is a palette that feels like **watercolor**, not **crayon**.

---

## 2. Pastel Palette Derivation

### Hue Families (8 families, 11 shades each = 88 primitive tokens)

| Family | Base Hue | Mood | Primary Use |
|--------|----------|------|-------------|
| **Indigo** | #6366F1 | Trust, intelligence | Brand primary, AI |
| **Sky** | #0EA5E9 | Calm, spatial | Maps, info |
| **Mint** | #10B981 | Success, growth | Verified, resolved |
| **Amber** | #F59E0B | Caution, attention | Warnings, severity 2-3 |
| **Coral** | #F87171 | Urgency, danger | Severity 4-5, errors |
| **Lavender** | #A78BFA | Insight, prediction | Hotspot predictions |
| **Peach** | #FB923C | Warmth, community | Karma, civic engagement |
| **Slate** | #64748B | Neutral, structural | Text, borders, surfaces |

### Shade Scale (50-950)

Each family follows the same 11-step scale:

| Shade | Usage | Lightness |
|-------|-------|-----------|
| 50 | Backgrounds, tints | 97% |
| 100 | Subtle backgrounds | 94% |
| 200 | Borders, dividers | 86% |
| 300 | Disabled states | 75% |
| 400 | Dark mode primary | 65% |
| 500 | Light mode primary | 55% |
| 600 | Hover states | 48% |
| 700 | Pressed states | 40% |
| 800 | Dark surfaces | 30% |
| 900 | Darker surfaces | 22% |
| 950 | Darkest surfaces | 14% |

---

## 3. Primitive Tokens

### Indigo (Brand Primary)

```css
/* Light mode */
--indigo-50:  #EEF2FF;
--indigo-100: #E0E7FF;
--indigo-200: #C7D2FE;
--indigo-300: #A5B4FC;
--indigo-400: #818CF8;
--indigo-500: #6366F1;
--indigo-600: #4F46E5;
--indigo-700: #4338CA;
--indigo-800: #3730A3;
--indigo-900: #312E81;
--indigo-950: #1E1B4B;
```

### Sky (Info, Maps)

```css
--sky-50:  #F0F9FF;
--sky-100: #E0F2FE;
--sky-200: #BAE6FD;
--sky-300: #7DD3FC;
--sky-400: #38BDF8;
--sky-500: #0EA5E9;
--sky-600: #0284C7;
--sky-700: #0369A1;
--sky-800: #075985;
--sky-900: #0C4A6E;
--sky-950: #082F49;
```

### Mint (Success, Verified)

```css
--mint-50:  #ECFDF5;
--mint-100: #D1FAE5;
--mint-200: #A7F3D0;
--mint-300: #6EE7B7;
--mint-400: #34D399;
--mint-500: #10B981;
--mint-600: #059669;
--mint-700: #047857;
--mint-800: #065F46;
--mint-900: #064E3B;
--mint-950: #022C22;
```

### Amber (Warning, Severity 2-3)

```css
--amber-50:  #FFFBEB;
--amber-100: #FEF3C7;
--amber-200: #FDE68A;
--amber-300: #FCD34D;
--amber-400: #FBBF24;
--amber-500: #F59E0B;
--amber-600: #D97706;
--amber-700: #B45309;
--amber-800: #92400E;
--amber-900: #78350F;
--amber-950: #451A03;
```

### Coral (Danger, Severity 4-5)

```css
--coral-50:  #FEF2F2;
--coral-100: #FEE2E2;
--coral-200: #FECACA;
--coral-300: #FCA5A5;
--coral-400: #F87171;
--coral-500: #EF4444;
--coral-600: #DC2626;
--coral-700: #B91C1C;
--coral-800: #991B1B;
--coral-900: #7F1D1D;
--coral-950: #450A0F;
```

### Lavender (Prediction, AI Insight)

```css
--lavender-50:  #F5F3FF;
--lavender-100: #EDE9FE;
--lavender-200: #DDD6FE;
--lavender-300: #C4B5FD;
--lavender-400: #A78BFA;
--lavender-500: #8B5CF6;
--lavender-600: #7C3AED;
--lavender-700: #6D28D9;
--lavender-800: #5B21B6;
--lavender-900: #4C1D95;
--lavender-950: #2E1065;
```

### Peach (Karma, Community)

```css
--peach-50:  #FFF7ED;
--peach-100: #FFEDD5;
--peach-200: #FED7AA;
--peach-300: #FDBA74;
--peach-400: #FB923C;
--peach-500: #F97316;
--peach-600: #EA580C;
--peach-700: #C2410C;
--peach-800: #9A3412;
--peach-900: #7C2D12;
--peach-950: #431407;
```

### Slate (Neutral, Structural)

```css
--slate-50:  #FAFAF9;   /* warm off-white, not pure white */
--slate-100: #F5F5F4;
--slate-200: #E7E5E4;
--slate-300: #D6D3D1;
--slate-400: #A8A29E;
--slate-500: #78716C;
--slate-600: #57534E;
--slate-700: #44403C;
--slate-800: #292524;
--slate-900: #1C1917;
--slate-950: #0B0F14;   /* near-black, not pure black */
```

---

## 4. Semantic Tokens

Semantic tokens map primitives to meaning. Components reference these, never primitives.

### Surface Tokens

```css
/* Light theme */
--surface-canvas:        #FAFAF9;   /* page background */
--surface-card:          #FFFFFF;   /* card background */
--surface-card-muted:    #F5F5F4;   /* secondary card */
--surface-overlay:       rgba(255, 255, 255, 0.72);  /* glassmorphism */
--surface-inverse:       #1C1917;   /* dark surface in light theme */

/* Dark theme */
--surface-canvas-dark:        #0B0F14;
--surface-card-dark:          #141A21;
--surface-card-muted-dark:    #1C2330;
--surface-overlay-dark:       rgba(20, 26, 33, 0.72);
--surface-inverse-dark:       #FAFAF9;
```

### Text Tokens

```css
/* Light theme */
--text-primary:     #1C1917;   /* headings, body */
--text-secondary:   #44403C;   /* supporting text */
--text-muted:       #78716C;   /* metadata, captions */
--text-subtle:      #A8A29E;   /* placeholder, disabled */
--text-inverse:     #FAFAF9;   /* text on dark surfaces */
--text-accent:      #6366F1;   /* links, highlighted */
--text-on-accent:   #FFFFFF;   /* text on accent background */

/* Dark theme */
--text-primary-dark:     #F5F5F4;
--text-secondary-dark:   #D6D3D1;
--text-muted-dark:       #A8A29E;
--text-subtle-dark:      #78716C;
--text-inverse-dark:     #1C1917;
--text-accent-dark:      #818CF8;   /* lighter indigo for dark bg */
--text-on-accent-dark:   #0B0F14;
```

### Border Tokens

```css
/* Light theme */
--border-default:     #E7E5E4;
--border-strong:      #D6D3D1;
--border-accent:      #C7D2FE;
--border-subtle:      #F5F5F4;

/* Dark theme */
--border-default-dark:     #292524;
--border-strong-dark:      #44403C;
--border-accent-dark:      #3730A3;
--border-subtle-dark:      #1C1917;
```

### Accent (Brand) Tokens

```css
/* Light theme */
--accent:            #6366F1;   /* indigo-500 */
--accent-hover:      #4F46E5;   /* indigo-600 */
--accent-pressed:    #4338CA;   /* indigo-700 */
--accent-subtle:     #EEF2FF;   /* indigo-50 */
--accent-subtle-hover: #E0E7FF; /* indigo-100 */

/* Dark theme */
--accent-dark:            #818CF8;  /* indigo-400 */
--accent-hover-dark:      #6366F1;  /* indigo-500 */
--accent-pressed-dark:    #4F46E5;  /* indigo-600 */
--accent-subtle-dark:     rgba(99, 102, 241, 0.15);
--accent-subtle-hover-dark: rgba(99, 102, 241, 0.25);
```

### Status Tokens

```css
/* Success (mint) */
--success:           #10B981;
--success-hover:     #059669;
--success-subtle:    #ECFDF5;
--success-text:      #065F46;
--success-dark:      #34D399;
--success-subtle-dark: rgba(16, 185, 129, 0.15);
--success-text-dark: #6EE7B7;

/* Warning (amber) */
--warning:           #F59E0B;
--warning-hover:     #D97706;
--warning-subtle:    #FFFBEB;
--warning-text:      #92400E;
--warning-dark:      #FBBF24;
--warning-subtle-dark: rgba(245, 158, 11, 0.15);
--warning-text-dark: #FCD34D;

/* Danger (coral) */
--danger:            #EF4444;
--danger-hover:      #DC2626;
--danger-subtle:     #FEF2F2;
--danger-text:       #991B1B;
--danger-dark:       #F87171;
--danger-subtle-dark: rgba(239, 68, 68, 0.15);
--danger-text-dark:  #FCA5A5;

/* Info (sky) */
--info:              #0EA5E9;
--info-hover:        #0284C7;
--info-subtle:       #F0F9FF;
--info-text:         #0C4A6E;
--info-dark:         #38BDF8;
--info-subtle-dark:  rgba(14, 165, 233, 0.15);
--info-text-dark:    #7DD3FC;
```

---

## 5. Component Tokens

Component tokens map semantic tokens to specific component properties.

```css
/* Button - Primary */
--button-primary-bg:           var(--accent);
--button-primary-bg-hover:     var(--accent-hover);
--button-primary-bg-pressed:   var(--accent-pressed);
--button-primary-text:         var(--text-on-accent);
--button-primary-border:       transparent;

/* Button - Secondary */
--button-secondary-bg:         transparent;
--button-secondary-bg-hover:   var(--accent-subtle);
--button-secondary-text:       var(--accent);
--button-secondary-border:     var(--border-strong);

/* Button - Ghost */
--button-ghost-bg:             transparent;
--button-ghost-bg-hover:       var(--surface-card-muted);
--button-ghost-text:           var(--text-secondary);
--button-ghost-border:         transparent;

/* Button - Disabled */
--button-disabled-bg:          var(--surface-card-muted);
--button-disabled-text:        var(--text-subtle);
--button-disabled-border:      transparent;

/* Card */
--card-bg:                     var(--surface-card);
--card-border:                 var(--border-default);
--card-shadow:                 0 1px 2px rgba(0,0,0,0.04);
--card-shadow-hover:           0 2px 8px rgba(0,0,0,0.06);
--card-radius:                 12px;

/* Input */
--input-bg:                    var(--surface-card);
--input-border:                var(--border-default);
--input-border-hover:          var(--border-strong);
--input-border-focus:          var(--accent);
--input-text:                  var(--text-primary);
--input-placeholder:           var(--text-subtle);
--input-radius:                8px;

/* Badge */
--badge-bg:                    var(--accent-subtle);
--badge-text:                  var(--accent);
--badge-border:                transparent;
--badge-radius:                6px;

/* Sidebar */
--sidebar-bg:                  var(--surface-card);
--sidebar-border:              var(--border-default);
--sidebar-item-active-bg:      var(--accent-subtle);
--sidebar-item-active-text:    var(--accent);
--sidebar-item-hover-bg:       var(--surface-card-muted);
--sidebar-item-text:           var(--text-secondary);
```

---

## 6. State Tokens

```css
/* Hover */
--state-hover-overlay:     rgba(99, 102, 241, 0.08);
--state-hover-overlay-dark: rgba(129, 140, 248, 0.12);

/* Pressed */
--state-pressed-overlay:   rgba(99, 102, 241, 0.16);

/* Focus */
--state-focus-ring:        0 0 0 2px var(--surface-canvas), 0 0 0 4px var(--accent);

/* Disabled */
--state-disabled-opacity:  0.5;

/* Selected */
--state-selected-bg:       var(--accent-subtle);
--state-selected-border:   var(--accent);
```

---

## 7. Severity Tokens

Five severity levels for civic issues. Each has a dedicated color family.

```css
/* Severity 1 - Cosmetic (slate) */
--severity-1:         #A8A29E;   /* slate-400 */
--severity-1-bg:      #F5F5F4;   /* slate-100 */
--severity-1-text:    #57534E;   /* slate-600 */
--severity-1-dark:    #D6D3D1;
--severity-1-bg-dark: rgba(168, 162, 158, 0.15);

/* Severity 2 - Minor (sky) */
--severity-2:         #38BDF8;   /* sky-400 */
--severity-2-bg:      #F0F9FF;   /* sky-50 */
--severity-2-text:    #0C4A6E;   /* sky-900 */
--severity-2-dark:    #7DD3FC;
--severity-2-bg-dark: rgba(56, 189, 248, 0.15);

/* Severity 3 - Moderate (amber) */
--severity-3:         #FBBF24;   /* amber-400 */
--severity-3-bg:      #FFFBEB;   /* amber-50 */
--severity-3-text:    #92400E;   /* amber-800 */
--severity-3-dark:    #FCD34D;
--severity-3-bg-dark: rgba(251, 191, 36, 0.15);

/* Severity 4 - Serious (peach) */
--severity-4:         #FB923C;   /* peach-400 */
--severity-4-bg:      #FFF7ED;   /* peach-50 */
--severity-4-text:    #9A3412;   /* peach-800 */
--severity-4-dark:    #FDBA74;
--severity-4-bg-dark: rgba(251, 146, 60, 0.15);

/* Severity 5 - Dangerous (coral) */
--severity-5:         #F87171;   /* coral-400 */
--severity-5-bg:      #FEF2F2;   /* coral-50 */
--severity-5-text:    #991B1B;   /* coral-800 */
--severity-5-dark:    #FCA5A5;
--severity-5-bg-dark: rgba(248, 113, 113, 0.15);
```

---

## 8. Agent Tokens

Each of the 9 agents has a dedicated color for its avatar, timeline accent, and reasoning trace.

```css
/* Agent 1 - Capture (slate) */
--agent-1:         #64748B;
--agent-1-light:   #94A3B8;
--agent-1-bg:      rgba(100, 116, 139, 0.12);

/* Agent 2 - Vision (indigo) */
--agent-2:         #6366F1;
--agent-2-light:   #818CF8;
--agent-2-bg:      rgba(99, 102, 241, 0.12);

/* Agent 3 - Severity (amber) */
--agent-3:         #F59E0B;
--agent-3-light:   #FBBF24;
--agent-3-bg:      rgba(245, 158, 11, 0.12);

/* Agent 4 - Jurisdiction (sky) */
--agent-4:         #0EA5E9;
--agent-4-light:   #38BDF8;
--agent-4-bg:      rgba(14, 165, 233, 0.12);

/* Agent 5 - Duplicate Detection (lavender) */
--agent-5:         #8B5CF6;
--agent-5-light:   #A78BFA;
--agent-5-bg:      rgba(139, 92, 246, 0.12);

/* Agent 6 - Impact Prediction (lavender) */
--agent-6:         #A78BFA;
--agent-6-light:   #C4B5FD;
--agent-6-bg:      rgba(167, 139, 250, 0.12);

/* Agent 7 - Community Verification (mint) */
--agent-7:         #10B981;
--agent-7-light:   #34D399;
--agent-7-bg:      rgba(16, 185, 129, 0.12);

/* Agent 8 - Repair Recommendation (peach) */
--agent-8:         #F97316;
--agent-8-light:   #FB923C;
--agent-8-bg:      rgba(249, 115, 22, 0.12);

/* Agent 9 - Government Routing (coral) */
--agent-9:         #EF4444;
--agent-9-light:   #F87171;
--agent-9-bg:      rgba(239, 68, 68, 0.12);
```

---

## End of COLORS.md
