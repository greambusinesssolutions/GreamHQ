import { splitAccent } from "@/lib/accent";

/** Renders a heading's text with its accent words in italic (accent-text, or coral on green). */
export default function Accent({ text, accent }: { text: string; accent?: string }) {
  const [a, b, c] = splitAccent(text, accent);
  return (
    <>
      {a}
      {b && <em>{b}</em>}
      {c}
    </>
  );
}
