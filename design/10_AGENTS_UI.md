# AGENTS_UI.md — UI Specification for the 9 NagrikAI Agents

> **Each agent has a distinct visual identity. This document defines them all.**
>
> **Version**: 1.0.0

---

## 1. Agent Visual Identity System

Each of the 9 agents (plus the Follow-up agent) has:
- A unique color (from `COLORS.md` Agent Tokens)
- A unique Lucide icon
- A unique avatar (color circle + icon)
- A unique animation pattern
- A unique "thinking" indicator

This distinct visual identity helps citizens track which agent is working at a glance.

---

## 2. Agent 1 — Capture Agent

| Property | Value |
|----------|-------|
| **Color** | `#64748B` (slate) |
| **Color Light** | `#94A3B8` |
| **Icon** | `Camera` (Lucide) |
| **Avatar** | Slate circle + camera icon |
| **Model** | gemini-2.5-flash |
| **Avg Duration** | 0.3s |
| **Role** | Parse raw citizen input into structured metadata |

### Avatar
```tsx
<div className="w-8 h-8 rounded-full flex items-center justify-center"
     style={{ backgroundColor: 'rgba(100, 116, 139, 0.12)' }}>
  <Camera className="w-4 h-4" style={{ color: 'var(--agent-1)' }} />
</div>
```

### Thinking Indicator
Three dots pulsing in slate, 1.2s cycle.

### Output Card
```
┌─────────────────────────────────────────┐
│  📷 Capture Agent              0.3s     │
├─────────────────────────────────────────┤
│  ✓ Photo received: pothole.jpg          │
│  ✓ Location: 12.9719, 77.5937 (±8m)     │
│  ✓ Voice: "Yahan paani ki leakage hai"  │
│  ✓ Language: Hindi                      │
│                                         │
│  Preliminary signals:                   │
│  • mentions_school: true                │
│  • mentions_injury: false               │
└─────────────────────────────────────────┘
```

---

## 3. Agent 2 — Vision Agent

| Property | Value |
|----------|-------|
| **Color** | `#6366F1` (indigo) |
| **Color Light** | `#818CF8` |
| **Icon** | `Eye` (Lucide) |
| **Avatar** | Indigo circle + eye icon |
| **Model** | gemini-2.5-pro (multimodal) |
| **Avg Duration** | 2.1s |
| **Role** | Classify civic issue from photo |

### Output Card
```
┌─────────────────────────────────────────┐
│  👁  Vision Agent              2.1s     │
│     gemini-2.5-pro                      │
├─────────────────────────────────────────┤
│  ✓ Issue Type: Pothole          ●94%   │
│  ✓ Infrastructure: Road                 │
│  ✓ Severity: 4/5                        │
│  ✓ Area: 0.8 m²                         │
│                                         │
│  "Visible depression in road surface    │
│   with irregular edges. Water           │
│   accumulation suggests depth >5cm."    │
│                                         │
│  Alternatives considered:               │
│  • Sinkhole (12%)                       │
│  • Surface crack (8%)                   │
│                                         │
│  [View Full Output]  [Override]         │
└─────────────────────────────────────────┘
```

### Special: Photo with Bounding Box
When the Vision Agent identifies the issue area, it can overlay a bounding box on the photo:
```tsx
<div className="relative">
  <img src={photoUrl} alt="Report" className="rounded-lg" />
  <div
    className="absolute border-2 border-indigo-500 rounded"
    style={{ left: '20%', top: '30%', width: '40%', height: '40%' }}
  >
    <span className="absolute -top-6 left-0 text-xs bg-indigo-500 text-white px-2 py-0.5 rounded">
      Pothole (94%)
    </span>
  </div>
</div>
```

---

## 4. Agent 3 — Severity Agent

