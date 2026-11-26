import SimpleForm from "./SimpleForm";
import { site } from "@/data/site";
import s from "./NewsletterForm.module.css";

// Email-only newsletter sign-up (footer and /insights#subscribe). Always on Ledger Green.
export default function NewsletterForm({ id, primary = false }: { id: string; primary?: boolean }) {
  return (
    <SimpleForm endpoint={site.endpoints.newsletter} email={site.email} subject="Newsletter sign-up" className={s.form} label="Subscribe to the newsletter" success="Thanks. You're on the list." errorClass={s.err} successClass={s.ok}>
      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor={`${id}-email`}>Email address</label>
          <input className={s.input} id={`${id}-email`} name="email" type="email" autoComplete="email" required />
        </div>
        <button className={`btn ${primary ? "btn-primary" : "btn-line"}`} type="submit">
          Subscribe
        </button>
      </div>
      <label className={s.consent}>
        <input type="checkbox" name="consent" required />
        <span>
          I agree to receive the newsletter. See the <a href="/privacy">privacy policy</a>.
        </span>
      </label>
    </SimpleForm>
  );
}
