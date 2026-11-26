"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactHref, contactLinkProps, hasWhatsApp, site } from "@/lib/site";
import { Arrow, Tick } from "./icons";

const industries = [
  "Retail and e-commerce",
  "Food and hospitality",
  "Health and wellness",
  "Beauty and personal care",
  "Professional services",
  "Property and real estate",
  "Logistics and distribution",
  "Manufacturing",
  "Education and training",
];
const sizes = ["Just me", "2–10", "11–50", "51–200", "More than 200"];
const challengeOptions = [
  "Missed or slow replies to enquiries",
  "Inconsistent follow-up",
  "Orders tracked by hand",
  "Unclear payments and debts",
  "No clear view of performance",
  "Too much repetitive admin",
  "Something else",
];
const fitList = [
  "You own or manage a small or growing business.",
  "You receive regular enquiries but struggle to follow up consistently.",
  "Customers are managed through chats, spreadsheets or disconnected apps.",
  "You need better visibility into sales and outstanding payments.",
  "You are growing, and your current process is getting hard to manage.",
];

// With a booking page the flow has four steps, without one it has three.
const hasBooking = !!site.bookingUrl;
const TOTAL = hasBooking ? 4 : 3;
const SEND_LABEL = hasBooking ? "Continue to choose a time →" : "Request my free business check →";
const hints = ["About two minutes in total", "Nearly there", hasBooking ? "Then choose a time" : "Last step"];
const stepNames = ["About you", "Your business", "What to improve", "Choose a time"];

type Fields = { name: string; business: string; email: string; phone: string; industry: string; improve: string };
type ErrKey = keyof Fields | "size" | "challenges";
const emptyFields: Fields = { name: "", business: "", email: "", phone: "", industry: "", improve: "" };

