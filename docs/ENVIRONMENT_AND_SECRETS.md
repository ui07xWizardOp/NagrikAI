# Environment and Secrets

## Required Environment Variables

To run NagrikAI, you need to configure specific environment variables. These should be placed in a `.env` file in the root directory for local development, or configured securely in your hosting provider for production.

### AI Integration
- `GEMINI_API_KEY`: **(Required)** The API key for Google Gemini. This is required for the entire multi-agent pipeline to function. You can obtain this from Google AI Studio.

### Optional / Future Integrations
- `DATABASE_URL`: (Optional) Connection string for a PostgreSQL database, if migrating away from the in-memory store.
- `VITE_MAPBOX_TOKEN`: (Optional) If switching from generic Leaflet tiles to Mapbox for styled maps. Note the `VITE_` prefix, making it accessible to the client browser.

## Security Posture

- **No Client-Side Secrets**: The `GEMINI_API_KEY` is strictly a server-side variable. It is only accessed within `server/agents.ts` via `process.env.GEMINI_API_KEY`. It is never prefixed with `VITE_` and never shipped to the browser bundle.
- **Environment Example**: A `.env.example` file is provided in the repository to document the required keys without exposing actual secrets.
