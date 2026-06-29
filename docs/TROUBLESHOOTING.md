# Troubleshooting

This document outlines common issues encountered while developing or running NagrikAI and how to resolve them.

## 1. Application Fails to Start (Local Development)

**Symptom:** Running `npm run dev` throws an error or exits immediately.
**Possible Causes:**
- **Missing Environment Variables**: The backend strictly requires `process.env.GEMINI_API_KEY`. If it is undefined, `server.ts` or `server/agents.ts` will throw an initialization error.
  - *Fix*: Ensure you have a `.env` file in the root directory with a valid `GEMINI_API_KEY`.
- **Port Conflict**: Port 3000 is already in use by another application.
  - *Fix*: Find and terminate the process using port 3000 (e.g., `lsof -i :3000` on macOS/Linux), or if running in an AI Studio environment, restart the dev server container.

## 2. Issue Capture Flow (AI Pipeline) Hangs or Fails

**Symptom:** The user submits a photo/text in `Capture.tsx`, but the timeline stalls at "Initializing AI Agents..." or throws an "An error occurred" toast.
**Possible Causes:**
- **Invalid API Key**: The Gemini API key is expired or invalid, causing the `@google/genai` SDK to throw a 401/403.
- **SSE Connection Dropped**: The browser or a proxy closed the Server-Sent Events connection before completion.
  - *Fix*: Check the browser's Network tab. Ensure the `/api/report` request remains open and streams `text/event-stream`.
- **JSON Parsing Failure in Agents**: The AI model (`gemini-2.5-pro` or `gemini-2.5-flash`) returned malformed JSON, and the regex in `server/agents.ts` failed to parse it.
  - *Fix*: Inspect the server console logs. The prompt engineering in `server/agents.ts` requests strict JSON without markdown wrapping. If the model hallucinates outside of this, the `match(/\{[\s\S]*\}/)` might fail. Consider adjusting the prompt instructions or using structured output parameters if available in the SDK.

## 3. Map is Blank or Missing Tiles

**Symptom:** The map in `Home.tsx` or `Dashboard.tsx` loads a gray background with markers but no streets/geography.
**Possible Causes:**
- **Missing CSS**: Leaflet requires its core CSS file to render correctly.
  - *Fix*: Ensure `import "leaflet/dist/leaflet.css";` is present at the top of the map component or `main.tsx`.
- **Tile Server Blocked**: The default OSM tile server is blocked by CORS or network policies.
  - *Fix*: Check the browser console for network errors fetching from `openstreetmap.org`.

## 4. UI Does Not Update on Data Change

**Symptom:** A report is submitted, but it doesn't appear on the Home map or Dashboard until the page is fully refreshed.
**Possible Causes:**
- **State Stale**: The component is not re-fetching from `/api/reports` upon mounting.
  - *Fix*: Ensure `useEffect` blocks that fetch data are correctly firing when the component comes into view (i.e., when the `view` state in `App.tsx` changes to that component).
- **Missing WebSocket/SSE for Global Updates**: NagrikAI currently relies on fetching data on mount. There is no global WebSocket broadcasting updates to all connected clients.
  - *Fix (Architectural)*: Implement a WebSocket server or polling mechanism if real-time multi-client updates are required for the MVP.

## 5. Duplicate Reports Not Being Detected

**Symptom:** A user uploads a clearly duplicate issue, but the Verification Agent marks it as "Pending Verification" instead of "Community Verified".
**Possible Causes:**
- **Embedding Generation Failed**: The `text-embedding-004` model failed. Check server logs.
- **Threshold Too High**: The cosine similarity threshold in `runVerificationAgent` is currently set to `0.85`.
  - *Fix*: In `server/agents.ts`, lower the threshold (e.g., to `0.80`) temporarily to see if similar embeddings are being generated.
- **Empty Database**: Because the database is in-memory (`server/db.ts`), all embeddings are lost when the server restarts. You cannot test deduplication without submitting at least two reports in the same server session.
