# AI and Agent Workflows

The defining architecture of NagrikAI is its multi-agent orchestration pipeline. Instead of a single LLM call, the system utilizes a sequence of specialized AI agents built on the `@google/genai` SDK.

## The Pipeline

When a user submits a report via `POST /api/report`, the server orchestrates the following sequential pipeline in `server.ts`.

### 1. Vision Agent
- **Model**: `gemini-2.5-pro` (Multimodal)
- **Input**: User photo(s) (Base64) + optional text description.
- **Task**: Analyze the image to classify the issue type (e.g., 'pothole', 'garbage'), determine the broad category, assign an initial severity score, and estimate the physical area affected.
- **Output**: JSON containing `issueType`, `category`, `description`, `severityScore`, `reasoning`, `confidence`, `estimatedAreaM2`.

### 2. Severity Agent
- **Model**: `gemini-2.5-flash` (Fast text)
- **Input**: Output from the Vision Agent + Geolocation string.
- **Task**: Adjust the initial severity score based on environmental context. For example, a pothole near a school or major highway receives a higher severity than one in a dead-end residential street.
- **Output**: JSON containing `originalSeverity`, `adjustedSeverity`, `adjustmentDelta`, `reasoning`.

### 3. Jurisdiction Agent
- **Model**: `gemini-2.5-flash`
- **Input**: Issue Type + Geolocation string.
- **Task**: Determine which specific civic agency (e.g., BBMP, BESCOM, BWSSB) and city ward is responsible for resolving the issue.
- **Output**: JSON containing `ward`, `agency`, `routingConfidence`, `reasoning`.

### 4. Duplicate Detection / Verification Agent
- **Model**: `text-embedding-004`
- **Input**: Concatenated string of Issue Type, Location, and Description.
- **Task**: Generates a 768-dimensional embedding vector for the text. Compares this vector against all existing reports in the `reportEmbeddings` array using Cosine Similarity. If a match > 0.85 is found, it marks the report as "Community Verified".
- **Output**: JSON containing `verified` (boolean), `matchCount`, `vector`, `reasoning`.

### 5. Repair Recommendation Agent
- **Model**: `gemini-2.5-flash`
- **Input**: Issue Type + Estimated Area (from Vision) + Adjusted Severity.
- **Task**: Estimates the cost of materials and labor in INR, and assigns a repair priority.
- **Output**: JSON containing `costEstimateLow`, `costEstimateHigh`, `repairPriority`, `reasoning`.

## UI Integration (The "Glass Box")

The most critical part of this workflow is the user experience. 

- The backend uses Server-Sent Events (SSE) via `res.write()` to stream updates to the frontend *as each agent finishes its task*.
- The frontend (`Capture.tsx`) listens to this `EventSource` and renders a live, step-by-step timeline.
- This transparency ensures the user understands *how* the AI is categorizing their report, building trust in the system.

## Error Handling and Fallbacks

If any agent in the pipeline throws an error (e.g., API key missing, parsing failure), the backend catches the error, sends a final `Error` SSE event to the client, and terminates the connection. The client `Capture.tsx` handles this by displaying an error state and allowing the user to retry.
