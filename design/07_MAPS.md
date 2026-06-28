# MAPS.md — NagrikAI Map Design System

> **The map is NagrikAI's hero. This document specifies everything about it.**
>
> **Version**: 1.0.0

---

## 1. Map Philosophy

The map is not a feature. The map is the product. Every civic issue has a location, and every location tells a story. NagrikAI's map must make that story visible at a glance.

### Three Map Principles

1. **The map is always interactive** — pan, zoom, click. Never static.
2. **The map is always styled** — custom MapLibre style JSON for light and dark. Never default.
3. **The map tells the story** — markers, heatmaps, and predictions are layered to create narrative.

---

## 2. Map Color Palette

### Light Map Style

```json
{
  "version": 8,
  "name": "NagrikAI Light",
  "sources": { ... },
  "layers": [
    { "type": "background", "paint": { "background-color": "#FAFAF9" } },
    { "type": "fill", "id": "water", "paint": { "fill-color": "#BAE6FD" } },
    { "type": "fill", "id": "land", "paint": { "fill-color": "#F5F5F4" } },
    { "type": "fill", "id": "park", "paint": { "fill-color": "#D1FAE5" } },
    { "type": "fill", "id": "building", "paint": { "fill-color": "#E7E5E4" } },
    { "type": "line", "id": "road-minor", "paint": { "line-color": "#FFFFFF", "line-width": 1 } },
    { "type": "line", "id": "road-major", "paint": { "line-color": "#FBBF24", "line-width": 2 } },
    { "type": "line", "id": "road-highway", "paint": { "line-color": "#FB923C", "line-width": 3 } },
    { "type": "symbol", "id": "text-place", "paint": { "text-color": "#57534E" }, "layout": { "text-size": 12 } },
    { "type": "symbol", "id": "text-major", "paint": { "text-color": "#1C1917" }, "layout": { "text-size": 14, "text-font": ["Inter Bold"] } }
  ]
}
```

### Dark Map Style

```json
{
  "version": 8,
  "name": "NagrikAI Dark",
  "sources": { ... },
  "layers": [
    { "type": "background", "paint": { "background-color": "#0B0F14" } },
    { "type": "fill", "id": "water", "paint": { "fill-color": "#1C2330" } },
    { "type": "fill", "id": "land", "paint": { "fill-color": "#141A21" } },
    { "type": "fill", "id": "park", "paint": { "fill-color": "#064E3B" } },
    { "type": "fill", "id": "building", "paint": { "fill-color": "#1C1917" } },
    { "type": "line", "id": "road-minor", "paint": { "line-color": "#292524", "line-width": 1 } },
    { "type": "line", "id": "road-major", "paint": { "line-color": "#92400E", "line-width": 2 } },
    { "type": "line", "id": "road-highway", "paint": { "line-color": "#7C2D12", "line-width": 3 } },
    { "type": "symbol", "id": "text-place", "paint": { "text-color": "#A8A29E" }, "layout": { "text-size": 12 } },
    { "type": "symbol", "id": "text-major", "paint": { "text-color": "#F5F5F4" }, "layout": { "text-size": 14, "text-font": ["Inter Bold"] } }
  ]
}
```

---

## 3. Marker Hierarchy

### Marker Types

| Type | Color | Size | Shape | When |
|------|-------|------|-------|------|
| New | `#6366F1` (indigo) | 24px | Circle + pulse | Within 24h of creation |
| Confirmed | `#818CF8` (indigo-400) | 20px | Circle | Citizen confirmed |
| Routed | `#0EA5E9` (sky) | 20px | Circle | Sent to agency |
| In Progress | `#F59E0B` (amber) | 20px | Circle | Agency working |
| Resolved | `#6EE7B7` (mint-300) | 16px | Circle (faded) | Agency marked fixed |
| Closed | `#A7F3D0` (mint-200) | 14px | Circle (very faded) | Citizen confirmed fixed |
| Disputed | `#F87171` (coral) | 20px | Circle + warning icon | Community flagged |
| Hotspot | `#A78BFA` (lavender) | N/A | Hex polygon | Predicted zone |

