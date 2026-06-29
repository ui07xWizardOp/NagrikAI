# Architecture Overview

NagrikAI is designed as a monolithic full-stack JavaScript application, prioritizing simplicity, rapid iteration, and tight integration between the client and the AI orchestration layer.

## High-Level Architecture

The system follows a classic Client-Server model but is uniquely structured to allow seamless AI agent streaming to the frontend.

1. **Client (Frontend)**
   - Built with React and Vite.
   - Responsible for rendering the map-first UI, capturing device sensors (geolocation, camera), and providing real-time feedback during the AI processing pipeline.
   - Communicates with the backend via RESTful APIs and Server-Sent Events (SSE).

2. **Server (Backend)**
   - Built with Express.js.
   - Exposes REST endpoints for data fetching and mutations (e.g., fetching reports, adding comments).
   - Exposes a specialized SSE endpoint (`/api/report`) that orchestrates the multi-agent AI pipeline and streams intermediate reasoning steps back to the client.

3. **AI Orchestration Layer**
   - Lives entirely on the server within `server/agents.ts` and `server.ts`.
   - Uses the `@google/genai` SDK to interact with Google's Gemini models.
   - Implements a sequential pipeline of specialized agents.

4. **Data Layer (Persistence)**
   - Currently implemented as an in-memory store in `server/db.ts` for MVP purposes.
   - Includes standard relational-style arrays (`reports`) and an in-memory vector store (`reportEmbeddings`) for semantic similarity search.

## Component Architecture (Frontend)

The frontend uses a single-page application (SPA) model. The `App.tsx` component acts as a lightweight router and layout manager, conditionally rendering primary views (e.g., `Home`, `Capture`, `Dashboard`) based on a central `view` state string, alongside a persistent `Sidebar` and `TopHeader`.

The UI is built using functional React components and heavily leverages Tailwind CSS utility classes for styling, adhering to a strict design system defined in `src/index.css` and various configuration files.

## AI Orchestration Architecture

The AI layer is the defining feature of NagrikAI. It uses a "Swarm" or "Pipeline" architectural pattern rather than a single monolithic prompt.

When a report is submitted, the server executes a chain of functions, each representing an "Agent". Each agent receives context from the previous agents, performs a specific reasoning task using a specific Gemini model (e.g., Pro for vision, Flash for fast logic), and returns structured JSON output.

Crucially, as each agent completes its task, the server flushes a Server-Sent Event (SSE) to the client. This architectural choice enables the "Glass Box" UX, allowing the user to watch the AI "think" in real-time.

## Map Architecture

The mapping system is built on `react-leaflet`, wrapping the Leaflet.js library. It uses custom SVG/HTML markers rendered via Leaflet's `divIcon` to match the project's design system. The map is integrated closely with the `reports` data, dynamically plotting issues based on their coordinates.

## Known Limitations & Tradeoffs

- **In-Memory Storage**: The current data layer (`server/db.ts`) does not persist across server restarts. This is acceptable for a hackathon/prototype but requires migration to a durable database (e.g., PostgreSQL with pgvector, or Firebase Firestore) for production.
- **Sequential Agent Pipeline**: The AI agents currently run largely sequentially. While some depend on others (e.g., Severity depends on Vision), independent agents (e.g., Jurisdiction) could theoretically be parallelized to reduce total latency.
- **Client-Side Routing**: The application uses simple state-based routing (`const [view, setView] = useState("home")`) rather than a dedicated library like React Router. This breaks browser history (back/forward buttons) and deep linking.
