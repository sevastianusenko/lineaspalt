import Link from "next/link";
import { Breadcrumbs, CtaBand, Photo, PostCard } from "./ui";
import JsonLd from "./JsonLd";
import YouTube from "./YouTube";
import { getPosts, renderBody, formatDate, readMinutes, type Post } from "@/lib/posts";
import { abs, site } from "@/lib/site";
import { businessId } from "@/lib/schema";

export default function PostPage({ p }: { p: Post }) {
  const segs = renderBody(p.body);
  const toc: { id: string; text: string }[] = [];
  for (const s of segs) {
    if (s.type !== "html") continue;
    for (const m of s.html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)) {
      const text = m[2].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
      toc.push({ id: m[1], text });
    }
  }
  const related = getPosts()
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 3);
  const url = abs(`/${p.slug}/`);

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: p.title.length > 56 ? p.title.slice(0, 54) + "..." : p.title, href: `/${p.slug}/` }]} />

      <header className="sec">
        <div className="wrap-narrow pb-10 pt-10 lg:pt-14">
          <p className="eyebrow rise">{p.categoryName}</p>
          <h1 className="rise mt-5 text-[clamp(32px,4.4vw,54px)]" style={{ animationDelay: "80ms" }}>{p.title}</h1>
          <p className="rise mt-6 text-[16px] text-muted" style={{ animationDelay: "160ms" }}>
            By {site.owner}, owner of {site.name} &middot; {formatDate(p.date)}
            {p.modified && p.modified !== p.date ? <> &middot; Updated {formatDate(p.modified)}</> : null} &middot; {readMinutes(p.words)} min read
          </p>
        </div>
        {p.image && (
          <div className="wrap rise" style={{ animationDelay: "220ms" }}>
            <div className="photo aspect-[16/7]">
              <Photo slug={p.image} priority />
            </div>
          </div>
        )}
      </header>

      <section className="sec py-12 lg:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[260px_minmax(0,760px)] lg:justify-center lg:gap-16">
          <aside className="hidden lg:block">
            {toc.length > 2 && (
              <nav aria-label="On this page" className="sticky top-28">
                <p className="eyebrow mb-4 !text-[14px]">On this page</p>
                <ol className="grid gap-2 border-l-4 border-yellow pl-4 text-[14.5px] leading-snug">
                  {toc.map((h) => (
                    <li key={h.id}><a href={`#${h.id}`} className="text-muted hover:text-black">{h.text}</a></li>
                  ))}
                </ol>
                <div className="mt-8 border-t border-border pt-6">
                  <p className="font-display text-[18px] font-bold text-black">Need a quote?</p>
                  <a href={`tel:${site.phoneTel}`} className="mt-1 block font-display text-[22px] font-bold text-black hover:underline">{site.phone}</a>
                  <Link href="/contact/" className="btn btn-yellow btn-sm mt-4">Free quote</Link>
                </div>
              </nav>
            )}
          </aside>

          <article>
            {segs.map((s, i) => {
              if (s.type === "html") return <div key={i} className="prose" dangerouslySetInnerHTML={{ __html: s.html }} />;
              if (s.type === "youtube") return <YouTube key={i} id={s.id} title={s.title} />;
              return (
                <div key={i} className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {s.slugs.map((g) => (
                    <div key={g} className="photo aspect-[4/5]">
                      <Photo slug={g} small />
                    </div>
                  ))}
                </div>
              );
            })}

            <aside className="card card-flat mt-14 border-t-4 !border-t-yellow p-7 sm:p-9">
              <p className="eyebrow">Talk to {site.owner}</p>
              <h2 className="mt-3 text-[28px]">Have a surface you want looked at?</h2>
              <p className="mt-3 text-[16px] text-muted">
                We give free estimates across Lancaster County and a written price before any work starts. Our minimum job is ${site.minJob}.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/contact/" className="btn btn-yellow">Get a free quote</Link>
                <a href={`tel:${site.phoneTel}`} className="btn btn-outline">{site.phone}</a>
              </div>
            </aside>
          </article>
        </div>
      </section>

      <section className="sec-grey py-20 lg:py-24">
        <div className="wrap">
          <h2 className="reveal text-[clamp(28px,3.4vw,40px)]">More from the blog</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <div key={r.slug} className="reveal"><PostCard p={r} /></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.modified || p.date,
          mainEntityOfPage: url,
          image: p.image ? [abs(`/og/${p.image}.jpg`)] : undefined,
          author: { "@type": "Person", name: site.owner, worksFor: { "@id": businessId } },
          publisher: { "@id": businessId },
          articleSection: p.categoryName,
          wordCount: p.words,
        }}
      />
    </>
  );
}
