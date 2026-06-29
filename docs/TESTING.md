# Testing

## Current State

Currently, the NagrikAI repository does not have a formal automated testing suite (e.g., Jest, Vitest, Cypress, or Playwright). Testing relies entirely on manual QA and the defined `NagrikAI Core Feature Testing Suite Protocol`.

## Manual QA Protocol

The product must be evaluated against the 10-phase protocol defined in `design/14_DESIGN_QA.md` and the Core Feature Testing Suite.

Key testing areas include:
1. **Agent Output Validation**: Ensuring the AI pipeline returns valid JSON and does not hallucinate agency jurisdictions or severity inflation.
2. **SSE Reconnection**: Testing how the UI handles network drops during the `/api/report` streaming process.
3. **Responsive Layout**: Verifying the Sidebar to TopHeader transition on mobile devices.
4. **Dark Mode Toggle**: Ensuring no color inversions or unreadable text occur when switching themes.

## Future Implementation Recommendations

To ensure reliability, the following automated testing strategies should be implemented:

1. **Unit Testing (Vitest)**
   - Target: `server/agents.ts`.
   - Goal: Mock the Gemini SDK and ensure parsing logic correctly extracts JSON from text blocks.
   - Target: `server/db.ts`.
   - Goal: Verify the math in the `cosineSimilarity` function.

2. **Component Testing (React Testing Library)**
   - Target: `src/components/Capture.tsx`.
   - Goal: Ensure the SSE timeline renders correctly as mock events are fired.

3. **End-to-End Testing (Playwright)**
   - Target: The full report submission flow.
   - Goal: Simulate a user taking a photo, navigating the map, and submitting the report.

## Static Analysis

The project uses TypeScript for type safety. Ensure the build passes without type errors:
```bash
npm run lint
```
*(This executes `tsc --noEmit`)*
