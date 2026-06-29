import { GoogleGenAI } from "@google/genai";
import { reportEmbeddings, cosineSimilarity } from "./db";

let ai: GoogleGenAI | null = null;
function getAI() {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

export async function runVisionAgent(imagesBase64: string[], text: string) {
  const genai = getAI();
  if (!genai) throw new Error("Gemini API key not configured");

  const prompt = `You are the Vision Agent for NagrikAI. You receive citizen photo(s) of a civic issue. The photos provided may show different angles or parts of the same issue. Analyze them collectively.
YOUR TASK: classify the issue with high precision and provide structured output.
ISSUE TYPES (pick exactly one): pothole, water_leak, broken_streetlight, illegal_dumping, blocked_drain, fallen_tree, graffiti, damaged_road_sign, exposed_wire, sewage_overflow, stray_animal, other.
CATEGORIES (pick exactly one): Infrastructure, Sanitation, Safety, Other.
SEVERITY GUIDE: 1 = cosmetic, 2 = minor inconvenience, 3 = moderate, 4 = serious, 5 = dangerous.
Additional context from user: "${text}"

Return JSON exactly like this with no markdown wrapping:
{"issueType": "Pothole", "category": "Infrastructure", "description": "Large pothole in middle of road", "severityScore": 4, "reasoning": "Visual evidence of deep asphalt damage", "confidence": 0.95, "infrastructureCategory": "road", "estimatedAreaM2": 1.5}`;

  const imageParts = imagesBase64.map((img) => ({
    inlineData: {
      mimeType: "image/jpeg",
      data: img.includes(",") ? img.split(",")[1] : img,
    },
  }));

  const response = await genai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }, ...imageParts],
      },
    ],
  });

  const resultText = response.text || "";
  const match = resultText.match(/\{[\s\S]*\}/);
  if (match) {
    return JSON.parse(match[0]);
  }
  throw new Error("Failed to parse Vision Agent response");
}

export async function runSeverityAgent(visionOutput: any, location: string) {
  const genai = getAI();
  if (!genai) throw new Error("Gemini API key not configured");

  const prompt = `You are the Severity Agent for NagrikAI. You adjust the Vision Agent's severity score based on CONTEXT.
Vision Output: ${JSON.stringify(visionOutput)}
Location: ${location}

Estimate the context of this location (e.g., is it a high traffic area, school zone, residential?).
Compute adjusted_severity = clamp(original + sum(impacts), 1, 5).

Return JSON exactly like this with no markdown wrapping:
{"originalSeverity": 4, "adjustedSeverity": 5, "adjustmentDelta": 1, "reasoning": "Location is in a dense urban area, increasing accident risk."}`;

  const response = await genai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const match = response.text?.match(/\{[\s\S]*\}/);
  if (match) return JSON.parse(match[0]);
  return {
    originalSeverity: visionOutput.severityScore,
    adjustedSeverity: visionOutput.severityScore,
    adjustmentDelta: 0,
    reasoning: "No context adjustments needed.",
  };
}

export async function runJurisdictionAgent(
  issueType: string,
  location: string,
) {
  const genai = getAI();
  if (!genai) throw new Error("Gemini API key not configured");

  const prompt = `You are the Jurisdiction Agent for NagrikAI. You determine which civic agency is responsible for a reported issue.
Issue Type: ${issueType}
Location: ${location}

Determine the likely ward and responsible agency in Bengaluru (e.g., BBMP for roads/waste, BWSSB for water/sewage, BESCOM for electricity, BTP for traffic).

Return JSON exactly like this with no markdown wrapping:
{"ward": "Indiranagar Ward 80", "agency": "BBMP (Roads)", "routingConfidence": 0.9, "reasoning": "Road infrastructure falls under BBMP jurisdiction."}`;

  const response = await genai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const match = response.text?.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (!parsed.ward || parsed.ward.toLowerCase().includes("unknown") || parsed.ward.toLowerCase() === "n/a") {
        parsed.ward = "Unassigned (Central Queue)";
      }
      return parsed;
    } catch (e) {
      // fallback to default
    }
  }
  
  return {
    ward: "Unassigned (Central Queue)",
    agency: "Municipal Corporation",
    routingConfidence: 0.5,
    reasoning: "Location unclear, routed to central dispatch.",
  };
}

