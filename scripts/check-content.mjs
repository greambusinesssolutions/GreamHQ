// Production gate: refuse to ship sample data or placeholders.
// Runs after `next build` (static export in out/). Strict when Vercel builds production (VERCEL_ENV=production)
// or when CONTENT_STRICT=1; preview and local builds only report what remains.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const strict = process.env.VERCEL_ENV === "production" || process.env.CONTENT_STRICT === "1";
const root = new URL("..", import.meta.url).pathname;

function walk(dir, exts) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p, exts) : exts.some((e) => p.endsWith(e)) ? [p] : [];
  });
}

const problems = [];

// 1. Content files marked sample: true (Markdown frontmatter or JSON).
for (const f of walk(join(root, "content"), [".md", ".json"])) {
  const text = readFileSync(f, "utf8");
  const hits = (text.match(/^\s*sample:\s*true\b|"sample"\s*:\s*true/gm) || []).length;
  if (hits) problems.push(`${relative(root, f)}: ${hits} item(s) marked sample: true`);
}

// 2. Placeholders that reached the built pages: [TO WRITE…] or [ANY CAPITALS IN BRACKETS].
const placeholder = /\[(?:TO WRITE[^\]]*|[A-Z][A-Z0-9 ,.'’&/:-]{1,}[A-Z0-9.])\]/g;
for (const f of walk(join(root, "out"), [".html"])) {
  const text = readFileSync(f, "utf8")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "");
  const found = [...new Set(text.match(placeholder) || [])];
  if (found.length) problems.push(`${relative(root, f)}: ${found.slice(0, 5).join(" ")}${found.length > 5 ? ` (+${found.length - 5} more)` : ""}`);
}

if (!problems.length) {
  console.log("Content check: no sample data or placeholders. Ready for production.");
  process.exit(0);
}
const head = `Content check: ${problems.length} file(s) still contain sample data or placeholders.`;
if (strict) {
  console.error(`\n${head}\nProduction builds refuse to ship these. Replace them with real content:\n  ${problems.join("\n  ")}\n`);
  process.exit(1);
}
console.warn(`\n${head} (allowed in preview builds; production will fail)\n  ${problems.slice(0, 8).join("\n  ")}${problems.length > 8 ? `\n  …and ${problems.length - 8} more` : ""}\n`);
