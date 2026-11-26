import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-instrument-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "GREAM Business Solutions · Stop losing customers between enquiry and payment",
  description:
    "GREAM helps small and growing businesses bring enquiries, follow-ups, orders and payments into one organised system. Book a free 20-minute business check.",
  openGraph: {
    title: "GREAM Business Solutions",
    description: "Stop losing customers between enquiry and payment. Book a free 20-minute business check.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0D2B23" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
