# Features

This document outlines the core user-facing features of NagrikAI, tracking their purpose, integration points, and current implementation status.

## 1. Issue Capture & AI Pipeline (Citizen Flow)
**User Problem Solved**: Reporting civic issues is tedious and requires knowing exactly which department is responsible.
**Where it lives**: `/src/components/Capture.tsx`, `/server/agents.ts`
**How it works**:
- The user takes a photo and optionally speaks a description.
- The client captures geolocation and media, sending it to the `/api/report` endpoint.
- The server processes the report sequentially through a chain of AI Agents (Vision -> Severity -> Jurisdiction -> Duplicate -> Verification -> Impact -> Repair).
- The client receives Server-Sent Events (SSE) and displays a real-time timeline of the AI's "thought process".
**Status**: Implemented and functional using in-memory state.

## 2. Interactive Civic Map (Citizen Flow)
**User Problem Solved**: Citizens lack spatial awareness of issues in their neighborhood.
**Where it lives**: `/src/components/Home.tsx`
**How it works**:
- Uses React-Leaflet to render an interactive map.
- Fetches all reports via `/api/reports` and plots them as custom styled markers.
- Tapping a marker opens a tooltip with brief details.
**Status**: Implemented. Note: Maps require valid tiles and coordinates to render effectively.

## 3. Operations Dashboard (Agency Flow)
**User Problem Solved**: City agencies need a unified, intelligent queue to triage and manage incoming reports based on severity and SLA.
**Where it lives**: `/src/components/Dashboard.tsx`
**How it works**:
- A complex interface featuring a list view and a map view side-by-side.
- Filters for status (Pending, Verified, Resolved) and search.
- Displays calculated impact scores and SLA deadlines.
- Allows updating issue status (e.g., marking as Resolved).
**Status**: Implemented. Clicking a report opens `ReportDetail.tsx`.

## 4. Report Details & Tracking (Shared Flow)
**User Problem Solved**: Citizens and agencies need a detailed view of a single issue, its history, and community input.
**Where it lives**: `/src/components/ReportDetail.tsx`
**How it works**:
- A modal overlay showing the full data model of a specific report.
- Displays images, AI reasoning traces, cost estimates, and map location.
- Includes a comment section where users can add updates.
**Status**: Implemented. Comments are posted to `/api/reports/:id/comments`.

## 5. Community Verification (Citizen Flow)
**User Problem Solved**: Reducing spam and validating reports through crowd-sourcing.
**Where it lives**: `/src/components/CommunityVerification.tsx`
**How it works**:
- Presents a swipe-able or list interface of pending reports.
- Users can confirm or reject the existence of an issue.
**Status**: UI Implemented. Backend logic for updating the verified status and impact score via user voting is partially implemented/mocked.

## 6. Open Data Portal (Journalist Flow)
**User Problem Solved**: Journalists and researchers need structured access to historical civic data.
**Where it lives**: `/src/components/OpenData.tsx`
**How it works**:
- Provides mock API keys and buttons to export CSV/JSON.
- Shows anomalies and SLA breach metrics.
**Status**: UI Implemented. Export functionality currently displays toast notifications (mocked).

## 7. Hotspot Analysis (Agency Flow)
**User Problem Solved**: Agencies need to see aggregate trends rather than individual reports to plan infrastructure upgrades.
**Where it lives**: `/src/components/Hotspots.tsx`
**How it works**:
- Displays high-risk areas based on report density and severity.
**Status**: UI Implemented with mocked static data. Needs integration with backend clustering logic.
