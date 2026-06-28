export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Report {
  id: string;
  type: string;
  category?: string;
  description: string;
  severity: number;
  originalSeverity?: number;
  severityReasoning?: string;
  agency: string;
  ward?: string;
  location: string;
  lat?: number;
  lng?: number;
  date: string;
  status: string;
  verified: boolean;
  costEstimateLow?: number;
  costEstimateHigh?: number;
  costReasoning?: string;
  imageUrl?: string;
  imageUrls?: string[];
  slaDeadline?: string;
  impactScore?: number;
  comments?: Comment[];
}