### Marker Size by Severity

| Severity | Marker Size | Visual Treatment |
|----------|-------------|------------------|
| 1 | 16px | Small dot |
| 2 | 18px | Small circle |
| 3 | 20px | Medium circle |
| 4 | 24px | Large circle + ring |
| 5 | 28px | Large circle + pulsing ring |

### Marker Implementation (MapLibre)

```tsx
// Map markers using GeoJSON sources
map.addSource('reports', {
  type: 'geojson',
  data: reportsGeoJSON,
  cluster: true,
  clusterRadius: 50,
  clusterMaxZoom: 14,
});

// Unclustered markers
map.addLayer({
  id: 'report-markers',
  type: 'circle',
  source: 'reports',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': [
      'match',
      ['get', 'status'],
      'new', '#6366F1',
      'confirmed', '#818CF8',
      'routed', '#0EA5E9',
      'in_progress', '#F59E0B',
      'resolved', '#6EE7B7',
      'closed', '#A7F3D0',
      'disputed', '#F87171',
      '#6366F1' // default
    ],
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['get', 'severity'],
      1, 8,
      2, 9,
      3, 10,
      4, 12,
      5, 14
    ],
    'circle-stroke-width': 2,
    'circle-stroke-color': '#FFFFFF',
    'circle-stroke-opacity': 0.8,
  },
});

// Pulse effect for new markers (within 24h)
map.addLayer({
  id: 'report-pulse',
  type: 'circle',
  source: 'reports',
  filter: ['all',
    ['!', ['has', 'point_count']],
    ['==', ['get', 'is_new'], true]
  ],
  paint: {
    'circle-color': '#6366F1',
    'circle-radius': 20,
    'circle-opacity': 0.3,
    'circle-stroke-width': 0,
  },
});

// Animate the pulse
let pulseSize = 20;
let pulseDirection = 1;
function animatePulse() {
  pulseSize += pulseDirection * 0.5;
  if (pulseSize > 28) pulseDirection = -1;
  if (pulseSize < 20) pulseDirection = 1;
  map.setPaintProperty('report-pulse', 'circle-radius', pulseSize);
  requestAnimationFrame(animatePulse);
}
animatePulse();

// Clusters
map.addLayer({
  id: 'clusters',
  type: 'circle',
  source: 'reports',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': '#818CF8',
    'circle-radius': [
      'step',
      ['get', 'point_count'],
      20,   // 1-9 reports: 20px
      10,   // 10-49: 25px
      25,
      50,   // 50+: 30px
      30
    ],
    'circle-stroke-width': 3,
    'circle-stroke-color': '#FFFFFF',
    'circle-stroke-opacity': 0.9,
  },
});

map.addLayer({
  id: 'cluster-count',
  type: 'symbol',
  source: 'reports',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['Inter Bold'],
    'text-size': 14,
  },
  paint: {
    'text-color': '#FFFFFF',
  },
});
```

---

## 4. Heatmaps

Hotspot predictions use a heatmap layer with a custom gradient.

### Heatmap Gradient

```js
map.addLayer({
  id: 'hotspot-heatmap',
  type: 'heatmap',
  source: 'hotspot-data',
  maxzoom: 15,
  paint: {
    // Increase the heatmap weight based on predicted_report_count
    'heatmap-weight': [
      'interpolate',
      ['linear'],
      ['get', 'predicted_reports'],
      0, 0,
      10, 1,
      50, 2,
    ],
    // Increase intensity as zoom increases
    'heatmap-intensity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0, 1,
      15, 3,
    ],
    // Color ramp: transparent → indigo → sky → amber → coral
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0, 'rgba(99, 102, 241, 0)',       // transparent
      0.2, 'rgba(99, 102, 241, 0.3)',   // indigo low
      0.4, 'rgba(14, 165, 233, 0.5)',   // sky medium
      0.6, 'rgba(245, 158, 11, 0.7)',   // amber high
      0.8, 'rgba(239, 68, 68, 0.85)',   // coral critical
      1, 'rgba(239, 68, 68, 1)',        // full coral
    ],
    // Adjust radius based on zoom
    'heatmap-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0, 20,
      15, 80,
    ],
    // Lower opacity at higher zoom
    'heatmap-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      7, 1,
      15, 0.6,
    ],
  },
});
```

