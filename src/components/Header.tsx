"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { nav, bookHref } from "@/data/nav";
import s from "./Header.module.css";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (match: string) => (path.startsWith(match) ? "page" : undefined);

  return (
    <header className={s.nav}>
      <div className={`wrap ${s.in}`}>
        <Link className={s.brand} href="/" aria-label="GREAM Business Solutions, home">
          <Logo className={s.logo} />
        </Link>
        <nav className={s.links} aria-label="Main">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.match)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link className={`btn btn-ink btn-sm ${s.cta}`} href={bookHref}>
          Book a free business check
        </Link>
        <button ref={btn} className={s.menuBtn} type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h12" />}
          </svg>
        </button>
      </div>
      <nav className={s.mnav} id="mobile-menu" aria-label="Mobile" hidden={!open}>
        {nav.map((l, i) => (
          <Link key={l.href} href={l.href} aria-current={current(l.match)} onClick={() => setOpen(false)}>
            <span className="t-title">{l.label}</span>
            <span className={`t-label ${s.num}`}>0{i + 1}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
