import localFont from "next/font/local";

// Self-hosted brand fonts (from the Fontsource packages): no request to Google Fonts at runtime.
export const serif = localFont({
  src: [
    { path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--ff-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const sans = localFont({
  src: [
    { path: "../../node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-500-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--ff-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const mono = localFont({
  src: [{ path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", weight: "500" }],
  variable: "--ff-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});