---

## 5. Camera Movement

### Camera Animations

```tsx
// Smooth fly-to when a report is selected
function flyToReport(report) {
  map.flyTo({
    center: [report.lng, report.lat],
    zoom: 16,
    speed: 1.2,         // slower = more cinematic
    curve: 1.42,        // ease-out
    duration: 2000,     // 2 seconds
    essential: true,    // respects prefers-reduced-motion
  });
}

// Ease-to when zooming from a search
function easeToLocation(lng, lat) {
  map.easeTo({
    center: [lng, lat],
    zoom: 14,
    duration: 1000,
  });
}

// Fit bounds when showing multiple reports
function fitToReports(reports) {
  const bounds = reports.reduce((b, r) => b.extend([r.lng, r.lat]), new maplibregl.LngLatBounds());
  map.fitBounds(bounds, {
    padding: { top: 80, bottom: 80, left: 80, right: 80 },
    duration: 1000,
  });
}
```

### Camera Rules

1. **Always use `flyTo` for report selection** — the cinematic curve draws attention to the destination.
2. **Always use `easeTo` for small adjustments** — search, filter changes.
3. **Always use `fitBounds` for multi-report views** — lists, search results.
4. **Never** use `jumpTo` (instant) except for the initial map load.
5. **Duration 1000-2000ms** — shorter feels jarring, longer feels slow.
6. **Respect `prefers-reduced-motion`** — if set, use `jumpTo` (instant) instead of `flyTo`.

---

## 6. Map Controls

### Control Bar (Top-Right)

```
┌─────┐
│  +  │  Zoom in
├─────┤
│  −  │  Zoom out
├─────┤
│ ⊕   │  Locate me
├─────┤
│ ◫   │  Layer toggle (reports / heatmap / both)
└─────┘
```

- Position: top-right, 16px from edges
- Background: glassmorphic (`rgba(255,255,255,0.72)` light, `rgba(20,26,33,0.72)` dark)
- Border: `1px solid var(--glass-border)`
- Border radius: 12px
- Button size: 40×40px
- Icon: Lucide, 20px, `stroke-width 1.5`
- Hover: `var(--surface-card-muted)` background
- Active: `var(--accent)` background, `var(--text-on-accent)` icon

### Layer Toggle

A small popover with 3 options:
- **Reports** — show markers only
- **Hotspots** — show heatmap only
- **Both** — show markers + heatmap (default)

---

## 7. Popups

When a user clicks a marker, a glassmorphic popup appears.

```tsx
const popup = new maplibregl.Popup({
  closeButton: false,
  closeOnClick: true,
  className: 'nagrikai-popup',
  offset: 20,
  maxWidth: '320px',
});

popup.setHTML(`
  <div class="popup-content">
    <div class="popup-header">
      <span class="popup-status" style="background: ${statusColor}20; color: ${statusColor}">
        ${statusLabel}
      </span>
      <span class="popup-severity">Severity ${severity}</span>
    </div>
    <h3 class="popup-title">${issueType}</h3>
    <p class="popup-description">${description}</p>
    <div class="popup-meta">
      <span>${timeAgo}</span>
      <span>·</span>
      <span>${ward}</span>
    </div>
    <button class="popup-view-btn" onclick="openReport('${reportId}')">
      View Details →
    </button>
  </div>
`);
```

### Popup Styling

```css
.nagrikai-popup .maplibregl-popup-content {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow-3);
}

.nagrikai-popup .maplibregl-popup-tip {
  border-top-color: var(--glass-border);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.popup-status {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 6px;
}

.popup-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  text-transform: capitalize;
}

.popup-description {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 8px;
}

.popup-meta {
  font-size: 11px;
  color: var(--text-muted);
  display: flex;
  gap: 4px;
}

.popup-view-btn {
  width: 100%;
  margin-top: 12px;
  padding: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-accent);
  background: var(--accent-subtle);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 200ms;
}

.popup-view-btn:hover {
  background: var(--accent-subtle-hover);
}
```

