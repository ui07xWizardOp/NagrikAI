# TYPOGRAPHY.md — NagrikAI Type System

> **The complete typography specification.**
> Inter for UI. JetBrains Mono for data. Nothing else.
>
> **Version**: 1.0.0

---

## 1. Font Selection

### Primary: Inter (Variable)

```css
@font-face {
  font-family: 'Inter';
  src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  font-display: swap;
}
```

**Why Inter?**
- Variable font (100-900 weight in one file)
- Optimized for screen rendering at 12-16px
- Used by Linear, Vercel, GitHub, Notion, Stripe
- Open source (OFL)
- Has stylistic alternates (cv01-cv11) for fine-tuning

**Inter Stylistic Sets used by NagrikAI:**
- `cv01`: Single-storey `a` (cleaner at small sizes)
- `cv04`: Straight `l` with serif (disambiguates from `1` and `I`)
- `cv11`: Single-storey `g` (modern look)

```css
font-feature-settings: 'cv01', 'cv04', 'cv11';
```

### Monospace: JetBrains Mono

```css
@font-face {
  font-family: 'JetBrains Mono';
  src: url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400..700&display=swap');
  font-display: swap;
}
```

**Why JetBrains Mono?**
- Most readable monospace at 12-13px
- Ligatures optional (disabled in NagrikAI for clarity)
- Used by developers, recognizable as "code"
- Open source (OFL)

### Fallback Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Menlo, monospace;
```

---

## 2. Type Scale

11 sizes. No others.

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-xs` | 11px | 16px (1.45) | 500 | Metadata, captions, badges |
| `text-sm` | 12px | 16px (1.33) | 400-500 | Secondary text, labels |
| `text-base-sm` | 13px | 18px (1.38) | 400-500 | Tight body, sidebar items |
| `text-base` | 14px | 20px (1.43) | 400-500 | Body text, default |
| `text-md` | 16px | 24px (1.5) | 400-500 | Large body, lead text |
| `text-lg` | 18px | 26px (1.44) | 600 | Card titles, section headers |
| `text-xl` | 20px | 28px (1.4) | 600 | Page titles |
| `text-2xl` | 24px | 32px (1.33) | 700 | Hero subtitles |
| `text-3xl` | 30px | 36px (1.2) | 700 | Hero titles |
| `text-4xl` | 36px | 40px (1.11) | 800 | Display numbers |
| `text-5xl` | 48px | 52px (1.08) | 800 | Splash numbers |

### Tailwind Configuration

```js
// tailwind.config.js
fontSize: {
  'xs': ['11px', { lineHeight: '16px', fontWeight: '500' }],
  'sm': ['12px', { lineHeight: '16px' }],
  'base-sm': ['13px', { lineHeight: '18px' }],
  'base': ['14px', { lineHeight: '20px' }],
  'md': ['16px', { lineHeight: '24px' }],
  'lg': ['18px', { lineHeight: '26px', fontWeight: '600' }],
  'xl': ['20px', { lineHeight: '28px', fontWeight: '600' }],
  '2xl': ['24px', { lineHeight: '32px', fontWeight: '700' }],
  '3xl': ['30px', { lineHeight: '36px', fontWeight: '700' }],
  '4xl': ['36px', { lineHeight: '40px', fontWeight: '800' }],
  '5xl': ['48px', { lineHeight: '52px', fontWeight: '800' }],
},
```

---

## 3. Hierarchy

### H1 — Page Title
```jsx
<h1 className="text-2xl font-semibold text-text-primary tracking-tight">
  Dashboard
</h1>
```
- Size: 24px (`text-2xl`)
- Weight: 600 (`font-semibold`)
- Color: `text-primary`
- Letter spacing: -0.02em (`tracking-tight`)
- Margin: 0 0 24px 0

### H2 — Section Title
```jsx
<h2 className="text-lg font-semibold text-text-primary">
  Recent Reports
</h2>
```
- Size: 18px (`text-lg`)
- Weight: 600
- Color: `text-primary`
- Margin: 32px 0 16px 0

### H3 — Card Title
```jsx
<h3 className="text-base font-semibold text-text-primary">
  Report #r_3f8e2a1b
</h3>
```
- Size: 14px (`text-base`)
- Weight: 600
- Color: `text-primary`
- Margin: 0 0 8px 0

### H4 — Subsection / Label
```jsx
<h4 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
  Severity
</h4>
```
- Size: 12px (`text-sm`)
- Weight: 500
- Color: `text-secondary`
- Transform: uppercase
- Letter spacing: 0.05em (`tracking-wider`)

