import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Accent from "@/components/Accent";
import NumberStrip from "@/components/NumberStrip";
import IndexRows from "@/components/IndexRows";
import Faq from "@/components/Faq";
import DarkCta from "@/components/DarkCta";
import { bySlug, getFaqs, getServices, getWork } from "@/lib/content";
import { bookHref } from "@/data/nav";
import { pageMeta } from "@/lib/seo";
import s from "./service.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => getServices().map((x) => ({ service: x.slug }));

type Params = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service } = await params;
  const d = bySlug(getServices(), service, "services").data;
  return pageMeta({ title: d.seoTitle, description: d.description, path: `/what-we-do/${service}` });
}

/** Service page template (design: AIAgents). Every section is optional and driven by content/services/<slug>.md. */
export default async function ServicePage({ params }: Params) {
  const { service } = await params;
  const d = bySlug(getServices(), service, "services").data;
  const story = d.story ? getWork().find((w) => w.slug === d.story) : undefined;
  const faqs = getFaqs(d.faqs);
  const h = d.hero;

  return (
    <>
      <section className={`ledger-grid ${s.hero}`} aria-labelledby="svc-h">
        <div className="wrap">
          <div className={`${s.heroGrid} ${h.example ? "" : s.heroSolo}`}>
            <div>
              <p className="eyebrow">{h.eyebrow}</p>
              <h1 className="t-display" id="svc-h"><Accent text={h.heading} accent={h.accent} /></h1>
              <p className={`t-lede ${s.lede}`}>{h.lede}</p>
              <div className={`actions ${s.actions}`}>
                <Link className="btn btn-primary" href={bookHref}>{h.cta} <span className="arr" aria-hidden="true">→</span></Link>
                {h.secondary && <a className="btn btn-line" href={h.secondary.href}>{h.secondary.label}</a>}
              </div>
              {h.proof && <p className={`t-label ${s.proof}`}>{h.proof}</p>}
            </div>
            {h.example && (
              <figure className={`dark ${s.example}`} aria-label={`Example: ${h.example.label}`}>
                <div className={s.exHead}><span className="t-label">{h.example.label}</span><span className={s.exBadge}>Example</span></div>
                <div className={`t-small ${s.chat}`}>
                  <p className={s.in}>{h.example.customer}</p>
                  <p className={s.out}>{h.example.reply}</p>
                  <p className={`t-label ${s.note}`}>{h.example.note}</p>
                </div>
                <div className={s.tags}>{h.example.tags.map((t) => <span key={t} className="t-label">{t}</span>)}</div>
              </figure>
            )}
          </div>
          {d.stats && <NumberStrip items={d.stats} className={s.strip} />}
        </div>
      </section>

      {d.stages && (
        <section className="section ground-sage" aria-labelledby="stages-h">
          <div className="wrap">
            <SectionHeading eyebrow={d.stages.eyebrow} heading={d.stages.heading} id="stages-h" className="head-block" />
            <div className={s.stages}>
              {d.stages.items.map((x) => (
                <div key={x.label} className={`${s.stage} ${x.ours ? s.ours : ""}`}>
                  <p className={`t-label ${s.stageLabel}`}>{x.label}</p>
                  <h3 className="t-card">{x.title}</h3>
                  <p className="t-small muted">{x.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {d.rows && (
        <section className="section" id={d.rows.id} aria-labelledby="rows-h">
          <div className="wrap">
            <SectionHeading eyebrow={d.rows.eyebrow} heading={d.rows.heading} accent={d.rows.accent} id="rows-h" className="head-block" />
            <IndexRows rows={d.rows.items.map((r) => ({ title: r.title, text: r.text, aside: r.approves ? { label: "A person approves", text: r.approves } : undefined }))} />
          </div>
        </section>
      )}

      {d.steps && (
        <section className="section dark" aria-labelledby="steps-h">
          <div className="wrap">
            <SectionHeading eyebrow={d.steps.eyebrow} heading={d.steps.heading} id="steps-h" className="head-block" />
            <ol className={s.steps}>
              {d.steps.items.map((x) => (
                <li key={x.label} className={s.step}>
                  <p className={`t-label ${s.stepLabel}`}>{x.label}</p>
                  <p className="t-small muted">{x.text}</p>
                  <p className={`t-label ${s.gets}`}>{x.gets}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {d.shortAnswer && (
        <section className="section" aria-labelledby="answer-h">
          <div className="wrap cols-2">
            <SectionHeading eyebrow="The short answer" heading={d.shortAnswer.heading} id="answer-h" />
            <div>
              <p className="t-lede">{d.shortAnswer.text}</p>
              {d.shortAnswer.checks.length > 0 && (
                <dl className={s.checks}>
                  {d.shortAnswer.checks.map((c) => (
                    <div className={s.check} key={c.label}><dt className={`t-label ${s.checkLabel}`}>{c.label}</dt><dd className="t-small muted">{c.text}</dd></div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </section>
      )}

      {(story || d.questions) && (
        <section className="section tight-top" aria-label="Client story and questions to ask">
          <div className={`wrap ${s.pair}`}>
            {story && (
              <article className={s.story}>
                <p className="t-label">Client story · {story.data.industry} · {story.data.region}</p>
                <h2 className="t-title">{story.data.title}</h2>
                <p className="t-small muted"><b>{story.data.result.value}</b> {story.data.result.label}.</p>
                <Link className={`t-small ${s.storyLink}`} href={`/work/${story.slug}`}>Read the case →</Link>
              </article>
            )}
            {d.questions && (
              <div className={s.questions}>
                <h2 className={`t-label ${s.qHead}`}>{d.questions.heading}</h2>
                <ol className={`t-small ${s.qList}`}>{d.questions.items.map((q) => <li key={q}>{q}</li>)}</ol>
              </div>
            )}
          </div>
        </section>
      )}

      {(d.pricing || faqs.length > 0) && (
        <section className="section tight-top" aria-labelledby="price-h">
          <div className="wrap cols-2">
            <div>
              <SectionHeading eyebrow={d.pricing ? "Pricing and timeline" : "Questions"} heading={d.pricing?.heading ?? "Questions buyers ask us."} id="price-h" />
              {d.pricing && <p className={`t-lede ${s.pricingText}`}>{d.pricing.text}</p>}
            </div>
            {faqs.length > 0 && <Faq items={faqs} />}
          </div>
        </section>
      )}

      <DarkCta id="contact" heading={d.cta.heading} accent={d.cta.accent} text={d.cta.text} button={d.cta.button} />
    </>
  );
}
