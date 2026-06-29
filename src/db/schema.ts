import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  real,
  jsonb,
} from "drizzle-orm/pg-core";
// Note: pgvector and postgis extensions can be added via cloudsql-execute-sql,
// but for the basic schema we will define the core reports structure.
// Using generic arrays/types for vectors/geometries until extensions are fully configured.

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(), // Firebase Auth UID
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(),
  description: text("description").notNull(),
  severity: integer("severity").notNull(),
  originalSeverity: integer("original_severity"),
  severityReasoning: text("severity_reasoning"),
  agency: text("agency").notNull(),
  ward: text("ward"),
  location: text("location").notNull(),
  lat: real("lat"),
  lng: real("lng"),
  status: text("status").notNull(),
  date: text("date").notNull(),
  costEstimateLow: integer("cost_estimate_low"),
  costEstimateHigh: integer("cost_estimate_high"),
  costReasoning: text("cost_reasoning"),
  imageUrl: text("image_url"),
  slaDeadline: text("sla_deadline"),
  createdAt: timestamp("created_at").defaultNow(),
});
