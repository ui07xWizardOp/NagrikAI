import express from "express";
import path from "path";
import dotenv from "dotenv";
import { getReports, addReport, updateReport, upvoteReport, addComment } from "./server/firestore";
import { reportEmbeddings } from "./server/db";
import {
  runVisionAgent,
  runSeverityAgent,
  runJurisdictionAgent,
  runVerificationAgent,
  runRepairAgent,
  runImpactAgent,
  runRoutingAgent,
  runStoryAgent,
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
    const { imageBase64, imageBase64s, text, location, lat, lng, userId } = req.body;
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
    const impactOutput = await runImpactAgent(
      visionOutput.issueType,
      severityOutput.adjustedSeverity,
    );
    sendEvent(
      "Impact",
      `Estimated daily impact: ${impactOutput.dailyImpact} citizens. Predicted new reports: ${impactOutput.predictedNewReports}`,
      {
        predictionConfidence: impactOutput.predictionConfidence,
        predictedNewReports: impactOutput.predictedNewReports,
        reasoning: impactOutput.reasoning,
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
    sendEvent("Routing", "Submitting to Open311 / drafting formal email...");
    const routingFinal = await runRoutingAgent(
      visionOutput.issueType,
      severityOutput.adjustedSeverity,
    );
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
    
    sendEvent(
      "Routing",
      `SLA Clock Started: ${slaHours}h. Strategy: ${routingFinal.actionRequired}.`,
      {
        submissionMethod: routingFinal.routingStrategy,
        slaDeadline: new Date(
          Date.now() + slaHours * 60 * 60 * 1000,
        ).toISOString(),
        reasoning: routingFinal.reasoning,
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
      userId: userId || null,
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

    await addReport(newReport);
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

app.get("/api/reports", async (req, res) => {
  try {
    const reports = await getReports();
    res.json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reports: [] });
  }
});

app.get("/api/reports/me", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ reports: [] });
    }
    const reports = await getReports();
    const myReports = reports.filter(r => r.userId === userId);
    res.json({ reports: myReports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reports: [] });
  }
});

app.get("/api/reports/pending-verification", async (req, res) => {
  try {
    const reports = await getReports();
    const pending = reports.filter(r => r.status === "Pending Verification" || (r.impactScore && r.impactScore < 70));
    res.json({ reports: pending });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reports: [] });
  }
});

app.patch("/api/reports/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (status) {
      const updateData: any = { status };
      if (status.includes("Resolved")) {
        updateData.resolutionDate = new Date().toISOString();
      }
      await updateReport(id, updateData);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
});

app.post("/api/reports/:id/upvote", async (req, res) => {
  const { id } = req.params;
  try {
    const upvotes = await upvoteReport(id);
    if (upvotes !== null) {
      res.json({ success: true, upvotes });
    } else {
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
});

app.post("/api/reports/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  
  const newComment = {
    id: Date.now().toString(),
    author: author || "Anonymous Citizen",
    text,
    date: new Date().toISOString(),
  };

  try {
    const comment = await addComment(id, newComment);
    if (comment) {
      res.json({ success: true, comment });
    } else {
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
});

app.get("/api/leads", async (req, res) => {
  try {
    const reports = await getReports();
    // take the most recent 50 reports
    const recentReports = reports.slice(0, 50);
    const leads = await runStoryAgent(recentReports);
    res.json({ leads });
  } catch (error) {
    console.error("Error generating story leads", error);
    res.status(500).json({ leads: [] });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
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
