import type { insightTypes } from "@/lib/content";

type InsightType = (typeof insightTypes)[number];

/** Insight types, their filter labels and their category page slugs (/insights/type/<slug>). */
export const types: { type: InsightType; label: string; slug: string }[] = [
  { type: "Guide", label: "Guides", slug: "guides" },
  { type: "AI agents", label: "AI agents", slug: "ai-agents" },
  { type: "Report", label: "Reports", slug: "reports" },
  { type: "Case notes", label: "Case notes", slug: "case-notes" },
  { type: "Talks", label: "Talks", slug: "talks" },
];
