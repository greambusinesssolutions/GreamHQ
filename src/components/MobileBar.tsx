"use client";

// Under 640px: a fixed "Book a free business check" button on every page.
// It steps aside while the hero's booking button or the booking form (#contact) is on screen.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookHref } from "@/data/nav";
import s from "./MobileBar.module.css";

export default function MobileBar() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    // Hide while the hero's own booking button or the booking form is on screen, so the
    // fixed bar never stacks on an identical button.
    const targets = [document.querySelector("main section:first-of-type .btn-primary"), document.getElementById("contact")].filter((x): x is Element => !!x);
    if (!targets.length || !("IntersectionObserver" in window)) return setHidden(false);
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setHidden(seen.size > 0);
    }, { threshold: 0.15 });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [path]);
  return (
    <Link className={`${s.bar} ${hidden ? s.hidden : ""} btn btn-primary`} href={bookHref} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined}>
      Book a free business check <span className="arr" aria-hidden="true">→</span>
    </Link>
  );
}
