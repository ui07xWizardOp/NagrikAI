# INSTRUCTIONS.md — Developer Implementation Guide

> **The authoritative guide for building NagrikAI's UI.**
> Drop this file into your repo. Feed it to Cursor, Claude Code, Gemini CLI, or Codex.
>
> **Version**: 1.0.0

---

## 1. Quick Start

### Prerequisites

```bash
node --version   # 20+
pnpm --version   # 9+ (or npm 10+)
python --version # 3.11+ (for backend)
```

### Project Initialization

```bash
# Create Next.js 14 app with TypeScript + Tailwind
pnpm create next-app@latest nagrikai --typescript --tailwind --app --src-dir --import-alias "@/*"

cd nagrikai

# Install dependencies
pnpm add framer-motion next-themes maplibre-gl lucide-react clsx tailwind-merge class-variance-authority
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-toast @radix-ui/react-avatar @radix-ui/react-collapsible @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-separator @radix-ui/react-switch

# Dev dependencies
pnpm add -D @types/maplibre-gl prettier prettier-plugin-tailwindcss

# Initialize shadcn/ui
pnpm dlx shadcn-ui@latest init

# Add shadcn components
pnpm dlx shadcn-ui@latest add button card dialog dropdown-menu tabs toast tooltip avatar collapsible popover progress separator switch input label badge skeleton
```

### Fonts

```bash
# Inter + JetBrains Mono via next/font
# In app/layout.tsx:
```

```tsx
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'system';
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = theme === 'dark' || (theme === 'system' && systemDark);
                document.documentElement.classList.toggle('dark', isDark);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## 2. Folder Structure

```
nagrikai/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (app)/
│   │   ├── layout.tsx          # Sidebar + main layout
│   │   ├── page.tsx            # Home (map + report)
│   │   ├── reports/
│   │   │   ├── page.tsx        # My reports list
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Report detail
│   │   ├── map/
│   │   │   └── page.tsx        # Full-screen map
│   │   ├── hotspot/
│   │   │   └── page.tsx        # Predictive hotspot map
│   │   ├── verify/
│   │   │   └── page.tsx        # Community verification queue
│   │   ├── karma/
│   │   │   └── page.tsx        # Leaderboard
│   │   ├── profile/
│   │   │   └── page.tsx        # User profile + trust score
│   │   └── settings/
│   │       └── page.tsx        # Settings (theme, language)
│   ├── (agency)/
│   │   ├── layout.tsx
│   │   ├── queue/
│   │   ├── sla/
│   │   └── analytics/
│   ├── (journalist)/
│   │   ├── api/
│   │   └── data/
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles + CSS variables
│   └── providers.tsx           # Theme + motion providers
├── components/
│   ├── ui/                     # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── agents/                 # Agent-specific components
│   │   ├── agent-timeline.tsx
│   │   ├── agent-card.tsx
│   │   ├── confidence-badge.tsx
│   │   └── thinking-dots.tsx
│   ├── map/
│   │   ├── nagrikai-map.tsx
│   │   ├── map-controls.tsx
│   │   ├── report-marker.tsx
│   │   └── hotspot-layer.tsx
│   ├── reports/
│   │   ├── issue-card.tsx
│   │   ├── report-drawer.tsx
│   │   ├── capture-flow.tsx
│   │   └── severity-badge.tsx
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   ├── mobile-tab-bar.tsx
│   │   └── theme-toggle.tsx
│   └── shared/
│       ├── empty-state.tsx
│       ├── error-state.tsx
│       ├── loading-skeleton.tsx
│       └── stat-card.tsx
├── lib/
│   ├── motion.ts               # Framer Motion variants
│   ├── utils.ts                # cn() helper
│   ├── api.ts                  # API client
│   ├── websocket.ts            # WebSocket client
│   └── constants.ts            # App constants
├── hooks/
│   ├── use-agent-traces.ts     # Subscribe to agent timeline
│   ├── use-reports.ts          # Reports CRUD
│   ├── use-theme.ts            # Theme hook
│   └── use-media-query.ts      # Responsive hooks
├── stores/
│   └── report-store.ts         # Zustand store
├── types/
│   ├── report.ts
│   ├── agent.ts
│   └── api.ts
├── public/
│   ├── styles/
│   │   ├── map-light.json      # MapLibre light style
│   │   └── map-dark.json       # MapLibre dark style
│   └── test-images/            # 5 test photos for demo
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 3. Configuration Files

