/** Split a heading so the accent words can be set in italic: ["Stop losing ", "payment.", ""]. */
export function splitAccent(text: string, accent?: string): [string, string, string] {
  if (!accent) return [text, "", ""];
  const i = text.lastIndexOf(accent);
  if (i < 0) return [text, "", ""];
  return [text.slice(0, i), accent, text.slice(i + accent.length)];
}
