"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { nav, bookHref } from "@/data/nav";
import s from "./Header.module.css";

// Phone menu: under 1000px a "Menu" button opens a full-width panel of large serif links.
const mobileLinks = [{ href: "/", label: "Home", match: "" }, ...nav];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [path]);
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

  const current = (match: string, href: string) => (match ? path.startsWith(match) : path === href) ? "page" : undefined;

  return (
    <header className={s.nav}>
      <div className={`wrap ${s.in}`}>
        <Link className={s.brand} href="/" aria-label="GREAM Business Solutions, home">
          <Logo className={s.logo} />
        </Link>
        <nav className={s.links} aria-label="Main">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.match, l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className={s.actions}>
          <button ref={btn} className={s.menuBtn} type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            Menu
          </button>
          <Link className={`btn btn-ink btn-sm ${s.cta}`} href={bookHref}>
            <span className={s.long}>Book a free business check</span>
            <span className={s.short}>Book a check</span>
          </Link>
        </div>
      </div>
      <nav className={s.mnav} id="mobile-menu" aria-label="Mobile" hidden={!open}>
        {mobileLinks.map((l) => (
          <Link key={l.href} href={l.href} aria-current={current(l.match, l.href)} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
