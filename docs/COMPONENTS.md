# Components

This document outlines the major React components in NagrikAI, their roles, and dependencies.

## Layout & Core Components

### `App.tsx`
- **Role**: The root component. Manages the global `view` state for pseudo-routing.
- **Children**: Renders `TopHeader`, `Sidebar`, and the active view component conditionally.

### `Sidebar.tsx`
- **Role**: The main navigation menu.
- **Props**: Receives `setView` and `currentView` to highlight active tabs and handle navigation.
- **Styling**: Responsive sidebar (hidden on mobile, relies on `TopHeader` mobile menu).

### `TopHeader.tsx`
- **Role**: Top navigation bar, primarily used for search, quick actions (notifications), and mobile menu toggle.

## Primary View Components ("Pages")

### `Home.tsx` (Map Landing)
- **Role**: The default citizen view. Renders a full-screen interactive map showing nearby reports.
- **Dependencies**: `react-leaflet`, fetches from `/api/reports`.
- **Interactions**: Tapping a marker opens a tooltip. A floating action button triggers the `Capture` flow.

### `Capture.tsx` (Reporting Flow)
- **Role**: The interface for capturing a new civic issue.
- **Features**:
  - Accesses device camera (via HTML5 `<video>` and `<canvas>`).
  - Accesses geolocation (`navigator.geolocation`).
  - Speech-to-text input (Web Speech API / `webkitSpeechRecognition`).
  - Connects to `/api/report` via `EventSource` (SSE) to render the live AI reasoning timeline.

### `Dashboard.tsx` (Agency View)
- **Role**: The command center for civic agencies.
- **Features**:
  - Fetches and displays a list of reports.
  - Implements client-side filtering (Search, Status).
  - Renders a secondary map specifically for the filtered reports.
  - Controls opening the `ReportDetail` modal.

### `MyReports.tsx`
- **Role**: Shows reports submitted by the logged-in user.
- **Features**: Reuses list layout from Dashboard but filtered for the user.

### `OpenData.tsx` (Journalist Portal)
- **Role**: Interface for researchers to access historical data.
- **Features**: Mostly static UI demonstrating API keys and export functionality. Includes local toast notifications.

### `CommunityVerification.tsx`
- **Role**: Interface for users to validate existing reports.
- **Features**: Renders a list of pending reports requiring crowd-sourced verification.

## Shared UI Components

### `ReportDetail.tsx`
- **Role**: A detailed view modal for a single report.
- **Props**: `reportId` (string), `onClose` (function).
- **Features**:
  - Fetches fresh data for the specific report.
  - Displays images, AI reasoning metrics (Severity, Jurisdiction, Impact, Cost).
  - Implements a comment section (`POST /api/reports/:id/comments`).

### `/src/components/ui/`
This directory contains lower-level, reusable UI atoms (likely generated or adapted from a library like shadcn/ui), such as `Button`, `Input`, `Textarea`, `Label`. These rely on Tailwind CSS and `clsx`/`tailwind-merge` (`src/lib/utils.ts`) for style composition.