### tailwind.config.ts

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        // See COLORS.md §16 for complete config
        surface: {
          canvas: 'var(--surface-canvas)',
          card: 'var(--surface-card)',
          muted: 'var(--surface-card-muted)',
          overlay: 'var(--surface-overlay)',
          inverse: 'var(--surface-inverse)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          subtle: 'var(--text-subtle)',
          inverse: 'var(--text-inverse)',
          accent: 'var(--text-accent)',
          'on-accent': 'var(--text-on-accent)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          strong: 'var(--border-strong)',
          accent: 'var(--border-accent)',
          subtle: 'var(--border-subtle)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          pressed: 'var(--accent-pressed)',
          subtle: 'var(--accent-subtle)',
        },
        success: { DEFAULT: 'var(--success)', hover: 'var(--success-hover)', subtle: 'var(--success-subtle)', text: 'var(--success-text)' },
        warning: { DEFAULT: 'var(--warning)', hover: 'var(--warning-hover)', subtle: 'var(--warning-subtle)', text: 'var(--warning-text)' },
        danger: { DEFAULT: 'var(--danger)', hover: 'var(--danger-hover)', subtle: 'var(--danger-subtle)', text: 'var(--danger-text)' },
        info: { DEFAULT: 'var(--info)', hover: 'var(--info-hover)', subtle: 'var(--info-subtle)', text: 'var(--info-text)' },
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
      spacing: {
        '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px',
        '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px',
        '14': '56px', '16': '64px', '18': '72px', '20': '80px', '24': '96px',
      },
      borderRadius: {
        'sm': '6px', 'md': '8px', 'lg': '12px', 'xl': '16px', '2xl': '20px',
      },
      boxShadow: {
        '1': 'var(--shadow-1)', '2': 'var(--shadow-2)', '3': 'var(--shadow-3)',
        '4': 'var(--shadow-4)', '5': 'var(--shadow-5)',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        'fast': '150ms', 'normal': '200ms', 'slow': '300ms', 'slower': '400ms',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}

export default config
```

### app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light theme - see COLORS.md §13 */
    --surface-canvas: #FAFAF9;
    --surface-card: #FFFFFF;
    --surface-card-muted: #F5F5F4;
    --surface-overlay: rgba(255, 255, 255, 0.72);
    --surface-inverse: #1C1917;
    
    --text-primary: #1C1917;
    --text-secondary: #44403C;
    --text-muted: #78716C;
    --text-subtle: #A8A29E;
    --text-inverse: #FAFAF9;
    --text-accent: #6366F1;
    --text-on-accent: #FFFFFF;
    
    --border-default: #E7E5E4;
    --border-strong: #D6D3D1;
    --border-accent: #C7D2FE;
    --border-subtle: #F5F5F4;
    
    --accent: #6366F1;
    --accent-hover: #4F46E5;
    --accent-pressed: #4338CA;
    --accent-subtle: #EEF2FF;
    --accent-subtle-hover: #E0E7FF;
    
    --success: #10B981;
    --warning: #F59E0B;
    --danger: #EF4444;
    --info: #0EA5E9;
    /* ... see COLORS.md for full token set */
    
    --shadow-1: 0 1px 2px rgba(0,0,0,0.04);
    --shadow-2: 0 2px 8px rgba(0,0,0,0.06);
    --shadow-3: 0 4px 16px rgba(0,0,0,0.08);
    --shadow-4: 0 8px 32px rgba(0,0,0,0.10);
    --shadow-5: 0 12px 40px rgba(0,0,0,0.12);
    
    --glass-bg: rgba(255, 255, 255, 0.72);
    --glass-border: rgba(255, 255, 255, 0.18);
    --glass-blur: 20px;
    --glass-saturate: 180%;
  }
  
  .dark {
    /* Dark theme - see COLORS.md §14 */
    --surface-canvas: #0B0F14;
    --surface-card: #141A21;
    --surface-card-muted: #1C2330;
    --surface-overlay: rgba(20, 26, 33, 0.72);
    --surface-inverse: #FAFAF9;
    
    --text-primary: #F5F5F4;
    --text-secondary: #D6D3D1;
    --text-muted: #A8A29E;
    --text-subtle: #78716C;
    --text-inverse: #1C1917;
    --text-accent: #818CF8;
    --text-on-accent: #0B0F14;
    
    --border-default: #292524;
    --border-strong: #44403C;
    --border-accent: #3730A3;
    --border-subtle: #1C1917;
    
    --accent: #818CF8;
    --accent-hover: #6366F1;
    --accent-pressed: #4F46E5;
    --accent-subtle: rgba(99, 102, 241, 0.15);
    --accent-subtle-hover: rgba(99, 102, 241, 0.25);
    
    --success: #34D399;
    --warning: #FBBF24;
    --danger: #F87171;
    --info: #38BDF8;
    
    --shadow-1: 0 1px 2px rgba(0,0,0,0.3);
    --shadow-2: 0 2px 8px rgba(0,0,0,0.4);
    --shadow-3: 0 4px 16px rgba(0,0,0,0.5);
    --shadow-4: 0 8px 32px rgba(0,0,0,0.6);
    --shadow-5: 0 12px 40px rgba(0,0,0,0.7);
    
    --glass-bg: rgba(20, 26, 33, 0.72);
    --glass-border: rgba(255, 255, 255, 0.06);
  }
  
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-surface-canvas text-text-primary font-sans antialiased;
    font-feature-settings: 'cv01', 'cv04', 'cv11';
  }
  
  *:focus-visible {
    @apply outline-none ring-2 ring-accent ring-offset-2 ring-offset-surface-canvas;
  }
  
  /* Theme transition */
  *, *::before, *::after {
    transition: background-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
                border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
                color 200ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer components {
  .glass-panel {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
    border: 1px solid var(--glass-border);
  }
  
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: var(--border-strong) transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: var(--border-strong);
    border-radius: 3px;
  }
}
```

