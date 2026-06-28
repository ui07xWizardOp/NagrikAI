# MOTION.md — NagrikAI Animation System

> **Motion is meaning. Every animation communicates.**
>
> **Version**: 1.0.0

---

## 1. Motion Philosophy

NagrikAI's motion is **smooth, purposeful, and never flashy**. Animations serve three purposes:

1. **Communicate state change** — element appeared, disappeared, or transformed
2. **Guide attention** — draw the eye to what matters
3. **Reduce perceived wait time** — skeletons, progress bars, agent timelines

### Three Motion Principles

1. **Duration 200-300ms** for interactions. 400ms max for page transitions.
2. **Custom easing curves**, never linear. Default: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint).
3. **Respect `prefers-reduced-motion`** — disable all non-essential animation.

---

## 2. Duration Scale

| Token | Duration | Usage |
|-------|----------|-------|
| `duration-instant` | 0ms | Theme toggle (no animation) |
| `duration-fast` | 150ms | Hover states, small toggles |
| `duration-normal` | 200ms | Button presses, card hovers |
| `duration-slow` | 300ms | Panel slides, dropdowns |
| `duration-slower` | 400ms | Page transitions, modals |
| `duration-cinematic` | 600ms | Map fly-to, hero animations |

---

## 3. Easing Curves

| Token | Curve | Usage |
|-------|-------|-------|
| `ease-default` | `cubic-bezier(0.22, 1, 0.36, 1)` | Most transitions (ease-out-quint) |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Position changes |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Delight moments (overshoot) |
| `ease-linear` | `linear` | Only for progress bars |

```css
:root {
  --ease-default: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-linear: linear;
}
```

---

## 4. Framer Motion Setup

### Provider

```tsx
// app/providers.tsx
import { MotionConfig } from 'framer-motion'

export function Providers({ children }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionConfig>
  )
}
```

### Common Variants

```tsx
// lib/motion.ts
import { Variants } from 'framer-motion'

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export const slideUp: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
}

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: 16, transition: { duration: 0.2 } },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
}

export const staggerContainer: Variants = {
  animate: {
    transition: { staggerChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}
```

---

## 5. Component Animations

### Buttons

```tsx
// Press animation
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
>
  Submit Report
</motion.button>
```

### Cards

```tsx
// Card hover (elevate, no scale)
<motion.div
  whileHover={{ y: -2 }}
  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
>
  <IssueCard />
</motion.div>
```

### Modals / Dialogs

```tsx
// Backdrop
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
  className="fixed inset-0 bg-black/40 backdrop-blur-sm"
/>

// Dialog
<motion.div
  initial={{ opacity: 0, scale: 0.96, y: 8 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.96, y: 8 }}
  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
  className="bg-surface-card rounded-xl shadow-4"
>
  {children}
</motion.div>
```

### Sidebar

```tsx
// Sidebar collapse/expand
<motion.aside
  animate={{ width: isCollapsed ? 64 : 240 }}
  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
>
  {children}
</motion.aside>

// Nav item active indicator
<motion.div
  layoutId="sidebar-active"
  className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent"
  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
/>
```

### Toasts

```tsx
<AnimatePresence>
  {toast && (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 right-4 z-50"
    >
      <Toast />
    </motion.div>
  )}
</AnimatePresence>
```

---

## 6. List Animations

### Staggered List Entry

```tsx
<motion.ul
  variants={staggerContainer}
  initial="initial"
  animate="animate"
>
  {reports.map((report) => (
    <motion.li key={report.id} variants={staggerItem}>
      <IssueCard report={report} />
    </motion.li>
  ))}
</motion.ul>
```

### Stagger Rules

- **Stagger delay**: 50ms between items
- **Max staggered items**: 5 (the rest appear instantly)
- **Max total stagger duration**: 250ms (5 × 50ms)

---

## 7. AI Thinking Animations

### Agent Timeline Entry

When a new agent starts, its card slides in from the right and the "thinking" indicator pulses:

```tsx
<motion.div
  initial={{ opacity: 0, x: 16, height: 0 }}
  animate={{ opacity: 1, x: 0, height: 'auto' }}
  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
  className="agent-card"
>
  <AgentHeader name="Vision Agent" status="thinking" />
  
  {/* Thinking pulse */}
  <motion.div
    animate={{ opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    className="thinking-indicator"
  >
    <span className="dot" />
    <span className="dot" />
    <span className="dot" />
  </motion.div>
</motion.div>
```

### Typewriter Effect for Agent Reasoning

When the agent outputs reasoning text, it types out character by character:

```tsx
function TypewriterText({ text, speed = 20 }) {
  const [displayed, setDisplayed] = useState('')
  
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])
  
  return <span>{displayed}<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>|</motion.span></span>
}
```

### Confidence Bar Animation

When an agent completes, the confidence bar fills from 0 to its value:

```tsx
<motion.div
  initial={{ width: 0 }}
  animate={{ width: `${confidence * 100}%` }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  className="h-1 bg-accent rounded-full"
/>
```

---

## 8. Map Animations

### Marker Drop

New markers drop in with a spring:

```tsx
// Using MapLibre, set the marker opacity to 0 then animate to 1
map.setPaintProperty('report-markers', 'circle-opacity', 0)
// Animate in
requestAnimationFrame(() => {
  map.setPaintProperty('report-markers', 'circle-opacity', 1)
})
```

### Camera Fly-To

```tsx
map.flyTo({
  center: [lng, lat],
  zoom: 16,
  speed: 1.2,
  curve: 1.42,
  duration: 2000,
  essential: true,
})
```

### Heatmap Fade

```tsx
// Fade heatmap in
map.setPaintProperty('hotspot-heatmap', 'heatmap-opacity', 0)
// Animate
let opacity = 0
const fadeIn = setInterval(() => {
  opacity += 0.05
  if (opacity >= 0.8) {
    opacity = 0.8
    clearInterval(fadeIn)
  }
  map.setPaintProperty('hotspot-heatmap', 'heatmap-opacity', opacity)
}, 30)
```

---

## 9. Number Count-Up

For KPI cards and stats, numbers count up from 0:

```tsx
function CountUp({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)  // ease-out-cubic
      setCount(Math.floor(start + (value - start) * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }
    animate()
  }, [value, duration])
  
  return <span>{count.toLocaleString()}</span>
}
```

---

## 10. Page Transitions

```tsx
// app/layout.tsx
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function Layout({ children }) {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
```

---

## 11. Reduced Motion

```tsx
// Respects prefers-reduced-motion automatically via MotionConfig
<MotionConfig reducedMotion="user">
  {/* All motion components will disable animation if user prefers reduced motion */}
</MotionConfig>

// For custom animations, check the preference:
import { useReducedMotion } from 'framer-motion'

function MyComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  const variants = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }
  
  return <motion.div variants={variants} />
}
```

---

## 12. Forbidden Animations

- ❌ **Bounce** (except delight moments like successful report submission)
- ❌ **Infinite loops** (except loading spinners, pulsing markers, thinking dots)
- ❌ **Rotating elements** (except loading spinners)
- ❌ **Linear easing** (except progress bars)
- ❌ **Animations >600ms** (except cinematic map fly-to)
- ❌ **Parallax scrolling** (causes performance issues on mobile)
- ❌ **Auto-playing carousels** (distracting)
- ❌ **Page-flip or 3D transforms** (gimmicky)

---

## End of MOTION.md
