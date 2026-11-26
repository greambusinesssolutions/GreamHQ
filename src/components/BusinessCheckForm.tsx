"use client";

// The free business check: one flow of four steps (About you, Your business,
// What to improve, Choose a time). Answers go to the check endpoint after step 3;
// step 4 opens the booking page with the visitor's name and email filled in.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendForm } from "@/lib/send";
import s from "./BusinessCheckForm.module.css";

const industries = ["Retail and e-commerce", "Food and hospitality", "Health and wellness", "Beauty and personal care", "Professional services", "Property and real estate", "Logistics and distribution", "Manufacturing", "Education and training", "Something else"];
const sizes = ["Just me", "2–10", "11–50", "51–200", "More than 200"];
const challengeOptions = ["Missed or slow replies to enquiries", "Inconsistent follow-up", "Orders tracked by hand", "Not sure who has paid", "No clear view of sales", "Too much repetitive admin", "Something else"];
const steps = ["About you", "Your business", "What to improve", "Choose a time"];
const hints = ["About two minutes in total", "Nearly there", "Then choose a time"];

type Key = "name" | "business" | "email" | "phone" | "industry" | "size" | "challenges" | "improve" | "consent";
type Errors = Partial<Record<Key, string>>;

export default function BusinessCheckForm({ endpoint, email, bookingUrl }: { endpoint: string; email: string; bookingUrl: string }) {
  const [step, setStep] = useState(1);
  const [v, setV] = useState({ name: "", business: "", email: "", phone: "", industry: "", size: "", improve: "" });
  const [challenges, setChallenges] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | { first: string; book: string; mail: boolean }>(null);
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
  useEffect(() => { if (done) doneRef.current?.focus(); }, [done]);

  const set = (k: keyof typeof v, val: string) => {
    setV((x) => ({ ...x, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  function validate(n: number) {
    const e: Errors = {};
    if (n === 1) {
      if (!v.name.trim()) e.name = "Please enter your full name.";
      if (!v.business.trim()) e.business = "Please enter your business name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email, like you@yourbusiness.com.";
      if (v.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a phone number we can reach you on.";
    }
    if (n === 2) {
      if (!v.industry) e.industry = "Please choose the closest industry.";
      if (!v.size) e.size = "Please choose your team size.";
    }
    if (n === 3) {
      if (!challenges.length) e.challenges = "Choose at least one challenge.";
      if (v.improve.trim().length < 3) e.improve = "Tell us briefly what you would like to improve.";
      if (!consent) e.consent = "Please tick the box so we can use your details for the call.";
    }
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
    if (step < 3) return go(step + 1);
    if ((ev.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement).value) return; // honeypot
    const data = { ...v, name: v.name.trim(), business: v.business.trim(), email: v.email.trim(), phone: v.phone.trim(), improve: v.improve.trim(), challenges: challenges.join(", ") };
    setBusy(true);
    try {
      const how = await sendForm(endpoint, email, `Free business check request: ${data.business}`, data);
      const url = new URL(bookingUrl);
      url.searchParams.set("name", data.name);
      url.searchParams.set("email", data.email);
      setDone({ first: data.name.split(/\s+/)[0], book: url.href, mail: how === "mail" });
    } catch {
      setSummary(`Something went wrong sending your answers. Please try again, or email ${email}.`);
    } finally {
      setBusy(false);
    }
  }

  const current = done ? 4 : step;
  const field = (k: Key) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": `bc-${k}-e` });
  const Err = ({ k }: { k: Key }) => <p className="field-err" id={`bc-${k}-e`}>{errors[k]}</p>;

  return (
    <div className={s.card}>
      <ol className={s.prog} aria-hidden="true">
        {steps.map((name, i) => (
          <li key={name} className={`${s.progItem} ${i + 1 === current ? s.cur : ""} ${i + 1 < current ? s.past : ""}`}>
            <i />
            <span className={`t-label ${s.progLabel}`}>0{i + 1} {name}</span>
          </li>
        ))}
      </ol>

      {!done ? (
        <form ref={formRef} className={s.body} noValidate aria-labelledby="bc-title" onSubmit={onSubmit}>
          <p className={`t-label ${s.stepOf}`} aria-live="polite">Step {step} of 4 · {steps[step - 1]}</p>

          <fieldset className={s.fs} data-step="1" hidden={step !== 1}>
            <legend className={`t-title ${s.legend}`} id="bc-title">First, about you.</legend>
            <p className={`t-small ${s.sub}`}>So we know who we&apos;re speaking with and how to reach you.</p>
            <div className={s.grid}>
              <div className="field"><label htmlFor="bc-name">Full name</label><input className="inp" id="bc-name" name="name" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} {...field("name")} /><Err k="name" /></div>
              <div className="field"><label htmlFor="bc-business">Business name</label><input className="inp" id="bc-business" name="business" autoComplete="organization" value={v.business} onChange={(e) => set("business", e.target.value)} {...field("business")} /><Err k="business" /></div>
              <div className="field"><label htmlFor="bc-email">Business email</label><input className="inp" id="bc-email" name="email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} {...field("email")} /><Err k="email" /></div>
              <div className="field"><label htmlFor="bc-phone">Phone number <span className="opt">(WhatsApp is fine)</span></label><input className="inp" id="bc-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Include country code" value={v.phone} onChange={(e) => set("phone", e.target.value)} {...field("phone")} /><Err k="phone" /></div>
            </div>
          </fieldset>

          <fieldset className={s.fs} data-step="2" hidden={step !== 2}>
            <legend className={`t-title ${s.legend}`}>Now, your business.</legend>
            <p className={`t-small ${s.sub}`}>This helps us come to the call prepared.</p>
            <div className={s.grid}>
              <div className={`field ${s.full}`}>
                <label htmlFor="bc-industry">Industry</label>
                <select className="inp" id="bc-industry" name="industry" value={v.industry} onChange={(e) => set("industry", e.target.value)} {...field("industry")}>
                  <option value="">Choose the closest match</option>
                  {industries.map((i) => <option key={i}>{i}</option>)}
                </select>
                <Err k="industry" />
              </div>
              <div className={`field ${s.full}`}>
                <fieldset className="chips" {...field("size")}>
                  <legend>How many people work in the business?</legend>
                  {sizes.map((x) => (
                    <label className="chip" key={x}>
                      <input type="radio" name="size" value={x} checked={v.size === x} onChange={() => set("size", x)} />
                      <span>{x}</span>
                    </label>
                  ))}
                </fieldset>
                <Err k="size" />
              </div>
            </div>
          </fieldset>

          <fieldset className={s.fs} data-step="3" hidden={step !== 3}>
            <legend className={`t-title ${s.legend}`}>What should work better?</legend>
            <p className={`t-small ${s.sub}`}>Choose any that apply. There are no wrong answers.</p>
            <div className={s.grid}>
              <div className={`field ${s.full}`}>
                <fieldset className="chips" {...field("challenges")}>
                  <legend>Your current challenges</legend>
                  {challengeOptions.map((c) => (
                    <label className="chip" key={c}>
                      <input
                        type="checkbox" name="challenges" value={c} checked={challenges.includes(c)}
                        onChange={(e) => {
                          setChallenges((l) => (e.target.checked ? [...l, c] : l.filter((x) => x !== c)));
                          setErrors((er) => ({ ...er, challenges: undefined }));
                        }}
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </fieldset>
                <Err k="challenges" />
              </div>
              <div className={`field ${s.full}`}>
                <label htmlFor="bc-improve">What would you most like to improve?</label>
                <textarea className="inp" id="bc-improve" name="improve" placeholder="For example: every enquiry answered the same day, and a clear list of who still owes us." value={v.improve} onChange={(e) => set("improve", e.target.value)} {...field("improve")} />
                <Err k="improve" />
              </div>
              <div className={`field ${s.full}`}>
                <label className="consent">
                  <input type="checkbox" name="consent" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErrors((er) => ({ ...er, consent: undefined })); }} {...field("consent")} />
                  <span>I agree to GREAM Business Solutions using these details to arrange and prepare for my business check. See the <a href="/privacy">privacy policy</a>.</span>
                </label>
                <Err k="consent" />
              </div>
            </div>
          </fieldset>

          <div className="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></label></div>
          <p className={`field-err ${s.sum}`} role="alert">{summary}</p>
          <div className={s.foot}>
            <span className={`t-caption ${s.hint}`}>{hints[step - 1]}</span>
            <div className={s.btns}>
              {step > 1 && <button type="button" className={s.back} onClick={() => go(step - 1)}>Back</button>}
              <button type="submit" className={`btn ${step === 3 ? "btn-primary" : "btn-ink"}`} disabled={busy}>
                {busy ? "Sending" : step === 3 ? "Send and choose a time" : "Continue"} <span className="arr" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          <p className={`t-caption ${s.privacy}`}>We only use your details to arrange and prepare for your business check. No mailing lists.</p>
        </form>
      ) : (
        <div ref={doneRef} className={s.done} tabIndex={-1} role="status">
          <p className={`t-label ${s.stepOf}`}>Step 4 of 4 · Choose a time</p>
          <h3 className="t-title">Thank you, {done.first}. Now choose a time.</h3>
          <p className={`t-small ${s.sub}`}>Your answers are in. Pick a 20-minute slot that suits you.</p>
          <a className={`btn btn-primary ${s.book}`} href={done.book}>Choose a time for your call <span className="arr" aria-hidden="true">→</span></a>
          {done.mail && <p className={`t-caption ${s.fine}`}>Your email app should have opened with your answers. Press send so they reach us, then choose a time.</p>}
          <ol className={s.next}>
            <li className={s.nextItem}><b className={`t-label ${s.nextNum}`}>01</b><span className="t-small">We read your answers before we speak, so the call starts with your business.</span></li>
            <li className={s.nextItem}><b className={`t-label ${s.nextNum}`}>02</b><span className="t-small">On the call, we look at how your business runs today and where customers or time are lost.</span></li>
            <li className={s.nextItem}><b className={`t-label ${s.nextNum}`}>03</b><span className="t-small">Afterwards, you get a one-page summary and a suggested next step. No obligation.</span></li>
          </ol>
        </div>
      )}
    </div>
  );
}
