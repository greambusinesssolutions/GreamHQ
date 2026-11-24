import type { NextConfig } from "next";

// GitHub Pages serves the site from /Greamsolutions until a custom domain is live.
// The deploy workflow sets PAGES_BASE_PATH automatically; locally it is empty.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
