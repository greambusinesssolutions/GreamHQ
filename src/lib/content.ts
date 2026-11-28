// Content loader. Every case study, product, insight, service and list lives as a
// Markdown or JSON file in /content, checked against the schemas below at build time.
// Add a case study by adding one file to content/work. Client names, figures, quotes and
// prices from the designs are sample content: replace them here, no code changes needed.
import "server-only";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { z } from "zod";

const ROOT = join(process.cwd(), "content");
const stat = z.object({ value: z.string(), label: z.string(), suffix: z.string().optional() });

// ---------- Schemas ----------
const serviceSchema = z.object({
  order: z.number(),
  short: z.string(),
  title: z.string(),
  titleAccent: z.string().optional(),
  summary: z.string(),
  seoTitle: z.string(),
  description: z.string(),
  hero: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    accent: z.string().optional(),
    lede: z.string(),
    cta: z.string().default("Book a free business check"),
    secondary: z.object({ label: z.string(), href: z.string() }).optional(),
    proof: z.string().optional(),
    example: z.object({ label: z.string(), customer: z.string(), reply: z.string(), note: z.string(), tags: z.array(z.string()) }).optional(),
  }),
  stats: z.array(stat).optional(),
  stages: z
    .object({
      eyebrow: z.string(),
      heading: z.string(),
      items: z.array(z.object({ label: z.string(), title: z.string(), text: z.string(), ours: z.boolean().default(false) })),
    })
    .optional(),
  rows: z
    .object({
      id: z.string().default("detail"),
      eyebrow: z.string(),
      heading: z.string(),
      accent: z.string().optional(),
      items: z.array(z.object({ title: z.string(), text: z.string(), approves: z.string().optional() })),
    })
    .optional(),
  steps: z.object({ eyebrow: z.string(), heading: z.string(), items: z.array(z.object({ label: z.string(), text: z.string(), gets: z.string() })) }).optional(),
  shortAnswer: z.object({ heading: z.string(), text: z.string(), checks: z.array(z.object({ label: z.string(), text: z.string() })).default([]) }).optional(),
  story: z.string().optional(), // slug of a case study in content/work
  storyCard: z.object({ title: z.string().optional(), text: z.string().optional() }).optional(),
  questions: z.object({ heading: z.string(), items: z.array(z.string()) }).optional(),
  pricing: z.object({ heading: z.string(), text: z.string() }).optional(),
  faqs: z.array(z.string()).default([]),
  cta: z.object({ heading: z.string(), accent: z.string().optional(), text: z.string().optional(), button: z.string(), href: z.string().optional() }),
});

const workSchema = z.object({
  client: z.string(),
  title: z.string(),
  service: z.string(),
  industry: z.string(),
  region: z.string(),
  result: stat,
  problem: z.string(),
  changed: z.string(),
  quote: z.object({ text: z.string(), name: z.string(), role: z.string(), since: z.string().optional() }).optional(),
  // How the case reads on the home page, where the design words it differently from the Work page.
  homeResult: stat.optional(),
  homeChat: z.tuple([z.string(), z.string()]).optional(),
  visual: z.enum(["bars", "chat", "ledger"]),
  featured: z.boolean().default(false),
  order: z.number().default(99),
});

const productSchema = z.object({
  name: z.string(),
  audience: z.string(),
  status: z.enum(["Live", "Early access", "Coming soon"]),
  summary: z.string(),
  price: z.string(),
  cta: z.string(),
  order: z.number().default(99),
});

export const insightTypes = ["Guide", "AI agents", "Report", "Case notes", "Talks"] as const;
const insightSchema = z.object({
  title: z.string(),
  type: z.enum(insightTypes),
  summary: z.string(),
  shortAnswer: z.string(),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  related: z.array(z.string()).default([]),
  homeTitle: z.string().optional(), // how the title reads on the home page
});

