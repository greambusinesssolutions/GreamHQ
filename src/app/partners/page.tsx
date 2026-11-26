import SectionHeading from "@/components/SectionHeading";
import NumberStrip from "@/components/NumberStrip";
import IndexRows from "@/components/IndexRows";
import Faq from "@/components/Faq";
import PartnerForm from "@/components/PartnerForm";
import { getFaqs, getList, getPartnerModels, getStats } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import s from "./partners.module.css";

export const metadata = pageMeta({
  title: "Partner programme · GREAM Business Solutions",
  description: "Referral, delivery, white-label, technology, product and growth partnerships, with clear terms in writing from the first deal.",
  path: "/partners",
});

const who = [
  { title: "Consultants, accountants and advisers", text: "Your clients ask how to run better. We build the answer." },
  { title: "Marketing, design and web agencies", text: "You bring in the enquiries. We make sure they turn into payments." },
  { title: "Software companies", text: "Extra hands to deliver for your clients." },
  { title: "Platforms and payment providers", text: "We put your product to work in real businesses." },
  { title: "Founders and business owners", text: "You have the idea or the market. We build the product with you." },
];

const how = [
  ["01 · Apply", "Tell us who you are and who you serve."],
  ["02 · Talk", "A short call to find the right model."],
  ["03 · Agree in writing", "Simple terms, clear attribution, how you're paid."],
  ["04 · First deal", "We work it together and you see every step."],
];

export default function Partners() {
  return (
    <>
      <section className={`ledger-grid ${s.hero}`} aria-labelledby="pt-h">
        <div className="wrap">
          <SectionHeading eyebrow="Partner programme" heading="More for your clients. More for both of us." accent="More for both of us." level={1} size="display" id="pt-h" />
          <p className={`t-lede ${s.lede}`}>Whether you advise businesses, run an agency, build software or offer a platform, we can deliver more value together than apart. Clear terms, in writing, from the first deal.</p>
          <a className={`btn btn-primary ${s.cta}`} href="#apply">Become a partner <span className="arr" aria-hidden="true">→</span></a>
          <NumberStrip items={getStats("partners")} className={s.strip} />
        </div>
      </section>

      <section className="section ground-sage" aria-labelledby="ways-h">
        <div className="wrap">
          <SectionHeading eyebrow="Ways to partner" heading="Six ways to work together, for the long term." accent="for the long term." id="ways-h" className="head-block" />
          <div className={s.models}>
            {getPartnerModels().map((m) => (
              <article key={m.id} className={`${s.model} ${m.highlight ? s.highlight : ""}`}>
                <p className={`t-label ${s.kind}`}>0{m.order} · {m.kind}</p>
                <h3 className="t-title">{m.title}</h3>
                <p className={`t-small ${s.text}`}>{m.text}</p>
                <p className={`t-label ${s.earns}`}>{m.earns}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="who-h">
        <div className="wrap">
          <SectionHeading eyebrow="Who we partner with" heading="People who already have the client's trust." accent="the client's trust." id="who-h" className="head-block" />
          <IndexRows rows={who} />
        </div>
      </section>

      <section className="section dark ledger-grid" aria-labelledby="ph-h">
        <div className="wrap">
          <SectionHeading eyebrow="How it works" heading="Built for deals, not paperwork." id="ph-h" className="head-block" />
          <ol className={s.steps}>
            {how.map(([k, v]) => (
              <li key={k} className={s.step}><p className={`t-label ${s.stepLabel}`}>{k}</p><p className="t-small muted">{v}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`ground-deep ${s.platforms}`} aria-labelledby="pl-h">
        <div className={`wrap ${s.platformsIn}`}>
          <h2 className="t-label" id="pl-h">Platforms and tools we build with</h2>
          <ul className={s.names}>{getList("platforms").map((n) => <li key={n} className="t-card">{n}</li>)}</ul>
        </div>
      </section>

      <section className="section" id="apply" aria-labelledby="apply-h">
        <div className={`wrap ${s.apply}`}>
          <div>
            <SectionHeading eyebrow="Become a partner" heading="Let's see what we can build together." accent="build together." id="apply-h" />
            <div className={s.faq}><Faq items={getFaqs(["referral-paid", "client-relationship", "partners-worldwide"])} /></div>
          </div>
          <PartnerForm />
        </div>
      </section>
    </>
  );
}
