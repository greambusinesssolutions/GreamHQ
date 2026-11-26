import type { MetadataRoute } from "next";
import { site, previewMode } from "@/data/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Private preview: block all crawlers and publish no sitemap.
  if (previewMode) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
