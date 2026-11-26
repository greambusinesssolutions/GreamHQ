import Accent from "./Accent";

type Props = { eyebrow?: string; heading: string; accent?: string; level?: 1 | 2; size?: "display" | "section"; id?: string; className?: string };

/** Eyebrow label with its short rule, then an Instrument Serif heading with italic accent words. */
export default function SectionHeading({ eyebrow, heading, accent, level = 2, size = "section", id, className }: Props) {
  const Tag = level === 1 ? "h1" : "h2";
  return (
    <div className={className}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={`t-${size}`} id={id}>
        <Accent text={heading} accent={accent} />
      </Tag>
    </div>
  );
}
