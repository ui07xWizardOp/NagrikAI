# Project Structure

NagrikAI is organized as a monorepo containing both the React frontend and the Express backend.

## Top-Level Directory Layout

```text
/
├── design/                 # Authoritative design and product documentation (the "Constitution")
├── docs/                   # Codebase documentation (this directory)
├── server/                 # Backend AI orchestration and in-memory database
├── src/                    # Frontend React application source code
├── assets/                 # Static assets
├── dist/                   # Production build output (generated)
├── index.html              # Frontend HTML entry point
├── server.ts               # Backend Express entry point
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
└── tailwind config         # Tailwind is configured directly in src/index.css via @theme
```

## Detailed Directory Breakdown

### `/design`
Contains the immutable product specifications, design tokens, and hackathon guidelines. These markdown files dictate the visual and functional behavior of the app. **Do not modify these unless altering the core product vision.**

### `/src` (Frontend)
Contains all client-side code.

- `/src/components`: The core UI components.
  - `App.tsx`: The root component handling layout and pseudo-routing.
  - `Home.tsx`: The map-centric landing page.
  - `Capture.tsx`: The issue reporting flow (camera, voice, AI timeline).
  - `Dashboard.tsx`: The complex agency/journalist interface.
  - `ReportDetail.tsx`: The modal/overlay showing specific issue details.
  - `/src/components/ui`: Smaller, reusable generic UI components (e.g., generic forms).
- `/src/lib`: Helper functions and integrations.
  - `firebaseAuth.ts`, `firebase.ts`: Authentication utilities.
- `/src/db`: (Note: This appears to be setup for Drizzle ORM, though the active MVP uses `server/db.ts`).
  - `schema.ts`, `index.ts`: Database schemas for PostgreSQL.
- `/src/types.ts`: TypeScript interfaces defining the shape of a `Report` and `Comment`.
- `/src/index.css`: The global stylesheet containing Tailwind imports and custom `@theme` CSS variables.
- `/src/main.tsx`: The React DOM rendering entry point.

### `/server` (Backend logic)
Contains the server-side modules imported by `server.ts`.

- `/server/agents.ts`: The core AI logic. Contains the definitions for the Vision, Severity, Jurisdiction, Duplicate, and Repair agents using the Gemini SDK.
- `/server/db.ts`: The in-memory data store. Holds the `reports` array and `reportEmbeddings` vector array, along with the `cosineSimilarity` search function.

### Root Files
- `server.ts`: The main Express application. It defines the `/api/report` SSE endpoint, standard REST endpoints, and sets up Vite middleware for development or static serving for production.
- `package.json`: Defines build scripts. Notably:
  - `dev`: Uses `tsx` to run the TypeScript Express server, which in turn boots Vite.
  - `build`: Builds the Vite frontend, then uses `esbuild` to bundle `server.ts` into a single CommonJS file.
