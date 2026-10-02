import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TownPage from "@/components/TownPage";
import { towns } from "@/content/towns";
import { townTitle, townDescription } from "@/lib/seo";

export const dynamicParams = false;

const nested = towns.filter((t) => t.path.startsWith("/service-areas/"));
const find = (param: string) => nested.find((t) => t.path === `/service-areas/${param}/`);

export function generateStaticParams() {
  return nested.map((t) => ({ town: t.path.split("/")[2] }));
}

export async function generateMetadata({ params }: { params: Promise<{ town: string }> }): Promise<Metadata> {
  const { town } = await params;
  const t = find(town);
  if (!t) return {};
  const title = t.tier === "extended" ? townTitle(t.name, true) : townTitle(t.name);
  const description = t.tier === "extended" ? townDescription(t.name, true) : townDescription(t.name);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: t.path },
    openGraph: { title, description, url: t.path, type: "website", images: [{ url: `/og/${t.photo}.jpg`, width: 1200, height: 630 }] },
  };
}

export default async function Page({ params }: { params: Promise<{ town: string }> }) {
  const { town } = await params;
  const t = find(town);
  if (!t) notFound();
  return <TownPage t={t} />;
}
