# Implementation Notes & Technical Debt

This document tracks architectural decisions, current limitations, and technical debt that new engineers should be aware of when working on NagrikAI.

## 1. Architectural Decisions

### 1.1 The Single Monolithic Backend (`server.ts` & `dist/server.cjs`)
- **Decision**: To bundle both the Express API and the Vite frontend server into a single file for development, and a single `.cjs` file for production.
- **Why**: This drastically simplifies deployment on container services like Cloud Run (one port, one container) and avoids CORS issues since the frontend and backend share the same origin.
- **Tradeoff**: Tightly couples the frontend and backend deployment. We cannot scale the AI orchestration layer independently of the static file serving.

### 1.2 Pseudo-Routing (`App.tsx` state)
- **Decision**: Used a simple React `useState` string (e.g., `const [view, setView] = useState("home")`) instead of `react-router-dom`.
- **Why**: Faster MVP iteration. Allowed quick prototyping of the Sidebar navigation without dealing with `<Outlet />` or deep linking configurations.
- **Tradeoff**: **Significant Technical Debt.** The browser back button does not work. Users cannot bookmark specific pages like the Dashboard or a specific Report.
- **Action Item**: Migrate to a standard routing library.

### 1.3 In-Memory Data Store (`server/db.ts`)
- **Decision**: Store `Report` objects and `ReportEmbedding` vectors in plain TypeScript arrays.
- **Why**: Zero configuration required to start building the AI pipeline. Allowed immediate testing of the `text-embedding-004` duplicate detection logic without spinning up pgvector.
- **Tradeoff**: **Critical limitation for production.** Data is wiped on every server restart.
- **Action Item**: Complete the migration to PostgreSQL. The schema is already started in `src/db/schema.ts`, but the Express routes currently ignore it.

## 2. AI Pipeline Implementation Notes

### 2.1 Server-Sent Events (SSE) for the "Glass Box" UX
- The `POST /api/report` endpoint does not return standard JSON. It sets `Content-Type: text/event-stream`.
- This was chosen over WebSockets because the communication is strictly unidirectional (Server -> Client) during the processing phase.
- **Limitation**: The client must handle connection drops gracefully. If the connection breaks mid-stream, the report might be saved on the server, but the client will think it failed.

### 2.2 LLM Parsing Brittle-ness
- The AI agents in `server/agents.ts` request strict JSON output.
- We currently parse this using a regex: `match(/\{[\s\S]*\}/)`.
- **Risk**: If the Gemini model decides to format its output differently, or hallucinates extra text inside the JSON, `JSON.parse` will throw an error, crashing that specific agent's pipeline step.
- **Action Item**: Update the `@google/genai` calls to use `responseSchema` and `responseMimeType: "application/json"` to guarantee structured output at the API level, removing the need for regex parsing.

### 2.3 Gemini Real-Time Pipeline Completion
- We have completely replaced the `setTimeout` simulation steps for the Impact Agent and Routing Agent. All 9 pipeline steps are now backed by real LLM inference using `gemini-2.5-flash` or `gemini-2.5-pro`.
- **Note**: This increases the latency of the `POST /api/report` event stream. The client UX successfully masks this with the `AgentTimeline` component, providing real-time reasoning traces to the user.

## 3. UI/UX Implementation Notes

### 3.1 Map Tiles
- The map uses `react-leaflet` with default OpenStreetMap tiles.
- **Risk**: Default OSM tiles are rate-limited and often block heavy commercial/production traffic.
- **Action Item**: Switch the `url` in the `<TileLayer>` to a production-grade provider (e.g., Mapbox, Jawg, or Stadia Maps) and use styling that matches the `dark-mode` CSS variables.

### 3.2 Mobile Responsiveness
- The `Sidebar.tsx` hides on mobile (`hidden md:flex`), relying on the `TopHeader.tsx` mobile menu.
- Ensure that any new views added to `App.tsx` are tested specifically on mobile viewports to ensure padding and touch targets remain accessible.
