# Contributing to NagrikAI

First, thank you for considering contributing to NagrikAI! This project is an autonomous civic intelligence platform designed to improve urban living through AI and transparent reporting.

## Understanding the "Design Constitution"

Before you write any code, you **must** read the authoritative documents in the `/design` folder, specifically:
- `12_DESIGN_CONSTITUTION.md`
- `01_DESIGN.md`

These documents define the visual and architectural laws of the project. NagrikAI places a premium on craftsmanship, accessibility, and AI transparency. Any pull request that introduces generic UI components, hides AI reasoning, or breaks the map-first philosophy will not be accepted.

## Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd nagrik-ai
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Copy the example environment file and add your Gemini API Key.
   ```bash
   cp .env.example .env
   ```
   Add your key: `GEMINI_API_KEY="your_actual_key_here"`

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   This will start both the React frontend and the Express backend simultaneously on port 3000.

## Development Workflow

### 1. Find an Issue
Look for issues labeled `good first issue`, `help wanted`, or `bug` in the issue tracker. If you want to build a new feature, please open an issue first to discuss it with the maintainers.

### 2. Branch Naming Convention
Please use the following naming convention for your branches:
- `feat/feature-name` (for new features)
- `fix/issue-description` (for bug fixes)
- `docs/document-name` (for documentation updates)
- `refactor/what-is-refactored` (for code refactoring)

### 3. Making Changes
- Ensure you follow the `NagrikAI Codebase Documentation Protocol` and the `NagrikAI Core Feature Testing Suite Protocol` when developing.
- Components should be added to `/src/components/`.
- Reusable UI elements go into `/src/components/ui/`.
- AI Agent logic belongs strictly in `/server/agents.ts`.
- Do not add client-side secrets.

### 4. Testing
- Run `npm run lint` to ensure there are no TypeScript errors.
- Test your changes manually across both **Light Mode** and **Dark Mode**.
- Verify that your UI changes are fully responsive (Mobile, Tablet, Desktop).
- Ensure the AI pipeline (`Capture.tsx` flow) still correctly handles streaming Server-Sent Events (SSE) if you modified the backend.

### 5. Submit a Pull Request
- Create a PR against the `main` branch.
- Include a clear description of the problem solved.
- Attach screenshots or screen recordings (especially important for UI or Motion changes).
- Reference any related issues.

## Code of Conduct
We expect all contributors to adhere to a professional and respectful code of conduct. Harassment or abusive behavior will not be tolerated.
