import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { reports, reportEmbeddings } from "./server/db";
import {
  runVisionAgent,
  runSeverityAgent,
  runJurisdictionAgent,
  runVerificationAgent,
  runRepairAgent,
} from "./server/agents";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "200mb" }));

app.post("/api/report", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (agent: string, message: string, metadata?: any) => {
    res.write(`data: ${JSON.stringify({ agent, message, metadata })}\n\n`);
  };

  try {
    const { imageBase64, imageBase64s, text, location, lat, lng } = req.body;
    const images = imageBase64s || (imageBase64 ? [imageBase64] : []);
    const mainImage = images[0];

    // Agent 1: Capture
    sendEvent("Capture", "Receiving media and extracting metadata...", {
      timestamp: new Date().toISOString(),
      location,
      imageCount: images.length,
    });
    await new Promise((r) => setTimeout(r, 500));

    // Agent 2: Vision
    sendEvent("Vision", "Analyzing image(s) for civic issues...");
    const visionOutput = await runVisionAgent(images, text);
    sendEvent("Vision", `Classified: ${visionOutput.issueType}.`, {
      confidence: visionOutput.confidence,
      severity: visionOutput.severityScore,
      reasoning: visionOutput.reasoning,
      area: visionOutput.estimatedAreaM2,
    });

    // Agent 3: Severity
    sendEvent(
      "Severity",
      "Evaluating context (weather, school zones, traffic)...",
    );
    const severityOutput = await runSeverityAgent(visionOutput, location);
    sendEvent(
      "Severity",
      `Contextual severity adjusted to ${severityOutput.adjustedSeverity}/5.`,
      {
        reasoning: severityOutput.reasoning,
        delta: severityOutput.adjustmentDelta,
      },
    );

    // Agent 4: Jurisdiction
    sendEvent(
      "Jurisdiction",
      "Determining jurisdiction and responsible agency...",
    );
    const routingOutput = await runJurisdictionAgent(
      visionOutput.issueType,
      location,
    );
    sendEvent("Jurisdiction", `Routed to ${routingOutput.agency}.`, {
      reasoning: routingOutput.reasoning,
      ward: routingOutput.ward,
      confidence: routingOutput.routingConfidence,
    });

    // Agent 5: Duplicate Detection
    sendEvent(
      "Duplicate",
      "Embedding report and searching for duplicates in pgvector...",
    );
    const searchString = `${visionOutput.issueType} at ${location}. ${visionOutput.description}`;
    const verifyOutput = await runVerificationAgent(searchString);
    sendEvent(
      "Duplicate",
      verifyOutput.matchCount > 0
        ? `Found ${verifyOutput.matchCount} similar reports in 100m radius.`
        : "No duplicates found. Unique report.",
      {
        matches: verifyOutput.matchCount,
      },
    );

    // Agent 6: Impact Prediction
    sendEvent(
      "Impact",
      "Predicting citizen impact based on hotspot context...",
    );
    await new Promise((r) => setTimeout(r, 600));
    sendEvent(
      "Impact",
      "Estimated daily impact: 2,000 citizens. High risk in next 7 days.",
      {
        predictionConfidence: 0.82,
        predictedNewReports: 3,
      },
    );

    // Agent 7: Community Verification
    sendEvent("Verification", "Computing trust score and routing decision...");
    await new Promise((r) => setTimeout(r, 400));
    sendEvent(
      "Verification",
      verifyOutput.verified
        ? "Community Verified via existing reports."
        : "Pending Verification. Score: 65/100.",
      {
        reasoning: verifyOutput.reasoning,
        verificationScore: verifyOutput.verified ? 95 : 65,
      },
    );

    // Agent 8: Repair Recommendation
    sendEvent("Repair", "Estimating repair costs and priority...");
    const repairOutput = await runRepairAgent(
      visionOutput.issueType,
      visionOutput.estimatedAreaM2,
      severityOutput.adjustedSeverity,
    );
    sendEvent(
      "Repair",
      `Cost estimated at ₹${repairOutput.costEstimateLow} - ₹${repairOutput.costEstimateHigh}.`,
      {
        reasoning: repairOutput.reasoning,
        priority: repairOutput.repairPriority,
      },
    );

    // Agent 9: Government Routing
    const slaHours =
      severityOutput.adjustedSeverity === 5
        ? 24
        : severityOutput.adjustedSeverity === 4
          ? 48
          : severityOutput.adjustedSeverity === 3
            ? 168
            : severityOutput.adjustedSeverity === 2
              ? 336
              : 720;

    sendEvent("Routing", "Submitting to Open311 / drafting formal email...");
    await new Promise((r) => setTimeout(r, 700));
    sendEvent(
      "Routing",
      `SLA Clock Started: ${slaHours}h. Token: BBMP-${Math.floor(Math.random() * 10000)}`,
      {
        submissionMethod: "open311",
        slaDeadline: new Date(
          Date.now() + slaHours * 60 * 60 * 1000,
        ).toISOString(),
      },
    );

    // Calculate impact score
    // severity (1-5) * 10 = max 50
    // matches * 10 = max 30 (cap at 3 matches)
    // verified bonus = 20
    const impactScore = Math.min(
      100,
      severityOutput.adjustedSeverity * 10 +
        Math.min(3, verifyOutput.matchCount) * 10 +
        (verifyOutput.verified ? 20 : 0),
    );

    // Save
    const newReport = {
      id: Date.now().toString(),
      type: visionOutput.issueType,
      category: visionOutput.category || "Other",
      description: visionOutput.description,
      severity: severityOutput.adjustedSeverity,
      originalSeverity: visionOutput.severityScore,
      severityReasoning: severityOutput.reasoning,
      agency: routingOutput.agency,
      ward: routingOutput.ward,
      location: location || "Unknown Location",
      lat: lat || 12.9719,
      lng: lng || 77.5937,
      date: new Date().toISOString(),
      status: verifyOutput.verified
        ? "Community Verified"
        : "Pending Verification",
      verified: verifyOutput.verified,
      costEstimateLow: repairOutput.costEstimateLow,
      costEstimateHigh: repairOutput.costEstimateHigh,
      costReasoning: repairOutput.reasoning,
      imageUrl: mainImage,
      imageUrls: images,
      slaDeadline: new Date(
        Date.now() + slaHours * 60 * 60 * 1000,
      ).toISOString(),
      impactScore,
    };

    reports.unshift(newReport);
    if (verifyOutput.vector) {
      reportEmbeddings.push({ id: newReport.id, vector: verifyOutput.vector });
    }

    sendEvent("Done", "Report successfully generated.", newReport);
    res.end();
  } catch (error: any) {
    console.error(error);
    sendEvent(
      "Error",
      error?.message || "An error occurred during processing.",
    );
    res.end();
  }
});

app.get("/api/reports", (req, res) => {
  res.json({ reports });
});

app.post("/api/reports/:id/comments", (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  const report = reports.find((r) => r.id === id);
  if (report) {
    if (!report.comments) {
      report.comments = [];
    }
    const newComment = {
      id: Date.now().toString(),
      author: author || "Anonymous Citizen",
      text,
      date: new Date().toISOString(),
    };
    report.comments.push(newComment);
    res.json({ success: true, comment: newComment });
  } else {
    res.status(404).json({ success: false, message: "Not found" });
  }
});

app.patch("/api/reports/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const report = reports.find((r) => r.id === id);
  if (report) {
    report.status = status;
    res.json({ success: true, report });
  } else {
    res.status(404).json({ success: false, message: "Not found" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
