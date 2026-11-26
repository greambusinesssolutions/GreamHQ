"use client";

// Wraps a simple form (newsletter, partner application): native validation with
// inline messages, a honeypot, the endpoint or email-app fallback, and a success state.
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { sendForm } from "@/lib/send";

type Props = {
  endpoint: string;
  email: string;
  subject: string;
  className?: string;
  label: string;
  success: string;
  errorClass?: string;
  successClass?: string;
  children: ReactNode;
};

function messageFor(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  if (el instanceof HTMLInputElement && el.type === "checkbox") return "Please tick the box to agree.";
  const name = el.labels?.[0]?.textContent?.replace(/\s*\(.*\)$/, "").trim() ?? "this field";
  if (el.validity.valueMissing) return `Please fill in: ${name}.`;
  if (el.validity.typeMismatch && el.type === "email") return "Please enter a valid email, like you@yourbusiness.com.";
  if (el.validity.typeMismatch) return "Please enter a full web address, starting with https://.";
  return `Please check: ${name}.`;
}

export default function SimpleForm({ endpoint, email, subject, className, label, success, errorClass, successClass, children }: Props) {
  const [error, setError] = useState("");
  const [done, setDone] = useState<"" | "sent" | "mail">("");
  const [busy, setBusy] = useState(false);
  const okRef = useRef<HTMLParagraphElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if ((form.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value) return; // a bot filled the hidden field
    const controls = Array.from(form.elements).filter(
      (el): el is HTMLInputElement => (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) && el.name !== "_gotcha",
    );
    controls.forEach((c) => c.removeAttribute("aria-invalid"));
    const bad = controls.filter((c) => !c.checkValidity());
    if (bad.length) {
      bad.forEach((c) => c.setAttribute("aria-invalid", "true"));
      setError(messageFor(bad[0]));
      bad[0].focus();
      return;
    }
    const data: Record<string, string> = {};
    new FormData(form).forEach((v, k) => {
      if (k !== "_gotcha" && k !== "consent") data[k] = String(v).trim();
    });
    setError("");
    setBusy(true);
    try {
      setDone(await sendForm(endpoint, email, subject, data));
      requestAnimationFrame(() => okRef.current?.focus());
    } catch {
      setError(`Something went wrong. Please try again, or email ${email}.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={className} noValidate aria-label={label} onSubmit={onSubmit}>
      <fieldset className="fs-contents" disabled={busy || !!done}>
        {children}
      </fieldset>
      <div className="hp" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className={errorClass} role="alert">{error}</p>
      <p className={successClass} role="status" tabIndex={-1} ref={okRef} hidden={!done}>
        {done === "mail" ? "Your email app should open with your details. Press send to finish." : success}
      </p>
    </form>
  );
}
