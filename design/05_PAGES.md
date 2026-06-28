# PAGES.md — NagrikAI Page Specifications

> **Every page, specified. Purpose, layout, components, interactions.**
>
> **Version**: 1.0.0

---

## Page Index

1. [Home (Map + Report)](#1-home)
2. [Report Capture](#2-report-capture)
3. [Report Detail](#3-report-detail)
4. [My Reports](#4-my-reports)
5. [Map View](#5-map-view)
6. [Hotspot Map](#6-hotspot-map)
7. [Community Verification](#7-community-verification)
8. [Karma Leaderboard](#8-karma-leaderboard)
9. [Profile](#9-profile)
10. [Settings](#10-settings)
11. [Agency Queue](#11-agency-queue)
12. [Agency SLA Tracker](#12-agency-sla-tracker)
13. [Journalist API Portal](#13-journalist-api-portal)
14. [Landing Page](#14-landing-page)
15. [Login](#15-login)

---

## 1. Home

**Purpose**: The citizen's home base. Map + camera button. Where the demo starts.

**Layout**:
```
┌─────────────────────────────────────────────┐
│ Sidebar │         TopBar                    │
│         ├───────────────────────────────────┤
│         │                                   │
│         │         MAP (full)                │
│         │                                   │
│         │    ┌──────────────────┐          │
│         │    │  [📷 Report]     │ ← FAB    │
│         │    └──────────────────┘          │
│         │                                   │
│         │  ┌─────────────────────────┐     │
│         │  │ Recent Reports (glass)  │     │
│         │  │ • Pothole, Ward 142     │     │
│         │  │ • Water leak, Ward 87   │     │
│         │  └─────────────────────────┘     │
│         │                                   │
└─────────┴───────────────────────────────────┘
```

**Components**: Sidebar, TopBar, NagrikAIMap, FabButton (camera), glassmorphic recent reports panel.

**Interactions**:
- Tap FAB → opens Report Capture
- Tap map marker → opens Report Detail in drawer
- Tap recent report → opens Report Detail

**Responsive**: Mobile = map 60vh, FAB bottom-right, recent reports below. Desktop = map full, FAB center, recent reports glass overlay bottom-left.

---

## 2. Report Capture

**Purpose**: Photo + voice capture. The entry point for the AI pipeline.

**Layout** (Mobile-first, full-screen):
```
┌─────────────────────────┐
│  ✕              Flash   │
│                         │
│                         │
│    [Camera viewfinder]  │
│                         │
│                         │
│                         │
│  🎤 Mic    [◉ Shutter]  │
└─────────────────────────┘
```

**Components**: CameraCapture, VoiceCapture, ShutterButton.

**Interactions**:
- Tap shutter → capture photo, auto-get GPS, return to home with pipeline running
- Tap mic → start recording, tap again to stop
- Tap ✕ → cancel, return to home

**AI Interaction**: After capture, the full 9-agent pipeline runs. Home screen shows AgentTimeline in a glass overlay.

---

## 3. Report Detail

**Purpose**: Full report view with agent timeline, override controls.

**Layout** (Desktop = drawer over map; Mobile = full page):
```
┌─────────────────────────────┐
│  ✕              Report #r_3 │
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │   [Photo]             │  │
│  │                       │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│  Pothole          ●94%     │
│  Severity 4 · 0.8m²         │
├─────────────────────────────┤
│  AGENT TIMELINE             │
│  ●━ Capture      ✓ 0.3s    │
│  ●━ Vision       ✓ 2.1s    │
│  ●━ Severity     ✓ 1.4s    │
│  ●━ Jurisdiction ✓ 0.8s    │
│  ...                        │
├─────────────────────────────┤
│  Routed to: BBMP            │
│  SLA: 48h (expires 14:32)   │
│  Tracking: BBMP-2026-142    │
├─────────────────────────────┤
│  [Override]  [Share]        │
└─────────────────────────────┘
```

**Components**: ReportHeader, PhotoViewer, AgentTimeline, ConfidenceBadge, SeverityBadge, OverrideButton, ShareButton.

---

## 4. My Reports

**Purpose**: Citizen's report list.

**Layout**:
```
┌─────────────────────────────┐
│  My Reports (12)            │
│  [Filter: All ▾]            │
├─────────────────────────────┤
│  ┌─────────────────────┐    │
│  │ IssueCard           │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ IssueCard           │    │
│  └─────────────────────┘    │
│  ...                        │
└─────────────────────────────┘
```

**Empty State**: "No reports yet. Reports you file will appear here." + [Report an Issue] CTA.

**Loading**: 3 IssueCardSkeletons.

---

## 5. Map View

**Purpose**: Full-screen map with all reports.

**Layout**: Full-screen map + MapControls (top-right) + filter bar (top).

---

## 6. Hotspot Map

**Purpose**: Predictive heatmap of where issues will appear.

**Layout**: Full-screen map with heatmap layer + time slider (bottom) + legend (top-left).

**Interactions**:
- Drag time slider → see predictions change
- Tap hotspot zone → see prediction details (predicted reports, confidence, historical data)

---

## 7. Community Verification

**Purpose**: Queue of unverified reports for citizens to confirm/dispute.

**Layout**:
```
┌─────────────────────────────┐
│  Verify Reports (5 nearby)  │
├─────────────────────────────┤
│  ┌─────────────────────┐    │
│  │ [Photo]             │    │
│  │ Pothole · Ward 142  │    │
│  │ "Visible depression"│    │
│  │ AI Confidence: 62%  │    │
│  │                     │    │
│  │ [✓ Confirm] [✗ Dispute] │
│  └─────────────────────┘    │
│  ...                        │
└─────────────────────────────┘
```

---

## 8. Karma Leaderboard

**Purpose**: Gamification. Top citizens by karma.

**Layout**: List of users with rank, avatar, name, karma points, badge.

---

## 9. Profile

**Purpose**: User's trust score, karma, stats.

**Layout**: Avatar + name, trust score (large circular progress), karma points, reports filed/verified, badges.

---

## 10. Settings

**Purpose**: Theme toggle, language, notifications.

**Layout**: Simple form with sections: Appearance (theme), Language (dropdown), Notifications (toggles), Account (logout).

---

## 11. Agency Queue

**Purpose**: Agency staff view of pending reports.

**Layout**: Filter bar (ward, issue type, severity) + table of reports with status, SLA timer, assign button.

---

## 12. Agency SLA Tracker

**Purpose**: Public dashboard of agency performance.

**Layout**: KPI cards (avg resolution time, SLA breach rate) + chart (resolution time over time) + table (per-ward breakdown).

---

## 13. Journalist API Portal

**Purpose**: API documentation + data export for journalists.

**Layout**: API key display, endpoint documentation, live data preview, CSV/JSON export buttons, "Story Leads" panel (anomaly detection).

---

## 14. Landing Page

**Purpose**: Public-facing landing page (not for demo).

**Layout**: Hero (NagrikAI logo + tagline + CTA) → How it works (3 steps) → Stats (Swachhata comparison) → Demo video → Footer.

---

## 15. Login

**Purpose**: Phone OTP authentication.

**Layout**: Centered card with phone number input → OTP input. Minimal, calm.

---

## End of PAGES.md

Each page must implement the DESIGN_QA.md checklist. Each page must work in light and dark mode. Each page must be responsive.
