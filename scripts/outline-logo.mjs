// Builds the GREAM Business Solutions logo as outlined SVG paths (no live type),
// from the self-hosted Instrument Serif and IBM Plex Mono files.
// TODO: replace with the official logo files from "01 - Brand Identity / Logo" when they arrive.
import { readFileSync, writeFileSync } from "node:fs";
import opentype from "opentype.js";

const font = (p) => {
  const b = readFileSync(new URL(`../node_modules/${p}`, import.meta.url));
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const serif = font("@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff");
const mono = font("@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff");

// Lay out text with tracking (em) and return path data plus advance width.
function outline(f, text, size, x, baseline, trackingEm) {
  let d = "";
  let cx = x;
  for (const ch of text) {
    const g = f.charToGlyph(ch);
    d += g.getPath(cx, baseline, size).toPathData(2);
    cx += (g.advanceWidth / f.unitsPerEm) * size + trackingEm * size;
  }
  return { d, width: cx - x - trackingEm * size };
}

// Geometry matches the nav lockup in the designs: 26px mark, 12px gap, 28px wordmark, 9px label.
const mark = 26, gap = 12, tx = mark + gap;
const word = outline(serif, "GREAM", 28, tx, 22, 0.07);
const label = outline(mono, "BUSINESS SOLUTIONS", 9, tx, 33, 0.2);
const width = Math.ceil(tx + Math.max(word.width, label.width)) + 1;

writeFileSync(
  new URL("../src/data/logo.json", import.meta.url),
  JSON.stringify({ width, height: 34, word: word.d, label: label.d }, null, 1),
);
console.log("logo.json written, width", width);