### Body — Default Text
```jsx
<p className="text-base text-text-primary leading-relaxed">
  Large depression in road surface, approximately 0.8m wide, near school.
</p>
```
- Size: 14px (`text-base`)
- Weight: 400
- Color: `text-primary`
- Line height: 1.5 (`leading-relaxed`)

### Body Small — Secondary Text
```jsx
<p className="text-sm text-text-muted">
  2 hours ago · Ward 142
</p>
```
- Size: 12px (`text-sm`)
- Weight: 400
- Color: `text-muted`

### Caption — Metadata
```jsx
<p className="text-xs text-text-subtle">
  Report ID: r_3f8e2a1b-9c4d-4e7f-8a2b-1c3d4e5f6a7b
</p>
```
- Size: 11px (`text-xs`)
- Weight: 500
- Color: `text-subtle`

---

## 4. Specialized Typography

### Buttons

```jsx
// Primary button
<Button className="text-base font-medium">Report Issue</Button>

// Secondary button
<Button variant="secondary" className="text-base font-medium">Cancel</Button>

// Icon button (accessibility label only, no visible text)
<Button size="icon" aria-label="Close"><XIcon /></Button>
```
- Size: 14px (`text-base`)
- Weight: 500 (`font-medium`)
- Letter spacing: 0

### Inputs

```jsx
<input
  className="text-base text-text-primary placeholder:text-text-subtle"
  placeholder="Search reports..."
/>
<label className="text-sm font-medium text-text-secondary">
  Location
</label>
```
- Input text: 14px, weight 400
- Placeholder: `text-subtle`
- Label: 12px, weight 500, `text-secondary`

### Tables

```jsx
<th className="text-xs font-medium text-text-muted uppercase tracking-wider">
  Issue Type
</th>
<td className="text-base text-text-primary">Pothole</td>
<td className="text-base font-mono text-text-primary text-right">12.9719</td>
```
- Header: 11px, weight 500, uppercase, `text-muted`, `tracking-wider`
- Cell: 14px, weight 400, `text-primary`
- Numeric cell: 14px, `font-mono`, `text-right`, `tabular-nums`

### Badges & Tags

```jsx
<Badge className="text-xs font-medium">New</Badge>
<Badge variant="severity" level={5} className="text-xs font-semibold">
  Severity 5
</Badge>
```
- Size: 11px (`text-xs`)
- Weight: 500-600
- Padding: 4px 8px
- Transform: none (badges are not uppercase)

### Maps

```jsx
// Map label (overlay)
<span className="text-sm font-medium text-white drop-shadow-sm">
  Ward 142
</span>

// Map tooltip
<div className="text-xs text-text-secondary">
  3 reports within 100m
</div>
```
- Map labels: 12px, weight 500, white text with subtle shadow
- Map tooltips: 11px, `text-secondary`

### Charts

```jsx
// Chart axis label
<text className="text-xs fill-text-muted">Jun 25</text>

// Chart value
<text className="text-base font-semibold fill-text-primary">4,892</text>

// Chart tooltip
<div className="text-xs text-text-secondary">Reports: 12</div>
```
- Axis labels: 11px, `text-muted`
- Values: 14px, weight 600, `text-primary`
- Tooltips: 11px, `text-secondary`

### AI Timeline

```jsx
// Agent name
<span className="text-sm font-semibold" style={{ color: 'var(--agent-2)' }}>
  Vision Agent
</span>

// Agent reasoning
<p className="text-sm text-text-secondary leading-relaxed">
  Visible depression in road surface with water accumulation suggests depth >5cm.
</p>

// Agent metadata
<span className="text-xs font-mono text-text-subtle">
  2.1s · 1,247 tokens
</span>
```
- Agent name: 12px, weight 600, agent color
- Reasoning: 12px, weight 400, `text-secondary`
- Metadata: 11px, `font-mono`, `text-subtle`

### Dialogs / Modals

```jsx
<DialogTitle className="text-lg font-semibold text-text-primary">
  Confirm Report Submission
</DialogTitle>
<DialogDescription className="text-sm text-text-muted">
  This will route the report to BBMP. You can override any field.
</DialogDescription>
```
- Title: 18px, weight 600, `text-primary`
- Description: 12px, weight 400, `text-muted`

### Empty States

```jsx
<h3 className="text-lg font-semibold text-text-primary">
  No reports yet
</h3>
<p className="text-sm text-text-muted">
  Reports you file will appear here with live status.
</p>
```
- Title: 18px, weight 600
- Body: 12px, weight 400, `text-muted`

