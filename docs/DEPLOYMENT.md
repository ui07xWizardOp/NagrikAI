# Deployment

This document outlines how to build and deploy NagrikAI for production.

## Production Architecture

In production, the application is bundled into a single Node.js application:
- The React frontend is compiled into static HTML/JS/CSS assets.
- The Express backend serves these static assets and handles API requests.

## Build Process

The `package.json` defines the `build` script:
```bash
npm run build
```
This executes two steps:
1. `vite build`: Compiles the React frontend into the `/dist` directory.
2. `esbuild server.ts ...`: Bundles the Express server and its dependencies (excluding external node_modules) into a single `/dist/server.cjs` file.

## Running in Production

After building, start the server using:
```bash
npm start
```
Which executes `node dist/server.cjs`.

The server will bind to `0.0.0.0` on port `3000` (or `process.env.PORT`).

## Cloud Run Deployment

NagrikAI is optimized for deployment on Google Cloud Run (or any Docker-compatible container service).

### Requirements
Ensure you have a `Dockerfile` that:
1. Uses a Node.js base image (e.g., `node:22-alpine`).
2. Copies `package.json` and installs dependencies (`npm ci`).
3. Copies the source code.
4. Runs `npm run build`.
5. Exposes port 3000.
6. Starts the app with `npm start`.

### Environment Variables
When deploying to Cloud Run, you MUST provide the required environment variables in the Cloud Run configuration (Secrets Manager is recommended).

- `GEMINI_API_KEY`: Required for the AI orchestration.

*Note: Do not commit `.env` files to source control.*