---

## 8. Ward Boundaries

Ward boundaries are shown as subtle polygons when zoomed in to city level (zoom 10-13).

```js
map.addLayer({
  id: 'ward-boundaries',
  type: 'line',
  source: 'wards',
  paint: {
    'line-color': '#A8A29E',
    'line-width': 1,
    'line-opacity': [
      'interpolate', ['linear'], ['zoom'],
      10, 0,
      11, 0.3,
      13, 0.5,
      15, 0,
    ],
    'line-dasharray': [2, 2],
  },
});

// Highlight ward on hover
map.addLayer({
  id: 'ward-fill',
  type: 'fill',
  source: 'wards',
  paint: {
    'fill-color': '#6366F1',
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      0.08,
      0
    ],
  },
});
```

---

## 9. Agent Overlays

During the AI pipeline execution, agent activity is visualized on the map.

### Vision Agent Overlay

When the Vision Agent classifies a photo, a temporary bounding box appears on the map at the report location:

```js
map.addLayer({
  id: 'vision-bounding-box',
  type: 'fill',
  source: 'vision-bbox',
  paint: {
    'fill-color': '#6366F1',
    'fill-opacity': 0.2,
  },
});

// Animate in
map.setPaintProperty('vision-bounding-box', 'fill-opacity', 0.2);
// Fade out after 3s
setTimeout(() => {
  map.setPaintProperty('vision-bounding-box', 'fill-opacity', 0);
}, 3000);
```

### Routing Agent Overlay

When the Routing Agent files a report, a line draws from the report to the agency office:

```js
map.addSource('routing-line', {
  type: 'geojson',
  data: {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [reportLng, reportLat],
        [agencyLng, agencyLat],
      ],
    },
  },
});

map.addLayer({
  id: 'routing-line',
  type: 'line',
  source: 'routing-line',
  paint: {
    'line-color': '#0EA5E9',
    'line-width': 2,
    'line-opacity': 0.6,
    'line-dasharray': [2, 2],
  },
});

// Animate the dash for a "data flowing" effect
let dashOffset = 0;
function animateDash() {
  dashOffset -= 0.5;
  map.setPaintProperty('routing-line', 'line-dasharray', [2, 2]);
  // Note: MapLibre doesn't support dash-offset directly; use a custom approach
  requestAnimationFrame(animateDash);
}
```

---

## 10. Map Performance

### Tile Caching

```js
const map = new maplibregl.Map({
  container: 'map',
  style: '/styles/nagrikai-light.json',
  center: [77.5937, 12.9719],  // Bengaluru
  zoom: 12,
  maxZoom: 18,
  minZoom: 8,
  maxBounds: [[76.5, 12.5], [78.5, 13.5]],  // Bengaluru region
  fadeDuration: 300,
  cooperativeGestures: false,
  refreshExpiredTiles: true,
  localIdeographFontFamily: 'Inter',
});
```

### Performance Rules

1. **Limit markers to 500** on screen at once. Beyond that, cluster.
2. **Use vector tiles** (`.mvt`) not raster tiles. 3-5x faster.
3. **Lazy-load heatmap data** — only fetch when user toggles hotspot layer.
4. **Debounce filter changes** by 300ms before re-querying.
5. **Use `requestIdleCallback`** for non-critical map updates.
6. **Never** call `map.setStyle()` on every theme toggle. Use two style URLs and swap sources instead.

---

## 11. Mobile Map

On mobile (<768px), the map takes 50% of the viewport height minimum.

```tsx
<div className="h-[50vh] md:h-full">
  <Map />
</div>
```

### Mobile Map Rules

1. **Bottom sheet** for report details (slides up over the map).
2. **No popups** on mobile — tap opens bottom sheet directly.
3. **Larger touch targets** for markers (min 44×44px).
4. **Disable rotate** on mobile (one-finger pan only).
5. **Locate me button** is prominent (top-right, larger).

---

## End of MAPS.md
