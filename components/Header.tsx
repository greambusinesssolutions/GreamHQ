"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Mark } from "./icons";

const links = [
  { href: "#solutions", label: "Solutions" },
  { href: "#how", label: "How we work" },
  { href: "#packages", label: "Packages" },
  { href: "#questions", label: "Questions" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="brand" href="#top" aria-label="GREAM Business Solutions, back to top">
          <Mark />
          <span className="wm">
            <b>GREAM</b>
            <small>Business Solutions</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="btn btn-ink nav-cta" href={site.calUrl}>
            Book a free business check
          </a>
        </nav>
        <button
          ref={btnRef}
          className="menu-btn"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 6h16M3 11h16M3 16h10" />
            </svg>
          )}
        </button>
      </div>
      <nav className="mnav" id="mobile-menu" aria-label="Mobile" hidden={!open}>
        {links.map((l, i) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label} <span>0{i + 1}</span>
          </a>
        ))}
        <a className="btn btn-primary" href={site.calUrl} onClick={() => setOpen(false)}>
          Book a free 20-minute business check
        </a>
      </nav>
    </header>
  );
}
