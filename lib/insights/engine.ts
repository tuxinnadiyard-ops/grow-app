import { Insight }
  from "./types";

type Params = {
  humidity: number;
  healthScore?: number;
  openTasks: number;
  lastPhotoDays?: number;
};

export function generateInsights(
  params: Params
): Insight[] {
  const insights:
    Insight[] = [];

  if (
    params.humidity >
    70
  ) {
    insights.push({
      id:
        crypto.randomUUID(),
      severity:
        "warning",
      title:
        "High humidity",
      description:
        "Humidity may be too high.",
      createdAt:
        new Date().toISOString(),
    });
  }

  if (
    params.healthScore &&
    params.healthScore >=
      4
  ) {
    insights.push({
      id:
        crypto.randomUUID(),
      severity:
        "positive",
      title:
        "Healthy plant",
      description:
        "Observation score looks strong.",
      createdAt:
        new Date().toISOString(),
    });
  }

  if (
    params.openTasks > 3
  ) {
    insights.push({
      id:
        crypto.randomUUID(),
      severity:
        "warning",
      title:
        "Many pending tasks",
      description:
        "Several tasks remain unfinished.",
      createdAt:
        new Date().toISOString(),
    });
  }

  if (
    params.lastPhotoDays &&
    params.lastPhotoDays >
      3
  ) {
    insights.push({
      id:
        crypto.randomUUID(),
      severity:
        "info",
      title:
        "No recent photo",
      description:
        "Consider documenting plant progress.",
      createdAt:
        new Date().toISOString(),
    });
  }

  return insights;
}