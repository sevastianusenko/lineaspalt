import Link from "next/link";
import { Breadcrumbs, CtaBand, Icon, Photo, ProjectCard } from "./ui";
import JsonLd from "./JsonLd";
import { getProjects, renderBodySegments, type Project } from "@/lib/projects-render";
import { bySlug } from "@/content/services";
import { abs, site } from "@/lib/site";
import { businessId } from "@/lib/schema";
import { readMinutes } from "@/lib/posts";

export default function ProjectPage({ p }: { p: Project }) {
  const segs = renderBodySegments(p.body);
  const svc = bySlug(p.service);
  const others = getProjects().filter((x) => x.slug !== p.slug).slice(0, 3);
  const url = abs(`/projects/${p.slug}/`);
  const rest = p.photos.filter((ph) => ph !== p.hero);

  return (
    <>
      <Breadcrumbs items={[{ name: "Our work", href: "/projects/" }, { name: p.title.length > 56 ? p.title.slice(0, 54) + "..." : p.title, href: `/projects/${p.slug}/` }]} />

      <header className="sec">
        <div className="wrap grid items-end gap-10 pb-10 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-14">
          <div>
            <p className="eyebrow rise">{site.name} project{p.town ? ` in ${p.town}` : ""}</p>
            <h1 className="rise mt-4 text-[clamp(32px,4.4vw,54px)]" style={{ animationDelay: "80ms" }}>{p.title}</h1>
            <p className="rise mt-6 max-w-2xl text-[19px] text-muted" style={{ animationDelay: "160ms" }}>{p.summary}</p>
            <p className="rise mt-5 text-[15px] text-faint" style={{ animationDelay: "200ms" }}>{readMinutes(p.words)} min read</p>
          </div>
          <dl className="rise card card-flat grid gap-0 p-6 sm:p-7" style={{ animationDelay: "220ms" }}>
            {svc && (
              <div className="mb-4 flex items-center gap-4 border-b border-border pb-4">
                <Icon name={svc.icon} size={56} />
                <div>
                  <dt className="text-[13px] text-faint">Service</dt>
                  <dd><Link href={`/${svc.slug}/`} className="font-display text-[18px] font-bold text-black hover:underline">{svc.name}</Link></dd>
                </div>
              </div>
            )}
            {p.facts.filter(([k]) => k !== "Service").map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-3 py-2 text-[15px]">
                <dt className="text-faint">{k}</dt>
                <dd className="text-black">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="wrap rise" style={{ animationDelay: "260ms" }}>
          <div className="photo aspect-[16/8]">
            <Photo slug={p.hero} priority />
          </div>
        </div>
      </header>

      <section className="sec py-12 lg:py-20">
        <div className="wrap-narrow">
          <article>
            {segs.map((s, i) =>
              s.type === "html" ? <div key={i} className="prose" dangerouslySetInnerHTML={{ __html: s.html }} /> : null,
            )}
          </article>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="sec-grey py-16 lg:py-20">
          <div className="wrap">
            <h2 className="reveal text-[clamp(26px,3vw,36px)]">Photos from this job</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {p.photos.map((ph, i) => (
                <div key={ph} className="reveal photo aspect-[4/3]" style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
                  <Photo slug={ph} small={i > 0} />
                </div>
              ))}
            </div>
            <p className="mt-6 text-[15px] text-muted">
              All photos are from this job. See more in <Link href="/gallery/" className="font-bold text-black underline decoration-yellow decoration-[3px] underline-offset-4">the full gallery</Link>.
            </p>
          </div>
        </section>
      )}

      <section className="sec py-16 lg:py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="reveal text-[clamp(26px,3vw,36px)]">More {site.short} projects</h2>
            <Link href="/projects/" className="btn btn-outline reveal">All projects</Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <div key={o.slug} className="reveal"><ProjectCard p={o} /></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={svc ? `Need ${svc.name.toLowerCase()} on your property?` : "Have a job like this?"} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.date,
          mainEntityOfPage: url,
          image: p.photos.map((ph) => abs(`/og/${ph}.jpg`)),
          author: { "@type": "Organization", "@id": businessId },
          publisher: { "@id": businessId },
          articleSection: "Projects",
          about: svc ? { "@type": "Service", name: svc.name, url: abs(`/${svc.slug}/`), provider: { "@id": businessId } } : undefined,
          contentLocation: p.town ? { "@type": "Place", name: p.town } : undefined,
          wordCount: p.words,
        }}
      />
    </>
  );
}
