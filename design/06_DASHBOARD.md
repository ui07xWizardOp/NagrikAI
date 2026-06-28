# DASHBOARD.md — Dashboard Philosophy & Layouts

> **Dashboards are for agencies and journalists, not citizens.**
>
> **Version**: 1.0.0

---

## 1. Dashboard Philosophy

Citizens get maps and lists. Agencies and journalists get dashboards. Dashboards are **dense, analytical, actionable**.

### Three Dashboard Principles

1. **KPI cards at top** — 3-4 key metrics, always visible
2. **One chart per question** — don't stack 10 charts; pick the 3 that answer the most important questions
3. **Filter-first** — every dashboard has a filter bar (date range, ward, agency, issue type)

### Dashboard vs Map

| Aspect | Map (citizen) | Dashboard (agency) |
|--------|---------------|-------------------|
| Density | Sparse (1-3 data points) | Dense (20+ data points) |
| Layout | Map-centric | Grid-centric |
| Interaction | Pan, zoom, tap | Filter, sort, export |
| Theme | Light by default | Dark by default |
| Goal | Report an issue | Manage issues |

---

## 2. Dashboard Layout

```
┌─────────────────────────────────────────────┐
│ Sidebar │  [Filter Bar: Date | Ward | Agency]│
│         ├───────────────────────────────────┤
│         │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│         │  │ KPI 1│ │ KPI 2│ │ KPI 3│ │ KPI 4││
│         │  └──────┘ └──────┘ └──────┘ └──────┘│
│         ├───────────────────────────────────┤
│         │  ┌─────────────┐  ┌─────────────┐  │
│         │  │  Chart 1    │  │  Chart 2    │  │
│         │  │  (Trend)    │  │  (Donut)    │  │
│         │  └─────────────┘  └─────────────┘  │
│         ├───────────────────────────────────┤
│         │  ┌─────────────────────────────┐  │
│         │  │  Table (sortable, filterable)│  │
│         │  └─────────────────────────────┘  │
│         │                                   │
│         │  [Export CSV]  [Export PNG]       │
│         │                                   │
└─────────┴───────────────────────────────────┘
```

---

## 3. KPI Cards

```tsx
export function KpiCard({ label, value, change, trend }: KpiCardProps) {
  return (
    <Card className="p-5">
      <div className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-text-primary tabular-nums">
          <CountUp value={value} />
        </span>
        {change && (
          <span className={cn(
            'text-sm font-medium',
            trend === 'up' ? 'text-success' : 'text-danger'
          )}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
    </Card>
  )
}
```

**Specs**: 4 KPI cards in a row (desktop), 2×2 grid (tablet), stacked (mobile). Each card: label (11px uppercase), value (30px bold tabular-nums), change indicator.

---

## 4. Chart Guidelines

- **Use Recharts** (React charting library, integrates with Tailwind)
- **Colors**: follow chart token sequence (`--chart-1` through `--chart-8`)
- **Grid**: subtle (`--chart-grid` color, 1px dashed)
- **Axis labels**: 11px, `text-muted`
- **Tooltips**: glassmorphic, 12px
- **No 3D charts**
- **No gradients on bars** (solid colors only)
- **Legend**: top-right, 12px

---

## 5. Agency Dashboard Pages

### Agency Queue
- KPIs: Pending Reports, Avg Wait Time, SLA Breach Rate, Today's New
- Chart 1: Reports over time (line)
- Chart 2: Reports by issue type (donut)
- Table: Report ID, Issue Type, Severity, Ward, SLA Status, Assign button

### Agency SLA Tracker
- KPIs: Avg Resolution Time, SLA Breach Rate, On-Time Rate, Total Resolved
- Chart 1: Resolution time trend (line, 30 days)
- Chart 2: SLA performance by ward (bar)
- Table: Ward, Total Reports, Avg Resolution, SLA Breach %

---

## End of DASHBOARD.md
