import type { insightTypes } from "@/lib/content";

type InsightType = (typeof insightTypes)[number];

/** Insight types, their filter labels and their category page slugs (/insights/type/<slug>). */
export const types: { type: InsightType; label: string; slug: string }[] = [
  { type: "Guide", label: "Guides", slug: "guides" },
  { type: "Costs and pricing", label: "Costs and pricing", slug: "costs-and-pricing" },
  { type: "Getting paid", label: "Getting paid", slug: "getting-paid" },
  { type: "Customers", label: "Customers", slug: "customers" },
  { type: "Report", label: "Reports", slug: "reports" },
];