const solutionSchema = z.object({ id: z.string(), order: z.number(), title: z.string(), audience: z.string(), outcome: z.string() });
const faqSchema = z.object({ id: z.string(), question: z.string(), answer: z.string() });
const partnerModelSchema = z.object({
  id: z.string(),
  order: z.number(),
  kind: z.string(),
  title: z.string(),
  text: z.string(),
  earns: z.string(),
  highlight: z.boolean().default(false),
});
const statsSchema = z.object({ id: z.string(), items: z.array(stat) });
const clientSchema = z.object({ id: z.string(), name: z.string(), style: z.enum(["serif", "serif-italic", "sans", "sans-caps", "mono"]) });
const exampleSchema = z.object({
  id: z.string(),
  label: z.string(),
  rows: z.array(z.object({ who: z.string(), what: z.string(), status: z.string() })).default([]),
  // Home hero scene (content/examples.json, id "home-scene")
  customer: z.string().optional(),
  message: z.string().optional(),
  reply: z.string().optional(),
  approved: z.string().optional(),
  linkSent: z.string().optional(),
  order: z.string().optional(),
  currency: z.string().optional(),
  amount: z.number().optional(),
});
const listSchema = z.object({ id: z.string(), items: z.array(z.string()) });

// ---------- Loaders ----------
type Entry<T> = { slug: string; data: T; html: string };

function loadMarkdown<T>(dir: string, schema: z.ZodType<T>): Entry<T>[] {
  const folder = join(ROOT, dir);
  return readdirSync(folder)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(readFileSync(join(folder, f), "utf8"));
      const parsed = schema.safeParse(data);
      if (!parsed.success) throw new Error(`content/${dir}/${f}: ${z.prettifyError(parsed.error)}`);
      return { slug: f.replace(/\.md$/, ""), data: parsed.data, html: marked.parse(content.trim(), { async: false }) };
    });
}

function loadJson<T>(file: string, schema: z.ZodType<T>): T[] {
  const raw = JSON.parse(readFileSync(join(ROOT, file), "utf8"));
  const parsed = z.array(schema).safeParse(raw);
  if (!parsed.success) throw new Error(`content/${file}: ${z.prettifyError(parsed.error)}`);
  return parsed.data;
}

const byOrder = <T extends { order: number }>(a: { data: T } | T, b: { data: T } | T) =>
  ("data" in a ? a.data.order : a.order) - ("data" in b ? b.data.order : b.order);

// ---------- Queries ----------
export type Service = Entry<z.infer<typeof serviceSchema>>;
export type CaseStudy = Entry<z.infer<typeof workSchema>>;
export type Product = Entry<z.infer<typeof productSchema>>;
export type Insight = Entry<z.infer<typeof insightSchema>>;

export const getServices = () => loadMarkdown("services", serviceSchema).sort(byOrder);
export const getWork = () => loadMarkdown("work", workSchema).sort(byOrder);
export const getProducts = () => loadMarkdown("products", productSchema).sort(byOrder);
export const getInsights = () => loadMarkdown("insights", insightSchema).sort(byOrder);
export const getSolutions = () => loadJson("solutions.json", solutionSchema).sort(byOrder);
export const getPartnerModels = () => loadJson("partner-models.json", partnerModelSchema).sort(byOrder);
export const getClients = () => loadJson("clients.json", clientSchema);

function one<T extends { id: string }>(list: T[], id: string, file: string): T {
  const found = list.find((x) => x.id === id);
  if (!found) throw new Error(`content/${file}: no entry with id "${id}"`);
  return found;
}
export const getStats = (id: string) => one(loadJson("stats.json", statsSchema), id, "stats.json").items;
export const getExample = (id: string) => one(loadJson("examples.json", exampleSchema), id, "examples.json");
export const getList = (id: string) => one(loadJson("lists.json", listSchema), id, "lists.json").items;
export function getFaqs(ids: string[]) {
  const all = loadJson("faqs.json", faqSchema);
  return ids.map((id) => one(all, id, "faqs.json"));
}
export function bySlug<T>(list: Entry<T>[], slug: string, dir: string): Entry<T> {
  const found = list.find((x) => x.slug === slug);
  if (!found) throw new Error(`content/${dir}: no file named ${slug}.md`);
  return found;
}

const pageSchema = z.object({ title: z.string(), description: z.string() });
/** Simple text pages (privacy, terms) from content/pages/<slug>.md. */
export const getTextPage = (slug: string) => bySlug(loadMarkdown("pages", pageSchema), slug, "pages");
