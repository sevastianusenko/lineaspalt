import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, PageHero, Photo, SectionHead, TownChips } from "@/components/ui";
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
        eyebrow="Where we work"
        title={<>Serving Lancaster County and <mark className="hl">40 miles around</mark></>}
        lead="Driveways, parking lots and floors from the Susquehanna to the Berks line. Pick your town for local details, or call and we will tell you if we cover you."
        image="driveway-sealcoat-wide-apron"
      >
        <a href="tel:+17178081600" className="btn btn-yellow">Call 717-808-1600</a>
      </PageHero>

      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Lancaster County" title="Town pages with local details" />
          <div className="reveal mt-10"><TownChips items={core.map((t) => ({ name: t.name, href: t.path }))} /></div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {core.map((t, i) => (
              <Link key={t.slug} href={t.path} className="card reveal overflow-hidden" style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
                <span className="block aspect-[16/9] overflow-hidden bg-grey-2">
                  <Photo slug={t.photo} small className="h-full w-full object-cover" />
                </span>
                <span className="block p-6">
                  <span className="block text-[13px] text-faint">{t.area}</span>
                  <span className="mt-1 block font-display text-[24px] font-bold text-black">{t.name}, PA</span>
                  <span className="mt-2 block text-[15px] text-muted">Sealcoating, striping, crack filling and pothole repair.</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Commercial jobs farther out" title="Lebanon, Berks and York" lead="For larger commercial and industrial jobs, such as plaza re-striping, new lot layouts and warehouse floors, we travel beyond Lancaster County." />
          <div className="reveal mt-10"><TownChips items={ext.map((t) => ({ name: t.name, href: t.path }))} /></div>
        </div>
      </section>

      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Also serving" title="More communities" lead="These towns do not have their own page yet, but they are inside our regular service area. Call or send the form and we will schedule a free estimate." />
          <div className="reveal mt-10"><TownChips items={more.map((n) => ({ name: n }))} /></div>
        </div>
      </section>

      <CtaBand title="Not sure if we cover you?" text="Tell us the address. If it is inside our area we will schedule a visit, and if not we will say so." />
    </>
  );
}