export default function BusinessCheck() {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [size, setSize] = useState("");
  const [challenges, setChallenges] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<ErrKey, string>>>({});
  const [summary, setSummary] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<null | { first: string; business: string; usedMail: boolean; bookHref: string }>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const focusTarget = useRef<"step" | "error" | null>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form || !focusTarget.current) return;
    if (focusTarget.current === "step") {
      const first = form.querySelector<HTMLElement>(
        `fieldset[data-step="${step}"] input, fieldset[data-step="${step}"] select, fieldset[data-step="${step}"] .opt-chip`,
      );
      first?.focus({ preventScroll: true });
    } else {
      const first =
        form.querySelector<HTMLElement>('[aria-invalid="true"]') ??
        form.querySelector<HTMLElement>(`fieldset[data-step="${step}"] .chips .opt-chip`);
      first?.focus();
    }
    focusTarget.current = null;
  }, [step, errors]);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const v = (k: keyof Fields) => fields[k].trim();

  function update(k: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [k]: value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function validate(s: number) {
    const e: Partial<Record<ErrKey, string>> = {};
    if (s === 1) {
      if (!v("name")) e.name = "Please enter your full name.";
      if (!v("business")) e.business = "Please enter your business name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) e.email = "Please enter a valid email, like you@yourbusiness.com.";
      if (v("phone").replace(/\D/g, "").length < 7) e.phone = "Please enter a phone number we can reach you on.";
    }
    if (s === 2) {
      if (!v("industry")) e.industry = "Please choose the closest industry.";
      if (!size) e.size = "Please choose your team size.";
    }
    if (s === 3) {
      if (!challenges.length) e.challenges = "Choose at least one challenge.";
      if (v("improve").length < 3) e.improve = "Tell us briefly what you would like to improve.";
    }
    const n = Object.keys(e).length;
    setErrors(e);
    setSummary(n ? (n === 1 ? "One thing needs your attention above." : `${n} things need your attention above.`) : "");
    if (n) focusTarget.current = "error";
    return n === 0;
  }

  function goTo(s: number) {
    setStep(s);
    setSummary("");
    focusTarget.current = "step";
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (sending || !validate(step)) return;
    if (step < 3) return goTo(step + 1);

    const data = {
      name: v("name"),
      business: v("business"),
      email: v("email"),
      phone: v("phone"),
      industry: v("industry"),
      size,
      challenges: challenges.join(", "),
      improve: v("improve"),
    };
    setSending(true);
    let usedMail = false;
    try {
      if (site.formEndpoint) {
        const r = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _subject: `Free business check request: ${data.business}` }),
        });
        if (!r.ok) throw new Error("Request failed");
      } else {
        const body = Object.entries(data)
          .map(([k, val]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${val}`)
          .join("\n");
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
          `Free business check request: ${data.business}`,
        )}&body=${encodeURIComponent(body)}`;
        usedMail = true;
      }
      const bookHref = hasBooking
        ? `${site.bookingUrl}${site.bookingUrl.includes("?") ? "&" : "?"}name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}`
        : "";
      setDone({ first: data.name.split(/\s+/)[0] || "there", business: data.business, usedMail, bookHref });
    } catch {
      setSummary(`Something went wrong sending your request. Please try again, or email ${site.email}.`);
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setFields(emptyFields);
    setSize("");
    setChallenges([]);
    setErrors({});
    setDone(null);
    goTo(1);
  }

  function errProps(k: ErrKey) {
    return { "aria-describedby": `e-${k}`, "aria-invalid": errors[k] ? true : false, className: errors[k] ? "inp bad" : "inp" };
  }
  const Err = ({ k }: { k: ErrKey }) => (
    <p className="err" id={`e-${k}`} hidden={!errors[k]}>
      {errors[k]}
    </p>
  );

  return (
    <section className="sec as-sec" id="assessment" aria-labelledby="as-title">
      <div className="wrap as-grid">
        <div className="as-head">
          <p className="eyebrow">Free business check</p>
          <h2 className="h-section" id="as-title">
            Book your free 20-minute <em>business check.</em>
          </h2>
          <p className="lede">
            Two minutes of questions now, so the call starts with your business. On the call we look at how enquiries and
            sales work today, spot the gaps, and tell you honestly whether GREAM can help.
          </p>
        </div>

        <div className="as-fit">
          <div className="fit">
            <h3>This is probably for you if:</h3>
            <ul>
              {fitList.map((f) => (
                <li key={f}>
                  <Tick />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="after">If it isn&apos;t a fit, we&apos;ll tell you.</p>
          </div>
          <p className="as-mail">
            Rather talk first?{" "}
            {hasWhatsApp ? (
              <>
                <a href={contactHref} {...contactLinkProps}>
                  Message us on WhatsApp
                </a>{" "}
                or email
              </>
            ) : (
              "Email"
            )}{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>

        <div className="card">
          <div hidden={!!done}>
            <div className="card-head">
              <div className="prog" aria-hidden="true">
                {stepNames.slice(0, TOTAL).map((name, i) => {
                  const n = i + 1;
                  return (
                    <div key={name} className={`ps${n === step ? " cur" : ""}${n < step ? " done" : ""}`}>
                      <i />
                      <span>
                        0{n} {name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <form ref={formRef} className="card-body" noValidate aria-labelledby="fs-title-1" onSubmit={onSubmit}>
              <fieldset className="fs" data-step="1" hidden={step !== 1}>
                <legend className="fs-t" id="fs-title-1">
                  First, about you.
                </legend>
                <p className="fs-s">So we know who we&apos;re speaking with and how to reach you.</p>
                <div className="fields">
                  <div className="fld">
                    <label htmlFor="f-name">Full name</label>
                    <input {...errProps("name")} id="f-name" name="name" type="text" autoComplete="name" placeholder="Your full name" value={fields.name} onChange={(e) => update("name", e.target.value)} />
                    <Err k="name" />
                  </div>
                  <div className="fld">
                    <label htmlFor="f-business">Business name</label>
                    <input {...errProps("business")} id="f-business" name="business" type="text" autoComplete="organization" placeholder="Your business name" value={fields.business} onChange={(e) => update("business", e.target.value)} />
                    <Err k="business" />
                  </div>
                  <div className="fld">
                    <label htmlFor="f-email">Business email</label>
                    <input {...errProps("email")} id="f-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@yourbusiness.com" value={fields.email} onChange={(e) => update("email", e.target.value)} />
                    <Err k="email" />
                  </div>
                  <div className="fld">
                    <label htmlFor="f-phone">
                      Phone number <span className="opt">(WhatsApp is fine)</span>
                    </label>
                    <input {...errProps("phone")} id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Include country code" value={fields.phone} onChange={(e) => update("phone", e.target.value)} />
                    <Err k="phone" />
                  </div>
                </div>
              </fieldset>

              <fieldset className="fs" data-step="2" hidden={step !== 2}>
                <legend className="fs-t">
                  Now, your business.
                </legend>
                <p className="fs-s">This helps us come to the call prepared.</p>
                <div className="fields">
                  <div className="fld full">
                    <label htmlFor="f-industry">Industry</label>
                    <div className="sel-wrap">
                      <select {...errProps("industry")} id="f-industry" name="industry" value={fields.industry} onChange={(e) => update("industry", e.target.value)}>
                        <option value="">Choose the closest match</option>
                        {industries.map((i) => (
                          <option key={i}>{i}</option>
                        ))}
                        <option value="Other">Something else</option>
                      </select>
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M2 4l4 4 4-4" />
                      </svg>
                    </div>
                    <Err k="industry" />
                  </div>
                  <div className="fld full" role="group" aria-labelledby="l-size">
                    <span className="lbl" id="l-size">
                      How many people work in the business?
                    </span>
                    <div className="chips">
                      {sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={size === s ? "opt-chip on" : "opt-chip"}
                          aria-pressed={size === s}
                          onClick={() => {
                            setSize(s);
                            setErrors((e) => ({ ...e, size: undefined }));
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <Err k="size" />
                  </div>
                </div>
              </fieldset>

              <fieldset className="fs" data-step="3" hidden={step !== 3}>
                <legend className="fs-t">
                  What should work better?
                </legend>
                <p className="fs-s">Choose any that apply. There are no wrong answers.</p>
                <div className="fields">
                  <div className="fld full" role="group" aria-labelledby="l-ch">
                    <span className="lbl" id="l-ch">
                      Your current challenges
                    </span>
                    <div className="chips">
                      {challengeOptions.map((c) => {
                        const on = challenges.includes(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            className={on ? "opt-chip on" : "opt-chip"}
                            aria-pressed={on}
                            onClick={() => {
                              setChallenges((list) => (on ? list.filter((x) => x !== c) : [...list, c]));
                              setErrors((e) => ({ ...e, challenges: undefined }));
                            }}
                          >
                            <span className="bx" aria-hidden="true">
                              {on ? "✓" : ""}
                            </span>
                            {c}
                          </button>
                        );
                      })}
                    </div>
                    <Err k="challenges" />
                  </div>
                  <div className="fld full">
                    <label htmlFor="f-improve">What would you most like to improve?</label>
                    <textarea
                      {...errProps("improve")}
                      id="f-improve"
                      name="improve"
                      placeholder="For example: every enquiry answered the same day, and a clear list of who still owes us."
                      value={fields.improve}
                      onChange={(e) => update("improve", e.target.value)}
                    />
                    <Err k="improve" />
                  </div>
                </div>
              </fieldset>

              <p className="err-sum" role="status" aria-live="polite">
                {summary}
              </p>
              <div className="card-foot">
                <span className="hint">{hints[step - 1]}</span>
                <div className="foot-btns">
                  {step > 1 && (
                    <button type="button" className="link-btn" onClick={() => goTo(step - 1)}>
                      Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button type="submit" className="btn btn-ink">
                      Continue <Arrow />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary" disabled={sending}>
                      <span className={sending ? "spin" : undefined} aria-hidden="true" />
                      <span>{sending ? "Sending your request" : SEND_LABEL}</span>
                    </button>
                  )}
                </div>
              </div>
              <p className="privacy">We only use your details to arrange and prepare for your business check. No mailing lists.</p>
            </form>
          </div>

          <div ref={doneRef} className="done" role="status" aria-live="polite" hidden={!done} tabIndex={-1}>
            {done && (
              <>
                <div className="ok" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </div>
                <h3>Thank you, {done.first}. Your request is in.</h3>
                <p className="sub">We have your details for {done.business}. Here is what happens next.</p>
                <div className="next">
                  <div>
                    <b>01</b>
                    <span>We read your answers before we speak, so the call starts with your business, not ours.</span>
                  </div>
                  <div>
                    <b>02</b>
                    <span>
                      {hasBooking
                        ? "Choose a time below. You'll get a confirmation email with the details straight away."
                        : `We email you from ${site.email} to agree a time for your 20-minute business check.`}
                    </span>
                  </div>
                  <div>
                    <b>03</b>
                    <span>On the call, we walk through how enquiries, orders and payments run today and where they break.</span>
                  </div>
                  <div>
                    <b>04</b>
                    <span>Afterwards, you get a one-page summary and a suggested next step. No obligation to go further.</span>
                  </div>
                </div>
                {done.usedMail && (
                  <p className="fine">
                    Your email app should have opened with your answers ready to send. If it didn&apos;t, please email{" "}
                    <a href={`mailto:${site.email}`}>{site.email}</a>.
                  </p>
                )}
                <p className="fine">
                  Anything to add in the meantime? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
                </p>
                <div className="done-actions">
                  {done.bookHref && (
                    <a className="btn btn-primary" href={done.bookHref}>
                      Choose a time for your call <Arrow />
                    </a>
                  )}
                  <button type="button" className="link-btn" onClick={reset}>
                    Submit another request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
