// TODO: swap for the official logo files (Primary and Reverse) when they arrive.
// Outlined from the brand fonts by scripts/outline-logo.mjs, so it never renders as live type.
import logo from "@/data/logo.json";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${logo.width} ${logo.height}`} width={logo.width} height={logo.height} role="img" aria-label="GREAM Business Solutions">
      <rect x="0" y="4" width="13" height="6" rx="1" fill="currentColor" />
      <rect x="0" y="14" width="19.76" height="6" rx="1" fill="currentColor" />
      <rect x="0" y="24" width="26" height="6" rx="1" fill="var(--action)" />
      <path d={logo.word} fill="currentColor" />
      <path d={logo.label} fill="currentColor" opacity="0.82" />
    </svg>
  );
}