| Property | Value |
|----------|-------|
| **Color** | `#F59E0B` (amber) |
| **Color Light** | `#FBBF24` |
| **Icon** | `AlertTriangle` (Lucide) |
| **Avatar** | Amber circle + alert icon |
| **Model** | gemini-2.5-flash |
| **Avg Duration** | 1.4s |
| **Role** | Adjust severity based on context |

### Output Card
```
┌─────────────────────────────────────────┐
│  ⚠  Severity Agent            1.4s     │
├─────────────────────────────────────────┤
│  Original: 3 → Adjusted: 4  (+1)        │
│                                         │
│  Context factors:                       │
│  • School within 100m  (+1)             │
│    "Govt Primary School, 80m south"     │
│  • Active rain          (+1)            │
│    "Heavy rain in past 2 hours"         │
│  • Daytime              (0)             │
│    "14:30 local time"                   │
│                                         │
│  Context summary:                       │
│  "Pothole near school during rain       │
│   increases pedestrian risk."           │
│                                         │
│  [View Full Output]  [Override]         │
└─────────────────────────────────────────┘
```

---

## 5. Agent 4 — Jurisdiction Agent

| Property | Value |
|----------|-------|
| **Color** | `#0EA5E9` (sky) |
| **Color Light** | `#38BDF8` |
| **Icon** | `MapPin` (Lucide) |
| **Avatar** | Sky circle + map pin icon |
| **Model** | gemini-2.5-flash + function calling |
| **Avg Duration** | 0.8s |
| **Role** | Determine ward and responsible agency |

### Output Card
```
┌─────────────────────────────────────────┐
│  📍 Jurisdiction Agent        0.8s     │
├─────────────────────────────────────────┤
│  ✓ Address: Indiranagar, Bengaluru      │
│  ✓ Ward: 142 (Indiranagar)              │
│  ✓ Agency: BBMP                         │
│  ✓ Open311: service_code="pothole_001"  │
│                                         │
│  📞 Tool calls:                         │
│  • reverse_geocode() → 120ms            │
│  • get_ward() → 45ms                    │
│  • get_agency() → 30ms                  │
│                                         │
│  Confidence: 92%                        │
│                                         │
│  [View Full Output]  [Override]         │
└─────────────────────────────────────────┘
```

---

## 6. Agent 5 — Duplicate Detection Agent

| Property | Value |
|----------|-------|
| **Color** | `#8B5CF6` (lavender) |
| **Color Light** | `#A78BFA` |
| **Icon** | `Copy` (Lucide) |
| **Avatar** | Lavender circle + copy icon |
| **Model** | text-embedding-005 + pgvector |
| **Avg Duration** | 0.6s |
| **Role** | Find similar reports; auto-merge |

### Output Card
```
┌─────────────────────────────────────────┐
│  📋 Duplicate Detection       0.6s     │
├─────────────────────────────────────────┤
│  Status: Community Verified ✨          │
│                                         │
│  🧠 Memory: searched 847 reports        │
│     within 100m, last 7 days            │
│                                         │
│  Found 2 similar reports:               │
│  ┌─────────────────────────────────┐    │
│  │ r_2a1b...  Pothole  5d ago  ✓   │    │
│  │ Similarity: 91%                 │    │
│  │ 80m away                        │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ r_4c3d...  Pothole  3d ago  ✓   │    │
│  │ Similarity: 87%                 │    │
│  │ 65m away                        │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ✓ Linked to original: r_2a1b...        │
│  ✓ Priority escalated                   │
│                                         │
│  [View Original]  [Override]            │
└─────────────────────────────────────────┘
```

---

## 7. Agent 6 — Impact Prediction Agent

| Property | Value |
|----------|-------|
| **Color** | `#A78BFA` (lavender-400) |
| **Color Light** | `#C4B5FD` |
| **Icon** | `TrendingUp` (Lucide) |
| **Avatar** | Lavender circle + trend icon |
| **Model** | gemini-2.5-flash + PostGIS |
| **Avg Duration** | 0.5s |
| **Role** | Tag report with predictive hotspot context |

