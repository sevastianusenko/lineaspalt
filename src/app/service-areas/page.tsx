import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, PageHero, SectionHead, TownSigns } from "@/components/ui";
import { towns } from "@/content/towns";

export const metadata: Metadata = {
  title: { absolute: "Service Areas: Lancaster County, PA and Nearby" },
  description:
    "Where Lancaster Lines & Asphalt works: Lancaster, Lititz, Ephrata, Manheim, Mount Joy, Strasburg and about 40 miles around. Free estimates.",
  alternates: { canonical: "/service-areas/" },
};

const more = ["Marietta", "Mountville", "Landisville", "East Petersburg", "Brownstown", "Intercourse", "Paradise", "Rothsville", "Christiana", "Refton", "Terre Hill", "Reinholds", "Adamstown", "Bowmansville", "Gordonville", "Smoketown"];

export default function Areas() {
  const core = towns.filter((t) => t.tier === "core");
  const ext = towns.filter((t) => t.tier === "extended");
  return (
    <>
      <Breadcrumbs items={[{ name: "Service areas", href: "/service-areas/" }]} />
      <PageHero
        kicker="Where we work"
        title="Serving Lancaster County and 40 miles around"
        lead="Driveways, parking lots and floors from the Susquehanna to the Berks line. Pick your town for local details, or call and we will tell you if we cover you."
        image="driveway-sealcoat-wide-apron"
      >
        <a href="tel:+17178081600" className="btn btn-paint">Call 717-808-1600</a>
      </PageHero>

      <section className="sec-dark grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="Lancaster County" title={<>Town pages with <span className="text-paint">local details.</span></>} />
          <div className="reveal mt-10"><TownSigns items={core.map((t) => ({ name: t.name, href: t.path }))} /></div>
          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {core.map((t) => (
              <Link key={t.slug} href={t.path} className="reveal group bg-asphalt-900 p-7 transition-colors hover:bg-asphalt-800">
                <span className="stencil text-[14px] tracking-[0.16em] text-paint">{t.area}</span>
                <span className="mt-1 block font-display text-[38px] font-extrabold uppercase leading-none group-hover:text-paint">{t.name}, PA</span>
                <span className="mt-3 block text-[16px] text-asphalt-300">{t.corridor === "the Ephrata area" || t.corridor === "the Susquehanna riverfront" ? `Near ${t.corridor.replace("the ", "")}` : `${t.corridor} corridor`}. Sealcoating, striping, crack filling and pothole repair.</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-light grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="Commercial jobs farther out" title={<>Lebanon, Berks &amp; <span className="text-[#8a5c00]">York.</span></>} lead="For larger commercial and industrial jobs, such as plaza re-striping, new lot layouts and warehouse floors, we travel beyond Lancaster County." />
          <div className="reveal mt-10"><TownSigns items={ext.map((t) => ({ name: t.name, href: t.path }))} /></div>
        </div>
      </section>

      <section className="sec-deep grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="Also serving" title={<>More <span className="text-paint">communities.</span></>} lead="These towns do not have their own page yet, but they are inside our regular service area. Call or send the form and we will schedule a free estimate." />
          <div className="reveal mt-10"><TownSigns items={more.map((n) => ({ name: n }))} dim /></div>
        </div>
      </section>

      <CtaBand title="Not sure if we cover you?" text="Tell us the address. If it is inside our area we will schedule a visit, and if not we will say so." />
    </>
  );
}