### app/providers.tsx

```tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'framer-motion'
import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
        <Toaster />
      </MotionConfig>
    </ThemeProvider>
  )
}
```

---

## 4. Coding Conventions

### Component Naming

- **Components**: PascalCase (`IssueCard.tsx`)
- **Hooks**: camelCase, prefix `use` (`useReports.ts`)
- **Types**: PascalCase (`ReportStatus`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_SEVERITY`)
- **Utils**: camelCase (`formatTimeAgo`)
- **Files**: match default export name (`issue-card.tsx` exports `IssueCard`)

### Component Structure

```tsx
// components/reports/issue-card.tsx

'use client'  // Only if needed

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ConfidenceBadge } from '@/components/agents/confidence-badge'
import { SeverityBadge } from './severity-badge'
import type { Report } from '@/types/report'

interface IssueCardProps {
  report: Report
  onClick?: (report: Report) => void
  className?: string
}

export function IssueCard({ report, onClick, className }: IssueCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(report)}
      className={cn(
        'bg-surface-card border border-border rounded-lg p-5 cursor-pointer',
        'shadow-1 hover:shadow-2 transition-shadow',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <SeverityBadge level={report.severity} />
        <ConfidenceBadge value={report.aiConfidence} />
      </div>
      
      {/* Body */}
      <h3 className="text-base font-semibold text-text-primary capitalize mb-1">
        {report.issueType.replace('_', ' ')}
      </h3>
      <p className="text-sm text-text-secondary line-clamp-2 mb-3">
        {report.description}
      </p>
      
      {/* Footer */}
      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {report.wardName}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatTimeAgo(report.createdAt)}
        </span>
      </div>
    </motion.div>
  )
}
```

### Rules

1. **Always use `'use client'`** for components with hooks, state, or event handlers.
2. **Always use the `cn()` helper** for conditional classes.
3. **Always type props** with an interface (not inline type).
4. **Always use semantic tokens** (`text-primary`), never raw colors (`text-black`).
5. **Always use Lucide icons**, never emoji.
6. **Always use Framer Motion** for animations, never CSS animations (except theme transition).
7. **Never** exceed 300 lines per file.
8. **Never** use `any` type.
9. **Never** use `useEffect` for derived state (use `useMemo`).
10. **Never** inline style objects (use Tailwind classes or CSS variables).

---

## 5. Theme Switching

### Theme Toggle Component

```tsx
// components/layout/theme-toggle.tsx

'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return null  // Prevent hydration mismatch
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

---

## 6. AI Coding Agent Prompts

### For Cursor / Claude Code / Gemini CLI

Paste this at the start of any session:

```
You are building NagrikAI, a civic intelligence platform for the Vibe2Ship hackathon.

Read these design documents in /design/ before writing any code:
- 01_DESIGN.md (master design system)
- 02_COLORS.md (color tokens)
- 03_TYPOGRAPHY.md (type system)
- 12_DESIGN_CONSTITUTION.md (immutable laws)

Rules:
1. Use Next.js 14 App Router with TypeScript
2. Use Tailwind CSS with the custom token system (never raw hex colors)
3. Use shadcn/ui components
4. Use Framer Motion for all animations
5. Use Lucide icons only
6. Support light and dark mode via next-themes
7. Use semantic color tokens (text-primary, bg-surface-card, etc.)
8. Follow the 8px spacing system
9. Never exceed 300 lines per file
10. Every component must have hover, focus, and disabled states

When I ask you to build a component, respond with:
1. The file path
2. The complete component code
3. Any new dependencies needed
4. Any tokens or utilities that don't exist yet

Do not explain your code. Just write it.
```

