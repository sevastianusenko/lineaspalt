import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import TownPage from "@/components/TownPage";
import PostPage from "@/components/PostPage";
import { services, bySlug } from "@/content/services";
import { towns } from "@/content/towns";
import { getPost, getPosts } from "@/lib/posts";
import { townTitle, townDescription } from "@/lib/seo";

export const dynamicParams = false;

// Legacy WordPress town pages live at the site root (their URLs are kept for SEO).
const rootTowns = towns.filter((t) => t.path.split("/").filter(Boolean).length === 1);
const townFor = (slug: string) => rootTowns.find((t) => t.path === `/${slug}/`);

export function generateStaticParams() {
  return [
    ...services.map((s) => ({ slug: s.slug })),
    ...rootTowns.map((t) => ({ slug: t.path.replaceAll("/", "") })),
    ...getPosts().map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = bySlug(slug);
  if (s) {
    return {
      title: { absolute: s.metaTitle },
      description: s.metaDescription,
      alternates: { canonical: `/${s.slug}/` },
      openGraph: { title: s.metaTitle, description: s.metaDescription, url: `/${s.slug}/`, type: "website", images: [{ url: `/og/${s.hero}.jpg`, width: 1200, height: 630 }] },
    };
  }
  const t = townFor(slug);
  if (t) {
    const title = townTitle(t.name);
    const description = townDescription(t.name);
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: t.path },
      openGraph: { title, description, url: t.path, type: "website", images: [{ url: `/og/${t.photo}.jpg`, width: 1200, height: 630 }] },
    };
  }
  const p = getPost(slug);
  if (p) {
    return {
      title: { absolute: p.seoTitle },
      description: p.description,
      alternates: { canonical: `/${p.slug}/` },
      openGraph: {
        title: p.seoTitle,
        description: p.description,
        url: `/${p.slug}/`,
        type: "article",
        publishedTime: p.date,
        modifiedTime: p.modified,
        images: p.image ? [{ url: `/og/${p.image}.jpg`, width: 1200, height: 630 }] : undefined,
      },
    };
  }
  return {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = bySlug(slug);
  if (s) return <ServicePage s={s} />;
  const t = townFor(slug);
  if (t) return <TownPage t={t} />;
  const p = getPost(slug);
  if (p) return <PostPage p={p} />;
  notFound();
}
