import s from "./ExampleTag.module.css";

/** Marks sample content from the designs, so nobody reads it as a real client, figure or price.
    Shown wherever a content file has `example: true`; delete that line once the content is real. */
export default function ExampleTag({ label = "Illustrative example", className = "" }: { label?: string; className?: string }) {
  return <span className={`${s.tag} ${className}`}>{label}</span>;
}