### For Codex / Bolt / Lovable

```
Build NagrikAI, a civic tech platform. Tech stack: Next.js 14 + Tailwind + shadcn/ui + Framer Motion + MapLibre GL.

Design language: Linear + Arc + Notion + Vercel + Apple Maps. Pastel colors, dual theme (light/dark), map-first layout, glassmorphism overlays.

The app has 9 AI agents that process citizen photos of civic issues. The UI must show an agent activity timeline (not chat bubbles) with confidence badges and reasoning traces.

Read /design/01_DESIGN.md and /design/12_DESIGN_CONSTITUTION.md for the complete design system. Follow them exactly.

Build [FEATURE NAME]. Use semantic tokens from the design system. Support light and dark mode. Animate with Framer Motion (200-300ms, ease-out-quint).
```

---

## 7. Build Order

### Day 1: Foundation
1. Initialize project (Next.js + Tailwind + shadcn)
2. Set up `tailwind.config.ts` with full token system
3. Set up `globals.css` with CSS variables (light + dark)
4. Set up providers (ThemeProvider, MotionConfig)
5. Set up fonts (Inter + JetBrains Mono)
6. Build sidebar layout
7. Build theme toggle
8. Verify light/dark mode works

### Day 2: Map + Camera
1. Install MapLibre GL
2. Create custom map styles (light + dark JSON)
3. Build `NagrikAIMap` component
4. Add markers, clusters, popups
5. Build camera capture component
6. Wire up photo upload to Firebase Storage

### Day 3: Agent Timeline
1. Build `AgentCard` component
2. Build `AgentTimeline` component
3. Build `ConfidenceBadge` component
4. Build `ThinkingDots` component
5. Connect to WebSocket for real-time agent traces
6. Test with mock data

### Day 4: Report Flow
1. Build `CaptureFlow` (camera → submit → pipeline)
2. Build `ReportDrawer` (slide-over panel)
3. Build `IssueCard` for lists
4. Build `SeverityBadge`
5. Build empty/error/loading states

### Day 5: Pages
1. Home page (map + camera)
2. My Reports page
3. Report Detail page
4. Hotspot Map page
5. Community Verification page

### Day 6: Polish
1. Run through `DESIGN_QA.md` checklist
2. Fix all failures
3. Record backup demo video
4. Test on mobile + desktop
5. Test in both themes

### Day 7: Submit
1. Final QA pass
2. Deploy to Firebase Hosting + Cloud Run
3. Write Google Doc
4. Submit on BlockseBlock by 12pm

---

## 8. Common Patterns

### List with Stagger Animation

```tsx
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion'

export function ReportList({ reports }: { reports: Report[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-4"
    >
      {reports.map((report) => (
        <motion.div key={report.id} variants={staggerItem}>
          <IssueCard report={report} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Empty State

```tsx
import { Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-card-muted flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-muted max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  )
}
```

### Loading Skeleton

```tsx
import { Skeleton } from '@/components/ui/skeleton'

export function IssueCardSkeleton() {
  return (
    <div className="bg-surface-card border border-border rounded-lg p-5 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-12" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}
```

---

## 9. Performance Checklist

- [ ] Images are WebP/AVIF
- [ ] Fonts use `display: swap`
- [ ] Code splitting on routes
- [ ] Lazy-load below-fold components
- [ ] Debounce search input (300ms)
- [ ] Memoize expensive renders
- [ ] No unnecessary re-renders
- [ ] Lighthouse score > 90

---

## 10. Deployment

### Firebase Hosting (Frontend)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting
# - Public directory: .next
# - Single-page app: No
# - GitHub Actions: Yes

# Build and deploy
pnpm build
firebase deploy --only hosting
```

### Cloud Run (Backend)

```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/nagrikai-backend

# Deploy
gcloud run deploy nagrikai-backend \
  --image gcr.io/PROJECT_ID/nagrikai-backend \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 8080
```

---

## End of INSTRUCTIONS.md

This document, combined with the other 13 design documents, is the complete implementation guide. Feed it to any AI coding agent and they will have everything they need.
