import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/forms.css";
import { serif, sans, mono } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import JsonLd from "@/components/JsonLd";
import { site, isProduction } from "@/data/site";
import { organizationLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s` },
  description: "GREAM Business Solutions helps businesses around the world stop losing customers, get paid on time and see how they are really doing.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#0d2b23" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={organizationLd} />
        <div className="page">
          <a className="skip" href="#main">Skip to content</a>
          {!isProduction && <p className="sample-bar t-caption">Preview build: this page may show sample content from the designs.</p>}
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileBar />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
