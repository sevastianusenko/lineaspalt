import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, PageHero, Photo, PostCard } from "@/components/ui";
import { formatDate, getPosts, readMinutes } from "@/lib/posts";

export const metadata: Metadata = {
  title: { absolute: "Asphalt Blog: Sealcoating, Striping & Repair Guides | Lines & Asphalt" },
  description:
    "Plain-English guides from a Lancaster County asphalt crew: sealcoating, crack filling, potholes, striping, ADA rules and what each job costs.",
  alternates: { canonical: "/blog/" },
};

export default function Blog() {
  const posts = getPosts();
  const [first, ...rest] = posts;
  const cats = [...new Map(posts.map((p) => [p.category, p.categoryName])).entries()];
  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }]} />
      <PageHero
        eyebrow="The blog"
        title={<>Straight answers <mark className="hl">about asphalt</mark></>}
        lead="Guides from the Lancaster Lines & Asphalt crew: what sealcoating does, how crack filling works, what striping costs, and what ADA parking actually requires. No fluff."
        image="hot-pour-crack-sealing-crew"
      />
      <section className="sec-grey py-16 lg:py-24">
        <div className="wrap">
          <Link href={`/${first.slug}/`} className="card reveal grid overflow-hidden lg:grid-cols-[1.2fr_1fr]">
            <span className="block aspect-[16/10] overflow-hidden lg:aspect-auto">
              {first.image && <Photo slug={first.image} className="h-full w-full object-cover" />}
            </span>
            <span className="flex flex-col justify-center p-7 sm:p-10">
              <span className="eyebrow">Latest &middot; {first.categoryName}</span>
              <span className="mt-4 block font-display text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.15] text-black">{first.title}</span>
              <span className="mt-4 block text-[16px] text-muted">{first.description}</span>
              <span className="mt-5 block text-[14px] text-faint">{formatDate(first.date)} &middot; {readMinutes(first.words)} min read</span>
            </span>
          </Link>

          <nav aria-label="Topics" className="mt-12 flex flex-wrap gap-2">
            {cats.map(([k, n]) => (
              <a key={k} href={`#${k}`} className="chip">{n}</a>
            ))}
          </nav>

          {cats.map(([k, n]) => {
            const list = rest.filter((p) => p.category === k);
            if (!list.length) return null;
            return (
              <div key={k} id={k} className="mt-16">
                <h2 className="reveal text-[clamp(26px,3vw,36px)]">{n}</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((p) => (
                    <div key={p.slug} className="reveal"><PostCard p={p} /></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
