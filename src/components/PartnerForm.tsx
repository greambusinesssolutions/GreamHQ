import SimpleForm from "./SimpleForm";
import { site } from "@/data/site";
import s from "./PartnerForm.module.css";

const models = ["Referral", "Delivery", "White label", "Technology", "Product partnership", "Growth partnership", "Not sure yet"];

const Field = ({ id, label, type = "text", auto, required = true }: { id: string; label: string; type?: string; auto?: string; required?: boolean }) => (
  <div className="field">
    <label htmlFor={`pa-${id}`}>{label}{!required && <span className="opt"> (optional)</span>}</label>
    <input className="inp" id={`pa-${id}`} name={id} type={type} autoComplete={auto} required={required} />
  </div>
);

/** Partner application (/partners#apply). Sends to FORM_ENDPOINT_PARTNER, or opens the email app. */
export default function PartnerForm() {
  return (
    <SimpleForm endpoint={site.endpoints.partner} email={site.email} subject="Partner application" className={s.card} label="Partner application" success="Thank you. Your application is in, and we will be in touch." errorClass="field-err" successClass={s.ok}>
      <div className={s.two}><Field id="name" label="Full name" auto="name" /><Field id="role" label="Role" auto="organization-title" /></div>
      <div className={s.two}><Field id="email" label="Email" type="email" auto="email" /><Field id="company" label="Company" auto="organization" /></div>
      <div className={s.two}><Field id="website" label="Website" type="url" auto="url" required={false} /><Field id="country" label="Country" auto="country-name" /></div>
      <div className="field">
        <label htmlFor="pa-model">How would you like to partner?</label>
        <select className="inp" id="pa-model" name="model" required defaultValue="">
          <option value="" disabled>Choose one</option>
          {models.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="pa-serve">Who do you serve?</label>
        <textarea className="inp" id="pa-serve" name="serve" required />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>I agree to GREAM Business Solutions using these details to respond to my application. See the <a href="/privacy">privacy policy</a>.</span>
      </label>
      <button className="btn btn-ink" type="submit">Send application <span className="arr" aria-hidden="true">→</span></button>
    </SimpleForm>
  );
}
