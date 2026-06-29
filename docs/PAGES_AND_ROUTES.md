# Pages and Routes

NagrikAI is a Single Page Application (SPA) that uses state-based pseudo-routing. There are no traditional URL paths (like `/dashboard` or `/capture`). Instead, the `App.tsx` component maintains a `view` state variable.

## Available Views (Pseudo-Routes)

The `view` state is a string literal union type defined in `App.tsx`:

```typescript
type ViewState = 
  | "home" 
  | "capture" 
  | "dashboard" 
  | "playbook" 
  | "verify" 
  | "hotspots" 
  | "agency" 
  | "profile" 
  | "settings" 
  | "login" 
  | "karma" 
  | "myreports" 
  | "opendata" 
  | "alerts";
```

### Flow Breakdown

#### Citizen Flows
- **`home`**: The default view. A full-screen map showing issues in the area.
- **`capture`**: The flow to report a new issue (Camera -> Details -> AI Processing -> Success).
- **`myreports`**: A list of issues reported by the current user.
- **`verify`**: (CommunityVerification.tsx) Interface to confirm or deny pending reports from other users.
- **`karma`**: Displays the user's trust score and civic engagement metrics.
- **`profile`**: User profile details.

#### Agency / Government Flows
- **`dashboard`**: The main triage queue for civic workers. Includes list and map views, filters, and status controls.
- **`hotspots`**: Analytical map showing density and high-risk areas.
- **`agency`**: Specific configuration or overview for a particular government agency.
- **`playbook`**: Standard Operating Procedures (SOPs) or guidelines for handling issues.

#### External / Journalist Flows
- **`opendata`**: The portal for journalists and researchers to export data and view anomalies.

#### System Flows
- **`login`**: Authentication screen.
- **`settings`**: User preferences (Theme, Notifications).
- **`alerts`**: System and issue notifications.

## Navigation Mechanisms

Navigation is achieved by passing the `setView` function down the component tree. 

For example, to navigate from the Home map to the Capture flow, a button in `Home.tsx` executes:
`onClick={() => setView("capture")}`

## Routing Limitations

Because this relies on React state rather than the Browser History API:
1. The URL in the address bar never changes (it stays at `/`).
2. The browser's Back and Forward buttons will not navigate between these views.
3. Users cannot share a link to a specific page (e.g., they cannot link directly to the Dashboard).

**Future Improvement**: Integrate `react-router-dom` or move to a framework like Next.js/Remix to provide true URL-based routing.
