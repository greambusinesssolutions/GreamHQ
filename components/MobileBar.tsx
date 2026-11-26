"use client";

import { useEffect, useState } from "react";
import { contactHref, contactLinkProps, hasWhatsApp, site } from "@/lib/site";
import { ChatIcon } from "./icons";

// One Vermilion button per view: hide the bar while another primary button or the form is on screen.
export default function MobileBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setHidden(seen.size > 0);
    });
    document.querySelectorAll("main .btn-primary, #assessment").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={hidden ? "mbar is-hidden" : "mbar"}>
      <a className="btn btn-primary" href={site.calUrl}>
        Book a free business check
      </a>
      <a
        className="btn btn-line wa"
        href={contactHref}
        {...contactLinkProps}
        aria-label={hasWhatsApp ? "Message GREAM on WhatsApp" : "Email GREAM"}
      >
        <ChatIcon />
      </a>
    </div>
  );
}
