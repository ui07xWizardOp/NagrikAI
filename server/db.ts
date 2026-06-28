import { Report } from "../src/types";

export const reports: Report[] = [
  {
    id: "1",
    type: "pothole",
    category: "Infrastructure",
    description: "Deep pothole on the main road",
    severity: 4,
    agency: "BBMP",
    ward: "Ward 150",
    location: "12.9716, 77.5946",
    lat: 12.9716,
    lng: 77.5946,
    date: new Date().toISOString(),
    status: "Pending Verification",
    verified: false,
  },
];
export const reportEmbeddings: { id: string; vector: number[] }[] = [];

export function cosineSimilarity(a: number[], b: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
