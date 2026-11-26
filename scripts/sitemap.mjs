// Writes out/sitemap.xml from the built pages, only when the site is public
// (PREVIEW_MODE=false). In private preview no sitemap is published.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

if (process.env.PREVIEW_MODE !== "false") {
  console.log("Private preview: no sitemap published.");
  process.exit(0);
}
const out = new URL("../out", import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const skip = /^(404|_not-found|.*__none)/;
const urls = walk(out)
  .filter((f) => f.endsWith(".html"))
  .map((f) => relative(out, f).replace(/\.html$/, "").replace(/(^|\/)index$/, ""))
  .filter((p) => !skip.test(p))
  .sort()
  .map((p) => `  <url><loc>https://www.greamhq.com/${p}</loc></url>`.replace(/\/<\/loc>/, "</loc>"));
writeFileSync(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
console.log(`sitemap.xml: ${urls.length} pages`);
