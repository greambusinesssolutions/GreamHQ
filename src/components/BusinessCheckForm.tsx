"use client";

// The free business check: one flow of four steps (About you, Your business, What to improve,
// Choose a time), worded as in COPY.md. Answers go to the check endpoint when the visitor books;
// step 4 then shows the booking calendar with their name and email filled in.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendForm } from "@/lib/send";
import s from "./BusinessCheckForm.module.css";

const steps = ["About you", "Your business", "What to improve", "Choose a time"];
const improveOptions = ["Missed or slow replies to enquiries", "Follow-ups that don't happen", "Knowing who has paid", "Customers who owe us", "Too much manual admin", "Something else"];

type Fields = { name: string; email: string; phone: string; role: string; business: string; website: string; country: string; sells: string; more: string };
type Key = keyof Fields | "improve" | "consent";
const empty: Fields = { name: "", email: "", phone: "", role: "", business: "", website: "", country: "", sells: "", more: "" };

export default function BusinessCheckForm({ endpoint, email, bookingUrl }: { endpoint: string; email: string; bookingUrl: string }) {
  const [step, setStep] = useState(1);
  const [v, setV] = useState<Fields>(empty);
  const [improve, setImprove] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [summary, setSummary] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | { book: string; mail: boolean }>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const focus = useRef<"step" | "error" | null>(null);

  useEffect(() => {
    const f = formRef.current;
    if (!f || !focus.current) return;
    const sel = focus.current === "error" ? '[aria-invalid="true"], [aria-invalid="true"] input' : `fieldset[data-step="${step}"] input, fieldset[data-step="${step}"] select`;
    f.querySelector<HTMLElement>(sel)?.focus();
    focus.current = null;
  }, [step, errors]);
  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const set = (k: keyof Fields, val: string) => {
    setV((x) => ({ ...x, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  function validate(n: number) {
    const e: Partial<Record<Key, string>> = {};
    const t = (k: keyof Fields) => v[k].trim();
    if (n === 1) {
      if (!t("name")) e.name = "Please enter your full name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t("email"))) e.email = "Please enter a valid email, like you@yourbusiness.com.";
      if (!t("role")) e.role = "Please tell us your role.";
    }
    if (n === 2) {
      if (!t("business")) e.business = "Please enter your business name.";
      if (!t("country")) e.country = "Please tell us which country you're in.";
      if (!t("sells")) e.sells = "Please tell us briefly what you sell.";
    }
    if (n === 3 && !improve.length) e.improve = "Choose at least one.";
    if (n === 4 && !consent) e.consent = "Please tick the box so we can respond to your request.";
    const count = Object.keys(e).length;
    setErrors(e);
    setSummary(count ? (count === 1 ? "One thing needs your attention above." : `${count} things need your attention above.`) : "");
    if (count) focus.current = "error";
    return count === 0;
  }

  function go(n: number) {
    setStep(n);
    setSummary("");
    focus.current = "step";
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (busy || !validate(step)) return;
    if (step < 4) return go(step + 1);
    if ((ev.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement).value) return; // honeypot
    const data: Record<string, string> = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x.trim()]));
    data.improve = improve.join(", ");
    setBusy(true);
    try {
      const how = await sendForm(endpoint, email, `Free business check request: ${data.business}`, data);
      const url = new URL(bookingUrl);
      url.searchParams.set("name", data.name);
      url.searchParams.set("email", data.email);
      setDone({ book: url.href, mail: how === "mail" });
    } catch {
      setSummary(`Something went wrong sending your request. Please try again, or email ${email}.`);
    } finally {
      setBusy(false);
    }
  }

  const field = (k: Key) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": `bc-${k}-e` });
  const Err = ({ k }: { k: Key }) => <p className="field-err" id={`bc-${k}-e`}>{errors[k]}</p>;
  const Input = ({ k, label, type = "text", auto, optional = false, mode }: { k: keyof Fields; label: string; type?: string; auto?: string; optional?: boolean; mode?: "email" | "tel" | "url" }) => (
    <div className="field">
      <label htmlFor={`bc-${k}`}>{label}{optional && <span className="opt"> (optional)</span>}</label>
      <input className="inp" id={`bc-${k}`} name={k} type={type} inputMode={mode} autoComplete={auto} value={v[k]} onChange={(e) => set(k, e.target.value)} {...field(k)} />
      <Err k={k} />
    </div>
  );

  return (
    <div className={s.card}>
      <ol className={s.prog} aria-hidden="true">
        {steps.map((name, i) => (
          <li key={name} className={`${s.progItem} ${i + 1 === step ? s.cur : ""} ${i + 1 < step || (done && i < 3) ? s.past : ""}`}>
            <i />
            <span className={`t-label ${s.progLabel}`}>0{i + 1} {name}</span>
          </li>
        ))}
      </ol>

      {!done ? (
        <form ref={formRef} className={s.body} noValidate aria-label="Free business check" onSubmit={onSubmit}>
          <p className={`t-label ${s.stepOf}`} aria-live="polite">Step {step} of 4 · {steps[step - 1]}</p>

          <fieldset className={s.fs} data-step="1" hidden={step !== 1}>
            <legend className={`t-title ${s.legend}`}>About you</legend>
            <div className={s.grid}>
              {Input({ k: "name", label: "Full name", auto: "name" })}
              {Input({ k: "email", label: "Email", type: "email", auto: "email", mode: "email" })}
              {Input({ k: "phone", label: "Phone or WhatsApp", type: "tel", auto: "tel", mode: "tel", optional: true })}
              {Input({ k: "role", label: "Role", auto: "organization-title" })}
            </div>
          </fieldset>

          <fieldset className={s.fs} data-step="2" hidden={step !== 2}>
            <legend className={`t-title ${s.legend}`}>Your business</legend>
            <div className={s.grid}>
              {Input({ k: "business", label: "Business name", auto: "organization" })}
              {Input({ k: "website", label: "Website", type: "url", auto: "url", mode: "url", optional: true })}
              {Input({ k: "country", label: "Country", auto: "country-name" })}
              {Input({ k: "sells", label: "What you sell" })}
            </div>
          </fieldset>

          <fieldset className={s.fs} data-step="3" hidden={step !== 3}>
            <legend className={`t-title ${s.legend}`}>What to improve</legend>
            <div className={s.grid}>
              <div className={`field ${s.full}`}>
                <fieldset className="chips" {...field("improve")}>
                  <legend>Choose any</legend>
                  {improveOptions.map((c) => (
                    <label className="chip" key={c}>
                      <input
                        type="checkbox" name="improve" value={c} checked={improve.includes(c)}
                        onChange={(e) => {
                          setImprove((l) => (e.target.checked ? [...l, c] : l.filter((x) => x !== c)));
                          setErrors((er) => ({ ...er, improve: undefined }));
                        }}
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </fieldset>
                <Err k="improve" />
              </div>
              <div className={`field ${s.full}`}>
                <label htmlFor="bc-more">Tell us a little more <span className="opt">(optional)</span></label>
                <textarea className="inp" id="bc-more" name="more" value={v.more} onChange={(e) => set("more", e.target.value)} />
              </div>
            </div>
          </fieldset>

          <fieldset className={s.fs} data-step="4" hidden={step !== 4}>
            <legend className={`t-title ${s.legend}`}>Choose a time</legend>
            <div className={s.grid}>
              <div className={`field ${s.full}`}>
                <label className="consent">
                  <input type="checkbox" name="consent" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErrors((er) => ({ ...er, consent: undefined })); }} {...field("consent")} />
                  <span>I agree to GREAM Business Solutions <a href="/privacy">using these details</a> to respond to my request.</span>
                </label>
                <Err k="consent" />
              </div>
            </div>
          </fieldset>

          <div className="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></label></div>
          <p className={`field-err ${s.sum}`} role="alert">{summary}</p>
          <div className={s.foot}>
            <div className={s.btns}>
              {step > 1 && <button type="button" className={s.back} onClick={() => go(step - 1)}>Back</button>}
              <button type="submit" className={`btn ${step === 4 ? "btn-primary" : "btn-ink"}`} disabled={busy}>
                {busy ? "Sending" : step === 4 ? "Book my free check" : "Continue"} <span className="arr" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div ref={doneRef} className={s.done} tabIndex={-1} role="status">
          <p className={`t-label ${s.stepOf}`}>Step 4 of 4 · Choose a time</p>
          <p className="t-body">Thank you. You&apos;ll get a confirmation by email. On the call, we&apos;ll show you what&apos;s costing you customers and what would fix it fastest.</p>
          {done.mail && <p className={`t-caption ${s.fine}`}>Your email app should have opened with your answers. Press send so they reach us.</p>}
          <iframe className={s.calendar} src={`${done.book}${done.book.includes("?") ? "&" : "?"}embed=true`} title="Choose a time for your free business check" loading="lazy" />
          <p className={`t-caption ${s.fine}`}><a href={done.book} target="_blank" rel="noopener">Open the booking calendar in a new tab</a> if it doesn&apos;t load here.</p>
        </div>
      )}
    </div>
  );
}
