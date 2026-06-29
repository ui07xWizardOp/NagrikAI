# NagrikAI

NagrikAI is an autonomous civic intelligence platform designed to transform how citizens report, track, and resolve urban infrastructure issues. By combining an intuitive, map-first user interface with a sophisticated multi-agent AI architecture, NagrikAI bridges the gap between citizens, journalists, and government agencies.

## Overview

Traditional civic grievance systems are opaque, slow, and frustrating. Citizens report issues into a "black box" and rarely see updates. NagrikAI solves this by providing:

1. **Effortless Reporting**: Citizens can capture issues using a smartphone camera, with voice descriptions and automatic geolocation.
2. **AI-Powered Orchestration**: A swarm of specialized AI agents processes the report in real-time, handling classification, severity estimation, jurisdiction routing, duplicate detection, and repair cost estimation.
3. **Transparent Workflows**: The multi-agent processing pipeline is fully visible to the user, providing a "glass box" experience with reasoning and confidence scores for every AI decision.
4. **Community Verification**: Issues can be verified by the community, increasing their trust score and escalating their priority automatically.
5. **Agency and Journalist Dashboards**: Government agencies get an actionable queue with SLA tracking, while journalists access a portal for investigative data analysis.

## Core Workflows

- **Citizen Journey**: Landing on a dynamic map, the citizen sees hotspots and nearby issues. They tap to capture a new issue, triggering the AI Agent pipeline, and then track the resolution in a transparent timeline.
- **Agent Pipeline**: A sequence of Gemini-powered agents (Vision, Severity, Jurisdiction, Duplicate Detection, Verification, Impact, Repair, Routing) processes the incoming report to enrich it with metadata and route it correctly.
- **Agency Operations**: Civic workers use a comprehensive dashboard to manage their queue, track SLAs, and update issue statuses.

## Architecture & Technology Stack

NagrikAI is built as a full-stack JavaScript application:

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Leaflet (React-Leaflet) for maps.
- **Backend**: Express.js server bundled alongside the frontend in development (via `tsx`) and production (via `esbuild`).
- **AI Integration**: `@google/genai` (Gemini SDK) powers the multi-agent system, utilizing `gemini-2.5-pro` for vision and `gemini-2.5-flash` for rapid reasoning tasks, along with `text-embedding-004` for duplicate detection.
- **State & Data**: In-memory data structures serve as the persistence layer for the MVP, with vector similarity search for report deduplication.

## Documentation Index

Explore the complete implementation-grade documentation set in the `/docs` directory:

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Project Structure](./docs/PROJECT_STRUCTURE.md)
- [Features](./docs/FEATURES.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Data Models](./docs/DATA_MODELS.md)
- [State Management](./docs/STATE_MANAGEMENT.md)
- [Components](./docs/COMPONENTS.md)
- [Pages and Routes](./docs/PAGES_AND_ROUTES.md)
- [AI and Agent Workflows](./docs/AI_AND_AGENT_WORKFLOWS.md)
- [Map System](./docs/MAP_SYSTEM.md)
- [Design System](./docs/DESIGN_SYSTEM.md)
- [Testing](./docs/TESTING.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [Environment and Secrets](./docs/ENVIRONMENT_AND_SECRETS.md)

## Getting Started

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) and [ENVIRONMENT_AND_SECRETS.md](./docs/ENVIRONMENT_AND_SECRETS.md) for instructions on running NagrikAI locally or deploying to production.
