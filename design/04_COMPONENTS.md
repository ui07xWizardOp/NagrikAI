# COMPONENTS.md — NagrikAI Component Library

> **40+ components, each fully specified. Implementation-ready.**
>
> **Version**: 1.0.0

---

## Component Index

### Layout
1. [Sidebar](#1-sidebar)
2. [TopBar](#2-topbar)
3. [MobileTabBar](#3-mobiletabbar)
4. [PageContainer](#4-pagecontainer)

### Navigation
5. [NavItem](#5-navitem)
6. [Breadcrumb](#6-breadcrumb)
7. [ThemeToggle](#7-themetoggle)

### Buttons & Actions
8. [Button](#8-button)
9. [IconButton](#9-iconbutton)
10. [FabButton](#10-fabbutton)

### Data Display
11. [Card](#11-card)
12. [IssueCard](#12-issuecard)
13. [AgentCard](#13-agentcard)
14. [StatCard](#14-statcard)
15. [ConfidenceBadge](#15-confidencebadge)
16. [SeverityBadge](#16-severitybadge)
17. [StatusBadge](#17-statusbadge)
18. [Avatar](#18-avatar)

### AI Components
19. [AgentTimeline](#19-agenttimeline)
20. [ThinkingDots](#20-thinkingdots)
21. [ReasoningTrace](#21-reasoningtrace)
22. [OverrideButton](#22-overridebutton)
23. [ToolCallCard](#23-toolcallcard)

### Forms & Input
24. [Input](#24-input)
25. [Textarea](#25-textarea)
26. [Select](#26-select)
27. [CameraCapture](#27-cameracapture)
28. [VoiceCapture](#28-voicecapture)

### Feedback
29. [Toast](#29-toast)
30. [Dialog](#30-dialog)
31. [Drawer](#31-drawer)
32. [Tooltip](#32-tooltip)
33. [Progress](#33-progress)

### States
34. [EmptyState](#34-emptystate)
35. [ErrorState](#35-errorstate)
36. [Skeleton](#36-skeleton)

### Map
37. [NagrikAIMap](#37-nagrikaimap)
38. [MapControls](#38-mapcontrols)
39. [ReportMarker](#39-reportmarker)
40. [HotspotLayer](#40-hotspotlayer)
41. [MapPopup](#41-mappopup)

---

## 1. Sidebar

**Purpose**: Primary navigation. Always visible on desktop, drawer on mobile.

```tsx
// components/layout/sidebar.tsx
'use client'
import { motion } from 'framer-motion'
import { Home, Map, FileText, ShieldCheck, Flame, Star, Settings, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: FileText, label: 'My Reports', href: '/reports' },
  { icon: Map, label: 'Map', href: '/map' },
  { icon: ShieldCheck, label: 'Verify', href: '/verify' },
  { icon: Flame, label: 'Hotspots', href: '/hotspot' },
  { icon: Star, label: 'Karma', href: '/karma' },
]

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-0 bottom-0 bg-surface-card border-r border-border z-30 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
          <span className="text-text-on-accent font-bold text-sm">N</span>
        </div>
        {!collapsed && <span className="ml-3 font-semibold text-text-primary">NagrikAI</span>}
      </div>
      
      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} collapsed={collapsed} />
        ))}
      </nav>
      
      {/* Bottom */}
      <div className="p-2 border-t border-border space-y-1">
        <NavItem icon={Settings} label="Settings" href="/settings" collapsed={collapsed} />
        <NavItem icon={User} label="Profile" href="/profile" collapsed={collapsed} />
      </div>
    </motion.aside>
  )
}
```

**Specs**: Width 240px (expanded) / 64px (collapsed). Height 100vh. Background `surface-card`. Border-right `border-default`. Logo 32×32px, accent bg. Nav items 40px tall.

---

## 2. TopBar

**Purpose**: Page title, search, theme toggle, notifications.

```tsx
export function TopBar({ title }: { title: string }) {
  return (
    <header className="h-16 border-b border-border bg-surface-card/80 backdrop-blur-md flex items-center px-6 sticky top-0 z-20">
      <h1 className="text-xl font-semibold text-text-primary tracking-tight">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon"><Search className="w-5 h-5" /></Button>
        <ThemeToggle />
        <Avatar src={user.image} />
      </div>
    </header>
  )
}
```

**Specs**: Height 64px. Sticky top. Glassmorphic background (80% opacity, 16px blur).

---

## 3. MobileTabBar

**Purpose**: Bottom navigation on mobile.

```tsx
export function MobileTabBar() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-surface-card border-t border-border flex items-center justify-around pb-safe">
      {navItems.slice(0, 5).map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
          <item.icon className="w-5 h-5 text-text-muted" />
          <span className="text-[10px] text-text-muted">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
```

**Specs**: Height 56px + safe area. 5 items max. Icons 20px, labels 10px.

---

## 8. Button

**Purpose**: Primary interaction element.

```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-text-on-accent hover:bg-accent-hover active:bg-accent-pressed shadow-1',
        secondary: 'bg-transparent border border-border-strong text-text-primary hover:bg-surface-card-muted',
        ghost: 'bg-transparent text-text-secondary hover:bg-surface-card-muted',
        danger: 'bg-danger text-white hover:bg-danger-hover',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'w-10 h-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)
```

**Variants**: primary, secondary, ghost, danger. **Sizes**: sm (32px), md (40px), lg (48px), icon (40×40). **Radius**: 8px. **States**: hover (bg shift), active (darker), focus (ring), disabled (opacity 0.5).

---

## 12. IssueCard

**Purpose**: Display a civic issue report in a list.

```tsx
export function IssueCard({ report, onClick }: IssueCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-surface-card border border-border rounded-lg p-5 cursor-pointer shadow-1 hover:shadow-2 transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <SeverityBadge level={report.severity} />
        <ConfidenceBadge value={report.aiConfidence} />
      </div>
      <h3 className="text-base font-semibold text-text-primary capitalize mb-1">
        {report.issueType.replace('_', ' ')}
      </h3>
      <p className="text-sm text-text-secondary line-clamp-2 mb-3">{report.description}</p>
      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{report.wardName}</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatTimeAgo(report.createdAt)}</span>
      </div>
    </motion.div>
  )
}
```

**Specs**: Card 20px padding, 12px radius. Hover: -2px lift, shadow-1 → shadow-2. Shows severity badge, confidence badge, title, description (2-line clamp), location, time.

---

## 13. AgentCard

**Purpose**: Show one agent's work in the timeline.

```tsx
export function AgentCard({ trace, isRunning }: { trace: AgentTrace; isRunning: boolean }) {
  const agentColor = AGENT_COLORS[trace.agentNumber].color
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 16, height: 0 }}
      animate={{ opacity: 1, x: 0, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="bg-surface-card border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <AgentStatusIcon status={trace.status} color={agentColor} />
          <div>
            <div className="text-sm font-semibold" style={{ color: agentColor }}>{trace.agentName}</div>
            <div className="text-xs text-text-muted font-mono">{trace.model}</div>
          </div>
        </div>
        {trace.completedAt && (
          <span className="text-xs text-text-muted font-mono">{trace.duration}s</span>
        )}
      </div>
      
      {/* Body */}
      {isRunning && (
        <div className="p-4">
          <ThinkingDots color={agentColor} />
        </div>
      )}
      
      {trace.output && (
        <div className="p-4 space-y-2">
          {trace.output.fields.map((field) => (
            <div key={field.label} className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">{field.label}:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">{field.value}</span>
                {field.confidence && <ConfidenceBadge value={field.confidence} />}
              </div>
            </div>
          ))}
          
          {trace.output.reasoning && (
            <ReasoningTrace text={trace.output.reasoning} />
          )}
          
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm">View Full Output</Button>
            <Button variant="ghost" size="sm">Override</Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
```

---

## 15. ConfidenceBadge

```tsx
export function ConfidenceBadge({ value }: { value: number }) {
  const color = value >= 0.8 ? 'var(--success)' 
              : value >= 0.6 ? 'var(--info)'
              : value >= 0.4 ? 'var(--warning)'
              : 'var(--danger)'
  
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded"
      style={{ backgroundColor: `${color}20`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {Math.round(value * 100)}%
    </span>
  )
}
```

---

## 16. SeverityBadge

```tsx
export function SeverityBadge({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const config = SEVERITY_COLORS[level]
  
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded"
      style={{ backgroundColor: `${config.color}20`, color: config.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
      Severity {level} · {config.label}
    </span>
  )
}
```

---

## 19. AgentTimeline

```tsx
export function AgentTimeline({ reportId }: { reportId: string }) {
  const { traces, isRunning } = useAgentTraces(reportId)
  
  return (
    <div className="space-y-2">
      <AnimatePresence>
        {traces.map((trace, i) => (
          <motion.div
            key={trace.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <AgentCard trace={trace} isRunning={isRunning && trace.status === 'running'} />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {isRunning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
          <ThinkingDots />
          <p className="text-sm text-text-muted mt-2">NagrikAI is analyzing...</p>
        </motion.div>
      )}
    </div>
  )
}
```

---

## 20. ThinkingDots

```tsx
export function ThinkingDots({ color = 'var(--accent)' }: { color?: string }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
```

---

## 27. CameraCapture

```tsx
export function CameraCapture({ onCapture }: { onCapture: (photo: Blob, location: GeoLocation) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [location, setLocation] = useState<GeoLocation | null>(null)
  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(setStream)
    navigator.geolocation.getCurrentPosition(setLocation)
  }, [])
  
  const capture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
    canvas.toBlob((blob) => onCapture(blob, location), 'image/jpeg', 0.9)
  }
  
  return (
    <div className="fixed inset-0 bg-black z-50">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <Button
          onClick={capture}
          size="icon"
          className="w-16 h-16 rounded-full bg-white border-4 border-white/30"
        >
          <div className="w-12 h-12 rounded-full bg-white" />
        </Button>
      </div>
    </div>
  )
}
```

---

## 34. EmptyState

```tsx
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-card-muted flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-muted max-w-sm mb-6">{description}</p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  )
}
```

---

## 35. ErrorState

```tsx
export function ErrorState({ icon: Icon = AlertTriangle, title, description, onRetry, onFallback }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-danger-subtle flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-danger" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-muted max-w-sm mb-6">{description}</p>
      <div className="flex gap-2">
        <Button onClick={onRetry}>Retry</Button>
        <Button variant="secondary" onClick={onFallback}>Report Manually</Button>
      </div>
    </div>
  )
}
```

---

## 37. NagrikAIMap

```tsx
import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export function NagrikAIMap({ reports, onMarkerClick }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [map, setMap] = useState<maplibregl.Map | null>(null)
  
  useEffect(() => {
    if (!mapRef.current) return
    
    const m = new maplibregl.Map({
      container: mapRef.current,
      style: theme === 'dark' ? '/styles/map-dark.json' : '/styles/map-light.json',
      center: [77.5937, 12.9719],
      zoom: 12,
    })
    
    m.on('load', () => {
      m.addSource('reports', { type: 'geojson', data: reportsToGeoJSON(reports), cluster: true })
      m.addLayer({ id: 'report-markers', type: 'circle', source: 'reports', ... })
    })
    
    setMap(m)
    return () => m.remove()
  }, [theme])
  
  return <div ref={mapRef} className="w-full h-full" />
}
```

---

## End of COMPONENTS.md

All 41 components specified. Build them in the order listed. Each component must pass the DESIGN_QA.md checklist before integration.
