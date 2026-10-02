import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, PageHero, Photo, PostCard } from "@/components/ui";
import { formatDate, getPosts, readMinutes } from "@/lib/posts";

export const metadata: Metadata = {
  title: { absolute: "Asphalt Blog: Sealcoating, Striping & Repair Guides" },
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
        kicker="The blog"
        title="Straight answers about asphalt"
        lead="Guides from the crew: what sealcoating does, how crack filling works, what striping costs, and what ADA parking actually requires. No fluff."
        image="hot-pour-crack-sealing-crew"
      />
      <section className="sec-dark grain py-14 lg:py-20">
        <div className="wrap">
          <Link href={`/${first.slug}/`} className="reveal group grid overflow-hidden bg-asphalt-800 lg:grid-cols-[1.2fr_1fr]">
            <span className="block aspect-[16/10] overflow-hidden lg:aspect-auto">
              {first.image && <Photo slug={first.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
            </span>
            <span className="flex flex-col justify-center p-7 sm:p-10">
              <span className="stencil text-[15px] tracking-[0.16em] text-paint">Latest &middot; {first.categoryName}</span>
              <span className="mt-3 block font-display text-[clamp(34px,4.4vw,56px)] font-extrabold uppercase leading-[0.98] group-hover:text-paint">{first.title}</span>
              <span className="mt-4 block text-[18px] text-asphalt-300">{first.description}</span>
              <span className="mt-5 block text-[15px] text-asphalt-300">{formatDate(first.date)} &middot; {readMinutes(first.words)} min read</span>
            </span>
          </Link>

          <nav aria-label="Topics" className="mt-12 flex flex-wrap gap-2">
            {cats.map(([k, n]) => (
              <a key={k} href={`#${k}`} className="bg-asphalt-700 px-4 py-2.5 font-display text-[18px] font-bold uppercase tracking-[0.05em] hover:bg-paint hover:text-black">
                {n}
              </a>
            ))}
          </nav>

          {cats.map(([k, n]) => {
            const list = rest.filter((p) => p.category === k);
            if (!list.length) return null;
            return (
              <div key={k} id={k} className="mt-16">
                <h2 className="reveal text-[clamp(36px,5vw,60px)]"><span className="text-paint">{n}</span></h2>
                <div className="double-line reveal-line mt-4 max-w-xs" aria-hidden />
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
