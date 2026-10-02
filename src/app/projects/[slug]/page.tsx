import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/ProjectPage";
import { getProject, getProjects } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: { absolute: p.seoTitle },
    description: p.description,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: {
      title: p.seoTitle,
      description: p.description,
      url: `/projects/${p.slug}/`,
      type: "article",
      publishedTime: p.date,
      images: [{ url: `/og/${p.hero}.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return <ProjectPage p={p} />;
}
