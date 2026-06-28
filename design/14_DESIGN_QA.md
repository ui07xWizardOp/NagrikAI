# DESIGN_QA.md — The 300-Point Design QA Checklist

> **Every point must be verified before submission. No exceptions.**
>
> **Version**: 1.0.0

---

## How to Use This Checklist

Run through this checklist on Day 6 (June 27) after UI polish is complete. Each point is binary: ✅ pass or ❌ fail. Any failure must be fixed before submission.

**Total points**: 300+ across 15 categories
**Pass threshold**: 280+ (93%) for submission
**Ideal**: 295+ (98%) for top-5 contention

---

## 1. Spacing (25 points)

- [ ] All padding values are multiples of 8 (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)
- [ ] All margin values are multiples of 8
- [ ] All gap values are multiples of 8
- [ ] Card internal padding is exactly 20px
- [ ] Card-to-card gap in grids is 16px (dense) or 24px (sparse)
- [ ] Section-to-section spacing is 32px minimum
- [ ] Page margin is 40px desktop, 20px tablet, 16px mobile
- [ ] Sidebar item height is 40px
- [ ] Button height is 40px (primary), 32px (secondary)
- [ ] No arbitrary values (13px, 17px, 22px) exist in the codebase
- [ ] Form field gap is 16px
- [ ] Badge padding is 4px 8px
- [ ] Toast padding is 12px 16px
- [ ] Modal padding is 24px
- [ ] Map control button size is 40×40px
- [ ] Top bar height is 64px (desktop)
- [ ] Bottom tab bar height is 56px + safe area (mobile)
- [ ] List item height is 56px minimum (touch target)
- [ ] Icon-to-text spacing is 8px
- [ ] Avatar size is 32px (small), 40px (medium), 48px (large)
- [ ] No element touches the screen edge (minimum 16px margin)
- [ ] Whitespace accounts for 30-50% of every screen
- [ ] Dense data tables have 12px cell padding
- [ ] Sparse content has 24px+ breathing room
- [ ] Vertical rhythm is consistent (no random gaps)

## 2. Alignment (20 points)

- [ ] All elements in a row are vertically centered (or top-aligned consistently)
- [ ] All elements in a column are left-aligned (or stretch with `w-full`)
- [ ] Icon + text pairs use `flex items-center gap-2`
- [ ] Table columns are aligned: text left, numbers right, icons center
- [ ] Form labels are aligned with their inputs (same left edge)
- [ ] Buttons in a row are aligned by their bottom edge (or vertically centered)
- [ ] Cards in a grid are the same height (`h-full`)
- [ ] Map controls are aligned to the same grid (top-right corner, 16px from edges)
- [ ] Modal content is centered horizontally
- [ ] Empty state illustrations are centered
- [ ] Loading skeletons match the layout of the content they replace
- [ ] Badges are vertically centered with their label text
- [ ] Tooltips point to their trigger element
- [ ] Focus rings are offset 2px from the element (not overlapping)
- [ ] Sidebar icons are centered in their 40px container
- [ ] No element is misaligned by 1-2px (use `items-center`, not manual padding)
- [ ] Text in buttons is vertically centered
- [ ] Avatars are vertically centered with adjacent text
- [ ] Map popups are centered above their marker (offset 20px)
- [ ] Bottom sheets on mobile are full-width with 16px horizontal padding

## 3. Typography (25 points)

- [ ] All UI text uses Inter font family
- [ ] All monospace text uses JetBrains Mono
- [ ] No other font families are loaded
- [ ] Font sizes are from the 11-size scale only (11, 12, 13, 14, 16, 18, 20, 24, 30, 36, 48)
- [ ] Body text is 14px minimum (never smaller)
- [ ] H1 is 24px, weight 600, `tracking-tight`
- [ ] H2 is 18px, weight 600
- [ ] H3 is 14px, weight 600
- [ ] Labels are 12px, weight 500, uppercase, `tracking-wider`
- [ ] Captions are 11px, weight 500
- [ ] Line height for body is 1.5
- [ ] Line height for headings is 1.2
- [ ] No `text-align: justify` anywhere
- [ ] No gradient text
- [ ] No text shadows
- [ ] No underlined text for emphasis (use weight or color)
- [ ] No ALL CAPS for body text (only labels/overlines)
- [ ] Monospace used only for IDs, coordinates, timestamps, code
- [ ] `tabular-nums` on all numeric tables
- [ ] `tracking-tight` on headings 24px+
- [ ] Text color uses semantic tokens (`text-primary`, `text-muted`), not raw hex
- [ ] No `text-[#hex]` arbitrary values
- [ ] Placeholder text uses `text-subtle` color
- [ ] Disabled text uses `text-subtle` with reduced opacity
- [ ] Line length is 45-80 characters for body text

