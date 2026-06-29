# State Management

NagrikAI manages state across multiple layers: Server-side persistence, Client-side global navigation, and Client-side component-level state.

## 1. Server State (Persistence)

As documented in `DATA_MODELS.md`, the authoritative state of the application (Reports, Comments) currently lives in-memory on the Node.js server within `server/db.ts`.

- **Mutation**: State is mutated exclusively via REST endpoints (`PATCH /api/reports/:id`, `POST /api/reports/:id/comments`) and the SSE AI pipeline (`POST /api/report`).
- **Synchronization**: The client fetches fresh state from `GET /api/reports` upon mounting relevant components (e.g., `Home`, `Dashboard`, `ReportDetail`).

## 2. Client Global State (Navigation)

The application uses a lightweight, top-level state variable in `App.tsx` to handle routing instead of a formal library like React Router.

```typescript
// src/App.tsx
const [view, setView] = useState<
  "home" | "capture" | "dashboard" | "playbook" | "verify" | "hotspots" | "agency" | "profile" | "settings" | "login" | "karma" | "myreports" | "opendata" | "alerts"
>("home");
```

- **Propagation**: The `setView` function is passed as a prop to components that need to trigger navigation (e.g., the `Sidebar`, buttons in `Home`).
- **Limitation**: This approach means URL paths do not change, preventing deep linking or browser back/forward navigation.

## 3. Client Component State (Local)

Individual components manage their own specific UI states using React's `useState` and `useEffect`.

### Example: `Capture.tsx`
Manages the complex state of a report submission.
- `step`: Controls the wizard flow ('camera' -> 'details' -> 'processing' -> 'success').
- `images`: Array of captured photos.
- `text`, `location`, `lat`, `lng`: Sensor and user inputs.
- `logs`: Array of SSE events received from the server, used to render the AI reasoning timeline.

### Example: `Dashboard.tsx`
Manages data fetching and filtering.
- `reports`: The local copy of data fetched from `/api/reports`.
- `loading`: Boolean indicating network fetch status.
- `searchQuery`, `statusFilter`: Control which reports are rendered in the list.
- `selectedReport`: Holds the ID of a report to open the `ReportDetail` modal.

## 4. Toast Notifications

Components needing temporary notifications (like `Settings.tsx` or `Capture.tsx`) implement local toast state:
```typescript
const [toasts, setToasts] = useState<{id: number, message: string, type: 'success' | 'info' | 'error'}[]>([]);
```
These are auto-dismissed via `setTimeout`. There is currently no global Context provider for toasts; the logic is duplicated in components that need it.
