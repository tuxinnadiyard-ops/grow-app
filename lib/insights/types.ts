export type InsightSeverity =
  | "info"
  | "warning"
  | "positive";

export type Insight = {
  id: string;
  severity:
    InsightSeverity;

  title: string;
  description?: string;

  createdAt: string;
};