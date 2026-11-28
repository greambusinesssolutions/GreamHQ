"use client";

// Under 640px: a fixed "Book a free business check" button on every page.
// It steps aside while the booking form itself (#contact) is on screen.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookHref } from "@/data/nav";
import s from "./MobileBar.module.css";

export default function MobileBar() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const form = document.getElementById("contact");
    if (!form || !("IntersectionObserver" in window)) return setHidden(false);
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.15 });
    io.observe(form);
    return () => io.disconnect();
  }, [path]);
  return (
    <Link className={`${s.bar} ${hidden ? s.hidden : ""} btn btn-primary`} href={bookHref} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined}>
      Book a free business check <span className="arr" aria-hidden="true">→</span>
    </Link>
  );
}
