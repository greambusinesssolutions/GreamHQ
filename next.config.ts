import type { NextConfig } from "next";

// Static export: every page is plain HTML, served by Vercel.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
