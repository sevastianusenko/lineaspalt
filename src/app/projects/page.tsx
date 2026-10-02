import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, PageHero, Photo, ProjectCard, SectionHead } from "@/components/ui";
import { getProjects } from "@/lib/projects";
import { allImages } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Our Work: Striping, Sealcoating & Crack Sealing Projects | Lines & Asphalt" },
  description:
    "Real Lancaster Lines & Asphalt jobs, written up with photos: warehouse floor marking, shopping plaza re-striping, overnight ADA striping, hot pour crack sealing and driveway sealcoating.",
  alternates: { canonical: "/projects/" },
};

export default function Projects() {
  const projects = getProjects();
  const [first, ...rest] = projects;
  return (
    <>
      <Breadcrumbs items={[{ name: "Our work", href: "/projects/" }]} />
      <PageHero
        eyebrow={`${site.name} projects`}
        title={<>Real jobs, <mark className="hl">start to finish</mark></>}
        lead="What the work actually involves: the property, the problem, how we did it and what the owner should expect afterward. Every photo is from the job it describes."
      >
        <div className="flex flex-wrap gap-4">
          <Link href="/gallery/" className="btn btn-outline">Photo gallery, {allImages().length} photos</Link>
          <Link href="/contact/" className="btn btn-yellow">Start your project</Link>
        </div>
      </PageHero>

      <section className="sec-grey py-16 lg:py-24">
        <div className="wrap">
          <Link href={`/projects/${first.slug}/`} className="card reveal grid overflow-hidden lg:grid-cols-[1.2fr_1fr]">
            <span className="block aspect-[16/10] overflow-hidden lg:aspect-auto">
              <Photo slug={first.hero} className="h-full w-full object-cover" />
            </span>
            <span className="flex flex-col justify-center p-7 sm:p-10">
              <span className="eyebrow">{[first.town, first.completed].filter(Boolean).join(" · ") || "Featured project"}</span>
              <span className="mt-4 block font-display text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.15] text-black">{first.title}</span>
              <span className="mt-4 block text-[16px] text-muted">{first.summary}</span>
              <span className="more mt-6">
                Read the project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </span>
          </Link>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <div key={p.slug} className="reveal" style={{ transitionDelay: `${(i % 3) * 70}ms` }}><ProjectCard p={p} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec py-16 lg:py-24">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHead eyebrow="More photos" title={<>{allImages().length} photos from <mark className="hl">{site.short}</mark> jobs</>} lead="Not every job gets a write up. The gallery has photos of striping, ADA stalls, sealcoating, crack filling and warehouse floors across Lancaster County and beyond." />
          <div className="reveal grid grid-cols-3 gap-3">
            {["church-lot-ada-hatched-stalls", "driveway-sealcoat-fall-tree", "reserved-stencil-night", "lot-arrows-white-center-line", "driveway-sealcoat-glossy-wet", "hot-pour-crack-sealing-crew"].map((s) => (
              <Link key={s} href="/gallery/" className="photo aspect-square block"><Photo slug={s} small className="transition-transform duration-500 hover:scale-105" /></Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want your lot or driveway to be the next one?" />
    </>
  );
}
