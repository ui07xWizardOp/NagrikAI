# NagrikAI Operations Runbook

This runbook outlines standard operating procedures for deploying, managing, and maintaining the NagrikAI platform in a production environment.

## 1. Deployment Procedures

### 1.1 Triggering a Production Build
NagrikAI uses a custom Vite + esbuild pipeline to create a single-artifact deployment.

```bash
# 1. Install dependencies
npm ci

# 2. Execute the build script
npm run build
```
This produces the following artifacts in the `/dist` directory:
- `index.html`, `/assets/*`: The compiled React frontend.
- `server.cjs`: The bundled Express backend containing all AI and database logic.

### 1.2 Starting the Application
```bash
# Start the production server
NODE_ENV=production PORT=3000 node dist/server.cjs
```
Verify the server starts and logs: `Server running on http://0.0.0.0:3000`.

## 2. Environment Variable Management

The application strictly requires the `GEMINI_API_KEY`. 
- **Rotation**: If the API key is compromised, generate a new one via Google AI Studio. Update the environment variable in your hosting provider (e.g., Google Cloud Run Secrets) and restart the instances. No code changes are required.

## 3. Incident Response & Monitoring

### 3.1 AI Pipeline Failures (P0)
**Symptom**: High error rate on `POST /api/report`. Users complain about reports failing to process.
**Action**:
1. Check Server Logs: Look for `Error: Gemini API key not configured` or `[GoogleGenerativeAI Error]`.
2. Verify API Quota: The issue may be that the Google AI Studio project has exceeded its rate limits (Requests Per Minute for Gemini-2.5-Pro).
3. Mitigation: If quota is exceeded, upgrade the billing tier in Google Cloud Console.

### 3.2 In-Memory Database Loss (P1)
**Symptom**: All reports disappear.
**Action**:
1. **Understand Current Architecture**: The current MVP utilizes `server/db.ts` which is strictly in-memory. **Any deployment rollout, container restart, or crash will result in total data loss.**
2. **Mitigation**: Until a PostgreSQL/Drizzle ORM migration is completed, this behavior is expected. Do not treat container restarts as non-destructive operations.

## 4. Routine Maintenance

### 4.1 Dependency Updates
Run `npm audit` monthly. If critical vulnerabilities are found in the `@google/genai` SDK or Express, patch them immediately, rebuild (`npm run build`), and deploy.

### 4.2 LLM Model Versioning
Google periodically deprecates older Gemini models.
- **Action**: Every 3-6 months, review `server/agents.ts`. Ensure that `gemini-2.5-pro` and `gemini-2.5-flash` are still the recommended active models. Update the strings if a newer, more efficient model becomes available.

## 5. Rollback Procedures

If a new deployment introduces a critical bug:
1. Identify the previous stable container image hash or git commit.
2. Revert the traffic in your hosting provider (e.g., Cloud Run "Manage Traffic" interface) to point 100% to the previous revision.
3. Investigate the cause in a staging environment.