export async function runVerificationAgent(reportText: string) {
  const genai = getAI();
  if (!genai)
    return {
      verified: false,
      matchCount: 0,
      reasoning: "Embeddings API not configured.",
    };

  try {
    const response = await genai.models.embedContent({
      model: "text-embedding-004",
      contents: reportText,
    });

    const vector = response.embeddings?.[0]?.values;
    if (!vector) throw new Error("No embedding returned");

    let matchCount = 0;
    for (const stored of reportEmbeddings) {
      const sim = cosineSimilarity(vector, stored.vector);
      if (sim > 0.85) matchCount++;
    }

    return {
      verified: matchCount > 0,
      matchCount,
      vector,
      reasoning:
        matchCount > 0
          ? `${matchCount} similar reports found in the area. Status: Community Verified.`
          : `No similar reports found. Status: Pending Verification.`,
    };
  } catch (e) {
    console.error("Embedding Error", e);
    return {
      verified: false,
      matchCount: 0,
      reasoning: "Failed to verify via embeddings.",
    };
  }
}

export async function runImpactAgent(issueType: string, severity: number) {
  const genai = getAI();
  if (!genai) throw new Error("Gemini API key not configured");

  const prompt = `You are the Impact Prediction Agent. Predict the citizen impact for a civic issue in India.
Issue Type: ${issueType}
Severity: ${severity}/5

Estimate the daily citizen impact (number of people) and predicted new reports in the next 7 days.

Return JSON exactly like this with no markdown wrapping:
{"dailyImpact": 1200, "predictedNewReports": 2, "predictionConfidence": 0.85, "reasoning": "High traffic area + high severity = widespread disruption."}`;

  const response = await genai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const match = response.text?.match(/\{[\s\S]*\}/);
  if (match) return JSON.parse(match[0]);
  return {
    dailyImpact: 500,
    predictedNewReports: 1,
    predictionConfidence: 0.7,
    reasoning: "Default impact estimation",
  };
}

export async function runRoutingAgent(issueType: string, severity: number) {
  const genai = getAI();
  if (!genai) throw new Error("Gemini API key not configured");

  const prompt = `You are the Government Routing Agent. Determine the communication strategy and SLA for a civic issue in India.
Issue Type: ${issueType}
Severity: ${severity}/5

Determine the priority action required and a short routing strategy. 
Return JSON exactly like this with no markdown wrapping:
{"actionRequired": "Immediate Dispatch", "routingStrategy": "Route to rapid response team via Open311", "reasoning": "Severity 5 requires immediate dispatch."}`;

  const response = await genai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const match = response.text?.match(/\{[\s\S]*\}/);
  if (match) return JSON.parse(match[0]);
  return {
    actionRequired: "Standard Queue",
    routingStrategy: "Assign to general ward maintenance",
    reasoning: "Default routing strategy",
  };
}

export async function runStoryAgent(reports: any[]) {
  const genai = getAI();
  if (!genai) throw new Error("Gemini API key not configured");

  const prompt = `You are the AI Story Lead Agent for NagrikAI. You analyze recent civic reports to find anomalies and generate journalistic leads.
Reports (last 50): ${JSON.stringify(reports.map(r => ({ type: r.type, ward: r.ward, severity: r.severity, status: r.status })))}

Find 2 interesting anomalies or patterns in this data that a journalist would want to investigate. If there isn't enough data, generate realistic plausible leads based on typical urban patterns.
Return JSON EXACTLY like this with no markdown wrapping:
[
  {
    "title": "Unusual Water Logging Spike",
    "description": "Detected a 400% increase in water logging reports in Bellandur...",
    "confidence": 94,
    "theme": "warning"
  },
  {
    "title": "SLA Breach Trend",
    "description": "Streetlight repair SLA breaches have systematically increased...",
    "confidence": 88,
    "theme": "accent"
  }
]
`;

  const response = await genai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const match = response.text?.match(/\[[\s\S]*\]/);
  if (match) return JSON.parse(match[0]);
  return [];
}
export async function runRepairAgent(
  issueType: string,
  areaM2: number,
  severity: number,
) {
  const genai = getAI();
  if (!genai) throw new Error("Gemini API key not configured");

  const prompt = `You are the Repair Recommendation Agent. Estimate repair cost and priority for a civic issue in India.
Issue Type: ${issueType}
Estimated Area: ${areaM2 || 1} m2
Severity: ${severity}/5

Estimate material cost, labor cost, and apply severity multiplier. Return in INR.

Return JSON exactly like this with no markdown wrapping:
{"costEstimateLow": 4200, "costEstimateHigh": 5800, "repairPriority": "immediate", "reasoning": "Asphalt material 800/m2 + labor 1500 + severity multiplier 1.5x"}`;

  const response = await genai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const match = response.text?.match(/\{[\s\S]*\}/);
  if (match) return JSON.parse(match[0]);
  return {
    costEstimateLow: 1000,
    costEstimateHigh: 2000,
    repairPriority: "scheduled",
    reasoning: "Default estimate",
  };
}