### Output Card
```
┌─────────────────────────────────────────┐
│  📈 Impact Prediction         0.5s     │
├─────────────────────────────────────────┤
│  📊 In Hotspot Zone: YES                │
│                                         │
│  Zone severity score: 78/100            │
│  Reports in zone (30d): 47              │
│  Predicted new reports (7d): 12 ± 3     │
│  Est. daily impact: ~2,000 people       │
│                                         │
│  ████████████████░░░░  78%              │
│                                         │
│  Context: "This ward has 3.2x the       │
│  average pothole density for Bengaluru  │
│  during monsoon season."                │
│                                         │
│  [View Hotspot Map]                     │
└─────────────────────────────────────────┘
```

---

## 8. Agent 7 — Community Verification Agent

| Property | Value |
|----------|-------|
| **Color** | `#10B981` (mint) |
| **Color Light** | `#34D399` |
| **Icon** | `ShieldCheck` (Lucide) |
| **Avatar** | Mint circle + shield icon |
| **Model** | gemini-2.5-flash + rules engine |
| **Avg Duration** | 0.2s |
| **Role** | Compute verification score |

### Output Card
```
┌─────────────────────────────────────────┐
│  🛡  Community Verification   0.2s     │
├─────────────────────────────────────────┤
│  Verification Score: 82/100             │
│                                         │
│  ██████████████████░░  82%              │
│                                         │
│  Breakdown:                             │
│  • User trust (50/100 × 0.3): +15       │
│  • AI confidence (94% × 20):  +19       │
│  • Duplicate matches (2 × 5):  +10      │
│  • Dispute penalty:            0        │
│  • Base:                       50       │
│                                         │
│  Decision: AUTO_ROUTED ✅               │
│  (No community verification needed)     │
│                                         │
│  [View Full Output]                     │
└─────────────────────────────────────────┘
```

---

## 9. Agent 8 — Repair Recommendation Agent

| Property | Value |
|----------|-------|
| **Color** | `#F97316` (peach) |
| **Color Light** | `#FB923C` |
| **Icon** | `Wrench` (Lucide) |
| **Avatar** | Peach circle + wrench icon |
| **Model** | gemini-2.5-flash + cost table |
| **Avg Duration** | 0.4s |
| **Role** | Estimate repair cost and priority |

### Output Card
```
┌─────────────────────────────────────────┐
│  🔧 Repair Recommendation    0.4s      │
├─────────────────────────────────────────┤
│  Cost Estimate: ₹4,200 – ₹5,800        │
│                                         │
│  Breakdown:                             │
│  • Material (0.8m² × ₹800): ₹640        │
│  • Labor base:              ₹1,500      │
│  • Severity multiplier (×1.5): +₹2,460 │
│  • Total:                   ₹4,600      │
│                                         │
│  Repair Priority: IMMEDIATE             │
│  Est. repair time: 4 hours              │
│                                         │
│  "Cold mix asphalt patch recommended    │
│   for monsoon conditions."              │
│                                         │
│  [View Full Output]                     │
└─────────────────────────────────────────┘
```

---

## 10. Agent 9 — Government Routing Agent

| Property | Value |
|----------|-------|
| **Color** | `#EF4444` (coral) |
| **Color Light** | `#F87171` |
| **Icon** | `Send` (Lucide) |
| **Avatar** | Coral circle + send icon |
| **Model** | gemini-2.5-pro + function calling |
| **Avg Duration** | 1.2s |
| **Role** | Submit report to civic agency |