## 4. Colors (25 points)

- [ ] No saturated primary colors (#FF0000, #00FF00, #0000FF)
- [ ] No pure black (#000000) — use `#0B0F14`
- [ ] No pure white (#FFFFFF) for backgrounds — use `#FAFAF9`
- [ ] No neon colors
- [ ] All colors come from the design token system
- [ ] No raw hex values in components (use tokens)
- [ ] Severity 1-5 uses dedicated severity tokens, not generic status
- [ ] Agent colors match `AGENTS_UI.md` specification
- [ ] One accent color per screen (no competing highlights)
- [ ] Status badges use correct colors (new=indigo, routed=sky, resolved=mint)
- [ ] Light theme background is `#FAFAF9`
- [ ] Dark theme background is `#0B0F14`
- [ ] Glassmorphism uses 72% opacity, 20px blur, 180% saturate
- [ ] Borders use `border-default`, not arbitrary colors
- [ ] Hover states use `accent-subtle-hover`, not a different hue
- [ ] Disabled state uses reduced opacity (0.5), not a grey color
- [ ] Error text uses `danger-text`, not `danger` (which is too saturated for text)
- [ ] Success text uses `success-text` on `success-subtle` background
- [ ] Chart colors follow the 8-color sequence
- [ ] Map markers are colored by status
- [ ] Map heatmap uses indigo→sky→amber→coral gradient
- [ ] No color is the only signal (always paired with icon or text)
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] No conflicting color usage (e.g., green for error)
- [ ] Theme toggle works without page reload

## 5. Dark Mode (25 points)

- [ ] Dark mode is not CSS invert — has its own color values
- [ ] Dark mode background is `#0B0F14`, not pure black
- [ ] Dark mode card background is `#141A21`
- [ ] Dark mode text is `#F5F5F4`, not pure white
- [ ] Dark mode accent is `#818CF8` (indigo-400), lighter than light mode
- [ ] Dark mode shadows are stronger (opacity 0.3-0.7)
- [ ] Dark mode borders are `#292524` (visible against dark bg)
- [ ] Dark mode glassmorphism uses `rgba(20, 26, 33, 0.72)`
- [ ] No flash of wrong theme on page load (blocking script in `<head>`)
- [ ] Theme persists across sessions (localStorage)
- [ ] System theme (`prefers-color-scheme`) is respected by default
- [ ] All images have dark-mode-friendly versions (or dimmed overlays)
- [ ] Map switches to dark style JSON when theme changes
- [ ] Charts switch to dark grid/axis colors
- [ ] Icons are visible in both themes (no dark-on-dark)
- [ ] Focus rings are visible in both themes
- [ ] No hardcoded white backgrounds in components
- [ ] No hardcoded black text in components
- [ ] Loading skeletons use dark surface color
- [ ] Toast notifications adapt to theme
- [ ] Modals adapt to theme
- [ ] Form inputs adapt to theme
- [ ] Map markers are visible in both themes
- [ ] Heatmap is visible in both themes
- [ ] Theme toggle is accessible (aria-label, keyboard focusable)

## 6. Accessibility (30 points)

- [ ] All text meets 4.5:1 contrast ratio (3:1 for large text)
- [ ] All interactive elements have visible focus rings
- [ ] Focus rings are never removed (`*:focus-visible { outline: ... }`)
- [ ] All images have alt text (decorative images use `alt=""`)
- [ ] All form fields have associated `<label>` elements
- [ ] All icon-only buttons have `aria-label`
- [ ] Color is never the only signal (pair with icon or text)
- [ ] Touch targets are minimum 44×44px on mobile
- [ ] Keyboard navigation works for every flow (Tab, Shift+Tab, Enter, Escape)
- [ ] Skip-to-content link is present
- [ ] `prefers-reduced-motion` is respected (non-essential animations disabled)
- [ ] `prefers-color-scheme` is respected for initial theme
- [ ] Zoom is not disabled (no `user-scalable=no`)
- [ ] ARIA roles are correct (nav, main, aside, etc.)
- [ ] ARIA live regions for dynamic content (toasts, loading states)
- [ ] Screen reader tested with VoiceOver (Mac) or NVDA (Windows)
- [ ] HTML is semantic (`<nav>`, `<main>`, `<article>`, not all `<div>`)
- [ ] Heading hierarchy is correct (h1 → h2 → h3, no skips)
- [ ] Form errors are announced to screen readers
- [ ] Loading states are announced to screen readers
- [ ] Modal traps focus (focus stays in modal until closed)
- [ ] Modal returns focus to trigger element on close
- [ ] Dropdown menus are keyboard navigable (arrow keys)
- [ ] Tab order is logical (follows visual order)
- [ ] No keyboard traps (user can always Tab out)
- [ ] Link text is descriptive (no "click here")
- [ ] Page has a descriptive `<title>`
- [ ] Page has `lang` attribute
- [ ] 404 and error pages are accessible

## 7. Responsiveness (25 points)

- [ ] Mobile breakpoint (<640px): single column, bottom tab bar, full-screen sheets
- [ ] Tablet breakpoint (640-1024px): two column, collapsible sidebar
- [ ] Desktop breakpoint (>1024px): three zone, fixed sidebar
- [ ] No horizontal scroll on any breakpoint
- [ ] Map is visible and interactive on mobile (minimum 50vh)
- [ ] Text is readable on 375px width (iPhone SE)
- [ ] Touch targets are 44×44px on mobile
- [ ] No hover-only interactions (every hover has a tap equivalent)
- [ ] Sidebar becomes bottom tab bar on mobile
- [ ] Modals become bottom sheets on mobile
- [ ] Forms stack vertically on mobile
- [ ] Tables become cards on mobile (or horizontal scroll with sticky first column)
- [ ] Agent timeline collapses to horizontal scroll on mobile
- [ ] Images are responsive (`max-width: 100%`)
- [ ] No fixed-width elements that break on small screens
- [ ] Font sizes do not scale responsively (same size on all breakpoints)
- [ ] Hero titles may scale 24px→30px via media query (not clamp)
- [ ] Glassmorphism works on mobile (test on real device)
- [ ] Map controls are reachable on mobile (thumb zone)
- [ ] Bottom sheets have grab handle for swipe-down dismiss
- [ ] Pinch-to-zoom works on map (mobile)
- [ ] No layout shift on any breakpoint
- [ ] Safe area insets respected (notch, home indicator)
- [ ] Tested on iPhone SE, iPhone 14, iPad, desktop
- [ ] Tested in Chrome, Safari, Firefox

## 8. Animations (25 points)

- [ ] All animations are 150-400ms (none exceed 400ms except cinematic map fly-to)
- [ ] All animations use custom easing (no linear except progress bars)
- [ ] Default easing is `cubic-bezier(0.22, 1, 0.36, 1)`
- [ ] `prefers-reduced-motion` disables non-essential animations
- [ ] No infinite loops except loading spinners, pulsing markers, thinking dots
- [ ] No bounce animations except delight moments
- [ ] List item stagger is 50ms, max 5 items staggered
- [ ] Page transitions are 300ms
- [ ] Modal transitions are 250ms
- [ ] Button hover is 150ms
- [ ] Card hover is 200ms (elevate, no scale)
- [ ] Sidebar collapse is 300ms
- [ ] Toast entry is 300ms
- [ ] Agent timeline cards slide in with 50ms stagger
- [ ] Thinking dots pulse at 1.2s cycle
- [ ] Confidence bars fill over 800ms
- [ ] Map fly-to is 2000ms with `curve: 1.42`
- [ ] Map marker drop uses spring
- [ ] Heatmap fade is 2000ms
- [ ] No parallax scrolling
- [ ] No auto-playing carousels
- [ ] No 3D transforms
- [ ] Typewriter effect for agent reasoning (20ms per char)
- [ ] Number count-up for KPI cards (1000ms, ease-out-cubic)
- [ ] All animations are smooth (no jank) on mid-range hardware

## 9. Maps (20 points)

- [ ] Map is always interactive (pan, zoom, click)
- [ ] Map uses custom style JSON (not default MapLibre/Google style)
- [ ] Map style switches between light and dark with theme
- [ ] Markers are colored by status
- [ ] Marker size scales with severity
- [ ] New markers (within 24h) pulse
- [ ] Clusters collapse at low zoom, expand at high zoom
- [ ] Cluster count is displayed in center
- [ ] Popups are glassmorphic
- [ ] Popups show: status, severity, issue type, time, ward, "View Details" button
- [ ] Map controls: zoom in, zoom out, locate me, layer toggle
- [ ] Map controls are glassmorphic
- [ ] Map controls are top-right, 16px from edges
- [ ] Ward boundaries shown at zoom 10-13 (dashed, subtle)
- [ ] Ward highlights on hover
- [ ] Camera animations use `flyTo` for selection, `easeTo` for adjustments
- [ ] Camera respects `prefers-reduced-motion`
- [ ] No more than 500 markers on screen (cluster beyond that)
- [ ] Map performance is smooth (60fps) on desktop
- [ ] Map performance is smooth (30fps minimum) on mobile

## 10. AI Panels (25 points)

- [ ] No chat bubbles anywhere
- [ ] AI outputs shown as agent timeline, not conversation
- [ ] Every AI output has a confidence badge (0-100%)
- [ ] Confidence badge color-coded (mint/sky/amber/coral)
- [ ] Every AI decision has a reasoning trace (collapsible "Why?")
- [ ] Every AI output has an "Override" button within one tap
- [ ] Agent activity timeline shows real-time updates during pipeline
- [ ] Each agent card has: name, model, duration, status, output, reasoning
- [ ] Agent cards use the correct agent color from `AGENTS_UI.md`
- [ ] Agent icons match `AGENTS_UI.md` specification
- [ ] Thinking indicator is 3 pulsing dots (not a spinner)
- [ ] Pipeline shows progress (which agents done, which pending)
- [ ] Pipeline shows estimated time remaining
- [ ] Failed agents show error reason + recovery actions
- [ ] Tool calls shown in nested card (tool name, input, output, latency)
- [ ] Agent handoffs visible (arrow between cards)
- [ ] Memory usage shown (🧠 icon for past-context retrieval)
- [ ] Predictions shown with confidence interval (e.g., "12 ± 3")
- [ ] AI never uses "I", "me", "my"
- [ ] AI never shown as a robot emoji or illustration
- [ ] Pipeline completion shows total duration + report ID
- [ ] "File Another" button after completion
- [ ] Override flow is smooth (inline edit, no modal)
- [ ] Reasoning text uses italic, quoted style
- [ ] No "AI" label in UI (say "NagrikAI" or agent names)

## 11. Components (25 points)

- [ ] All components are from the design system (no one-offs)
- [ ] Button variants: primary, secondary, ghost, danger, icon
- [ ] Button radius is 8px (icon buttons are pill)
- [ ] Card radius is 12px (consistent)
- [ ] Card padding is 20px
- [ ] Input radius is 8px
- [ ] Badge radius is 6px
- [ ] Avatar radius is full (circle)
- [ ] Modal radius is 16px
- [ ] All components have hover, focus, active, disabled states
- [ ] All components work in light and dark mode
- [ ] All components are keyboard accessible
- [ ] Loading skeletons match component layout
- [ ] Empty states have illustration + text + CTA
- [ ] Error states have icon + explanation + recovery action
- [ ] Toasts appear one at a time (queued)
- [ ] Toasts auto-dismiss after 5s
- [ ] Dropdowns close on outside click + Escape
- [ ] Modals close on backdrop click + Escape
- [ ] Tooltips appear on hover (desktop) and long-press (mobile)
- [ ] Tabs are keyboard navigable (arrow keys)
- [ ] Accordion expands/collapses smoothly
- [ ] Form inputs show validation inline (not on submit)
- [ ] File upload shows progress bar
- [ ] No component exceeds 300 lines of code

## 12. Consistency (20 points)

- [ ] All icons use Lucide (no mixed icon sets)
- [ ] All icons use `stroke-width: 1.5`
- [ ] All icons are 20px (default) or 16px (small) or 24px (large)
- [ ] All buttons use the same radius
- [ ] All cards use the same radius
- [ ] All inputs use the same radius
- [ ] All modals use the same radius
- [ ] Spacing is consistent within and across pages
- [ ] Typography is consistent within and across pages
- [ ] Color usage is consistent within and across pages
- [ ] Same component looks the same everywhere (no variations)
- [ ] Loading state looks the same everywhere (skeleton style)
- [ ] Empty state looks the same everywhere (illustration style)
- [ ] Error state looks the same everywhere (icon + text + action)
- [ ] Hover states are consistent (subtle bg change)
- [ ] Focus states are consistent (accent ring)
- [ ] Active states are consistent (slightly darker)
- [ ] Disabled states are consistent (reduced opacity)
- [ ] Naming is consistent (PascalCase components, camelCase hooks)
- [ ] File structure is consistent (one component per file)

## 13. Performance (20 points)

- [ ] First Contentful Paint < 1.5s on 4G
- [ ] Time to Interactive < 3s on 4G
- [ ] Cumulative Layout Shift < 0.1
- [ ] Largest Contentful Paint < 2.5s
- [ ] Images are WebP or AVIF (no JPEG/PNG for content)
- [ ] Images are lazy-loaded below the fold
- [ ] JavaScript bundle < 200KB gzipped
- [ ] CSS bundle < 50KB gzipped
- [ ] Fonts use `font-display: swap`
- [ ] No render-blocking resources
- [ ] Code splitting on routes
- [ ] Map tiles cached
- [ ] API requests debounced (search, filter)
- [ ] No unnecessary re-renders (React.memo, useMemo, useCallback)
- [ ] Database queries optimized (indexes, no N+1)
- [ ] No memory leaks (cleanup in useEffect)
- [ ] No console.log in production
- [ ] No debugger statements
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Core Web Vitals pass

## 14. Interactions (15 points)

- [ ] Every button has hover, active, focus, disabled states
- [ ] Every link has hover, active, focus, visited states
- [ ] Every input has hover, focus, error, disabled states
- [ ] Drag-and-drop has visual feedback (cursor, opacity)
- [ ] Search shows results as you type (debounced 300ms)
- [ ] Filter changes animate the result list
- [ ] Delete actions have confirmation dialog
- [ ] Undo available for destructive actions
- [ ] Form submission shows loading state
- [ ] Form success shows success state
- [ ] Form errors show inline + on submit
- [ ] Copy-to-clipboard shows "Copied!" toast
- [ ] Share button works (Web Share API on mobile)
- [ ] Pull-to-refresh on mobile lists
- [ ] Swipe-to-dismiss on mobile cards (if applicable)

## 15. Final Approval (10 points)

- [ ] All above categories pass 90%+ of their points
- [ ] App works end-to-end without errors
- [ ] Demo flow tested 5 times without failure
- [ ] Backup video recorded
- [ ] Deployed URL works on mobile + desktop
- [ ] GitHub repo is public with README
- [ ] Google Doc has all 5 required sections
- [ ] No "TODO" comments in production code
- [ ] No Lorem Ipsum
- [ ] Ready to submit

---

## Scoring

| Category | Points | Pass Threshold |
|----------|--------|----------------|
| Spacing | 25 | 23 |
| Alignment | 20 | 18 |
| Typography | 25 | 23 |
| Colors | 25 | 23 |
| Dark Mode | 25 | 23 |
| Accessibility | 30 | 28 |
| Responsiveness | 25 | 23 |
| Animations | 25 | 23 |
| Maps | 20 | 18 |
| AI Panels | 25 | 23 |
| Components | 25 | 23 |
| Consistency | 20 | 18 |
| Performance | 20 | 18 |
| Interactions | 15 | 13 |
| Final Approval | 10 | 10 |
| **Total** | **310** | **280** |

---

## End of DESIGN_QA.md

Run this checklist on Day 6. Fix every failure. Submit only when the score is 280+.
