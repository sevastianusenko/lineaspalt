import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the Lancaster Lines & Asphalt website, and how estimates and price ranges on this site work.",
  alternates: { canonical: "/terms/" },
};

export default function Terms() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Terms", href: "/terms/" }]} />
      <section className="sec py-14 lg:py-20">
        <div className="wrap-narrow">
          <h1 className="text-[clamp(32px,4.4vw,54px)]">Terms of use</h1>
          <p className="mt-3 text-muted">Last updated: October 1, 2026</p>
          <div className="prose mt-8">
            <p>These terms cover the use of this website, operated by {site.legalName}. By using the site you agree to them.</p>
            <h2>Estimates</h2>
            <p>
              Information on this website is not a quote or an offer. We give a firm written price after we look at your property or photos of it.
            </p>
            <h2>Written agreements</h2>
            <p>
              Work is done under a written quote or agreement that states the scope, the price and the payment terms. Where Pennsylvania law requires a written contract for residential work, we provide one. If anything on this site conflicts with your signed agreement, the agreement controls.
            </p>
            <h2>Information on this site</h2>
            <p>
              Articles and guides are general information based on our experience in Lancaster County. They are not engineering, legal or code advice. Requirements for accessible parking, fire lanes and signage depend on your property and municipality, so confirm them with your local authority.
            </p>
            <h2>Reviews</h2>
            <p>Customer reviews shown on this site are public reviews that customers posted on Google.</p>
            <h2>Links and videos</h2>
            <p>This site links to third-party sites and embeds some videos. We do not control those sites and are not responsible for their content.</p>
            <h2>Limitation</h2>
            <p>
              We try to keep this site accurate, but we provide it as is. To the extent allowed by law, we are not liable for losses that result from relying on the general information published here.
            </p>
            <h2>Contact</h2>
            <p>
              Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a> or <a href={`tel:${site.phoneTel}`}>{site.phone}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
