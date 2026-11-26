// Turns src/styles/tokens.json (GREAM · The Ledger system) into CSS custom properties.
// Run automatically by `npm run dev` and `npm run build`; never edit tokens.css by hand.
import { readFileSync, writeFileSync } from "node:fs";

const t = JSON.parse(readFileSync(new URL("../src/styles/tokens.json", import.meta.url), "utf8"));
const lines = [];
const add = (name, value) => lines.push(`  --${name}: ${value};`);

for (const c of t.color.tokens) add(c.name, c.value);
for (const [k, v] of Object.entries(t.type.families)) add(`font-${k}`, v);
for (const s of t.spacing.tokens) add(s.name, s.value);
for (const r of t.radius.tokens) add(r.name, r.value);
for (const s of t.shadow.tokens) add(s.name, s.value);
for (const s of t.size.tokens) add(s.name, s.value);

const css = `/* Generated from tokens.json by scripts/build-tokens.mjs. Do not edit. */\n:root {\n${lines.join("\n")}\n}\n`;
writeFileSync(new URL("../src/styles/tokens.css", import.meta.url), css);
console.log(`tokens.css: ${lines.length} properties`);
