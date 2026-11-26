import TextPage from "@/components/TextPage";
import { getTextPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const { data } = getTextPage("terms");
export const metadata = pageMeta({ title: `${data.title} · GREAM Business Solutions`, description: data.description, path: "/terms" });

export default function Terms() {
  return <TextPage slug="terms" />;
}
