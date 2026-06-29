# API Reference

This document describes the REST and SSE endpoints exposed by the NagrikAI backend (`server.ts`).

## Core Endpoints

### 1. Submit Report (AI Orchestration Pipeline)
**Endpoint**: `POST /api/report`
**Type**: Server-Sent Events (SSE)

This is the primary endpoint for the application. It receives raw report data, runs it through the multi-agent AI pipeline, and streams the reasoning steps back to the client before finalizing the report in the database.

**Request Body (JSON)**:
```json
{
  "imageBase64": "data:image/jpeg;base64,...",
  "imageBase64s": ["data:image/jpeg;base64,..."], // Optional, for multiple images
  "text": "Optional voice transcription or text description",
  "location": "123 Main St, Bengaluru",
  "lat": 12.9716,
  "lng": 77.5946
}
```

**Response (Text/Event-Stream)**:
The server streams chunks of data as agents complete their tasks.
```text
data: {"agent":"Capture","message":"Receiving media...","metadata":{"location":"..."}}

data: {"agent":"Vision","message":"Classified: Pothole","metadata":{"confidence":0.95}}
...
data: {"agent":"Done","message":"Report successfully generated.","metadata": { /* Full Report Object */ }}
```

### 2. Fetch All Reports
**Endpoint**: `GET /api/reports`
**Type**: REST

Retrieves all civic issues stored in the database.

**Response (JSON)**:
```json
{
  "reports": [
    {
      "id": "1",
      "type": "pothole",
      "category": "Infrastructure",
      "severity": 4,
      "location": "...",
      "status": "Pending Verification",
      ...
    }
  ]
}
```

### 3. Update Report Status
**Endpoint**: `PATCH /api/reports/:id`
**Type**: REST

Updates the resolution status of a specific report.

**Request Body (JSON)**:
```json
{
  "status": "Resolved"
}
```

**Response (JSON)**:
```json
{
  "success": true,
  "report": { /* Updated Report Object */ }
}
```

### 4. Add Comment
**Endpoint**: `POST /api/reports/:id/comments`
**Type**: REST

Adds a user comment to a specific report.

**Request Body (JSON)**:
```json
{
  "text": "I saw this too, it's getting worse.",
  "author": "Citizen123"
}
```

**Response (JSON)**:
```json
{
  "success": true,
  "comment": {
    "id": "123456789",
    "author": "Citizen123",
    "text": "I saw this too...",
    "date": "2026-06-29T10:00:00Z"
  }
}
```

## Internal Agent APIs

While not exposed over HTTP directly, the `server/agents.ts` module exports the following core AI functions used by `/api/report`:

- `runVisionAgent(imagesBase64, text)`: Classifies the image.
- `runSeverityAgent(visionOutput, location)`: Adjusts severity based on context.
- `runJurisdictionAgent(issueType, location)`: Determines the responsible agency.
- `runVerificationAgent(reportText)`: Embeds text and searches vector DB for duplicates.
- `runRepairAgent(issueType, areaM2, severity)`: Estimates cost and priority.