### Output Card
```
┌─────────────────────────────────────────┐
│  📤 Government Routing       1.2s      │
├─────────────────────────────────────────┤
│  Submission Method: Email               │
│  Status: ✅ Success                     │
│                                         │
│  ✓ Email sent to: bbmp@bruhathbengaluru │
│                 .gov.in                 │
│  ✓ Tracking token: BBMP-2026-142-08923  │
│  ✓ SLA clock started                    │
│  ✓ SLA deadline: 2026-06-27 14:32 IST   │
│                                         │
│  📞 Tool calls:                         │
│  • send_agency_email() → 800ms          │
│  • start_sla_clock() → 50ms             │
│                                         │
│  [View Email Draft]  [View Tracking]    │
└─────────────────────────────────────────┘
```

---

## 11. Follow-up Agent (Cron)

| Property | Value |
|----------|-------|
| **Color** | `#64748B` (slate) |
| **Color Light** | `#94A3B8` |
| **Icon** | `Clock` (Lucide) |
| **Avatar** | Slate circle + clock icon |
| **Model** | gemini-2.5-flash |
| **Schedule** | Every 48 hours (cron) |

### Output Card (shown in report timeline)
```
┌─────────────────────────────────────────┐
│  🕐 Follow-up Agent (48h check)         │
│     2026-06-27 14:32 IST                │
├─────────────────────────────────────────┤
│  Action: Status checked, no change      │
│                                         │
│  ✓ Queried Open311 status               │
│  • Status: still "new"                  │
│  • Last update: 2026-06-25 14:32        │
│                                         │
│  ⚠ No change in 48 hours                │
│                                         │
│  Drafted follow-up email to BBMP:       │
│  "Following up on report BBMP-2026-142  │
│   -08923, filed 48 hours ago..."        │
│                                         │
│  [View Draft]  [Send Now]  [Wait]       │
└─────────────────────────────────────────┘
```

---

## 12. Agent Color Summary

```
Agent 1 (Capture)              ●  Slate     #64748B  📷
Agent 2 (Vision)               ●  Indigo    #6366F1  👁
Agent 3 (Severity)             ●  Amber     #F59E0B  ⚠
Agent 4 (Jurisdiction)         ●  Sky       #0EA5E9  📍
Agent 5 (Duplicate Detection)  ●  Lavender  #8B5CF6  📋
Agent 6 (Impact Prediction)    ●  Lavender  #A78BFA  📈
Agent 7 (Community Verify)     ●  Mint      #10B981  🛡
Agent 8 (Repair Recommend)     ●  Peach     #F97316  🔧
Agent 9 (Government Routing)   ●  Coral     #EF4444  📤
Follow-up (Cron)               ●  Slate     #64748B  🕐
```

---

## 13. Agent Activity Animation

When an agent transitions from "waiting" to "active" to "complete", the animation sequence is:

1. **Waiting** (○): grey dot, no animation
2. **Active** (●): agent color dot, pulsing (opacity 0.3 → 1 → 0.3, 1.2s cycle)
3. **Complete** (✓): agent color dot with checkmark, no animation
4. **Failed** (✗): coral dot with X, shake animation (2 quick shakes)
5. **Skipped** (⊘): grey dot with strikethrough, no animation

```tsx
function AgentStatusIcon({ status, color }: { status: AgentStatus; color: string }) {
  if (status === 'waiting') {
    return <div className="w-3 h-3 rounded-full border-2 border-border-strong" />
  }
  
  if (status === 'running') {
    return (
      <motion.div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    )
  }
  
  if (status === 'success') {
    return (
      <div className="w-5 h-5 rounded-full flex items-center justify-center"
           style={{ backgroundColor: color }}>
        <CheckIcon className="w-3 h-3 text-white" />
      </div>
    )
  }
  
  if (status === 'failed') {
    return (
      <motion.div
        className="w-5 h-5 rounded-full flex items-center justify-center bg-danger"
        animate={{ x: [0, -3, 3, -3, 0] }}
        transition={{ duration: 0.3 }}
      >
        <XIcon className="w-3 h-3 text-white" />
      </motion.div>
    )
  }
  
  return <div className="w-3 h-3 rounded-full bg-text-subtle opacity-50" />
}
```

---

## End of AGENTS_UI.md