---

## 5. Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `tracking-tighter` | -0.04em | Display numbers (48px+) |
| `tracking-tight` | -0.02em | Headings (24px+) |
| `tracking-normal` | 0 | Body text (default) |
| `tracking-wide` | 0.025em | Small labels (12px) |
| `tracking-wider` | 0.05em | Uppercase labels (11px) |
| `tracking-widest` | 0.1em | Overlines (10px) |

---

## 6. Responsive Scaling

Typography does NOT scale responsively in NagrikAI. The same font size is used on mobile and desktop.

**Why?** Responsive type scaling (e.g., `clamp(14px, 4vw, 18px)`) creates inconsistency between devices. A user who switches from phone to laptop should see the same text. If text is too small on mobile, the layout is wrong, not the font size.

**Exception**: Hero titles may scale from 24px (mobile) to 30px (desktop) using a media query, not `clamp()`.

```css
.hero-title {
  font-size: 24px;
}
@media (min-width: 768px) {
  .hero-title {
    font-size: 30px;
  }
}
```

---

## 7. Accessibility

### Contrast Ratios

All text meets WCAG 2.1 AA:
- Body text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Disabled text: 3:1 minimum (still must be readable)

### Font Size Minimums

- **Body text**: 14px minimum. Never smaller.
- **Secondary text**: 12px minimum.
- **Metadata/captions**: 11px minimum. Use sparingly.
- **Never** use 10px or smaller for any visible text.

### Line Length

- Optimal line length: 45-75 characters
- Max line length: 80 characters (`max-w-prose` ≈ 65ch)
- For dashboards: shorter is better (40-60ch)

### Reading Level

- Citizen-facing text: 8th grade reading level
- Agency-facing text: 10th grade level (assumes domain knowledge)
- Error messages: 6th grade level (stress reduces comprehension)

---

## 8. CSS Variables

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Menlo, monospace;
  
  --text-xs: 11px;
  --text-sm: 12px;
  --text-base-sm: 13px;
  --text-base: 14px;
  --text-md: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;
  --text-5xl: 48px;
  
  --leading-tight: 1.2;
  --leading-snug: 1.33;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  
  --tracking-tighter: -0.04em;
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

---

## 9. Tailwind Utilities

```js
// tailwind.config.js
extend: {
  fontFamily: {
    sans: ['var(--font-sans)'],
    mono: ['var(--font-mono)'],
  },
  fontSize: {
    'xs': ['11px', { lineHeight: '16px', fontWeight: '500' }],
    'sm': ['12px', { lineHeight: '16px' }],
    'base-sm': ['13px', { lineHeight: '18px' }],
    'base': ['14px', { lineHeight: '20px' }],
    'md': ['16px', { lineHeight: '24px' }],
    'lg': ['18px', { lineHeight: '26px', fontWeight: '600' }],
    'xl': ['20px', { lineHeight: '28px', fontWeight: '600' }],
    '2xl': ['24px', { lineHeight: '32px', fontWeight: '700' }],
    '3xl': ['30px', { lineHeight: '36px', fontWeight: '700' }],
    '4xl': ['36px', { lineHeight: '40px', fontWeight: '800' }],
    '5xl': ['48px', { lineHeight: '52px', fontWeight: '800' }],
  },
  letterSpacing: {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  lineHeight: {
    tight: '1.2',
    snug: '1.33',
    normal: '1.5',
    relaxed: '1.625',
  },
}
```

---

## 10. Do's & Don'ts

### Do
- ✅ Use Inter for all UI text
- ✅ Use JetBrains Mono for IDs, coordinates, timestamps
- ✅ Follow the 11-size type scale
- ✅ Use `tracking-tight` on headings 24px+
- ✅ Use `tabular-nums` on numeric tables
- ✅ Keep body text at 14px
- ✅ Use semantic color tokens (`text-primary`, `text-muted`)

### Don't
- ❌ Mix font families
- ❌ Use arbitrary font sizes (13px, 15px, 17px)
- ❌ Use `text-align: justify`
- ❌ Use gradient text
- ❌ Use text shadows
- ❌ Use underline for emphasis (use weight or color)
- ❌ Use ALL CAPS for body text (only for labels/overlines)
- ❌ Use raw hex colors (`text-[#1C1917]`)
- ❌ Use `clamp()` for responsive font sizes

---

## End of TYPOGRAPHY.md
