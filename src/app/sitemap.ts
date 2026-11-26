import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getInsights, getProducts, getServices, getWork } from "@/lib/content";
import { types } from "./insights/types";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/about", "/careers", "/products", "/work", "/partners", "/insights", "/privacy", "/terms",
    ...getServices().map((x) => `/what-we-do/${x.slug}`),
    ...getProducts().map((x) => `/products/${x.slug}`),
    ...getWork().map((x) => `/work/${x.slug}`),
    ...getInsights().map((x) => `/insights/${x.slug}`),
    ...types.map((t) => `/insights/type/${t.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}` }));
}
