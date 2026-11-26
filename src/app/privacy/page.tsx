import TextPage from "@/components/TextPage";
import { getTextPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const { data } = getTextPage("privacy");
export const metadata = pageMeta({ title: `${data.title} · GREAM Business Solutions`, description: data.description, path: "/privacy" });

export default function Privacy() {
  return <TextPage slug="privacy" />;
}
