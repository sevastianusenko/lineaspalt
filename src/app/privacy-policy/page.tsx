import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lancaster Lines & Asphalt handles the information you send through this website.",
  alternates: { canonical: "/privacy-policy/" },
};

export default function Privacy() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy policy", href: "/privacy-policy/" }]} />
      <section className="sec-dark grain py-14 lg:py-20">
        <div className="wrap-narrow">
          <h1 className="text-[clamp(44px,7vw,84px)]">Privacy policy</h1>
          <p className="mt-3 text-asphalt-300">Last updated: October 1, 2026</p>
          <div className="prose mt-8">
            <p>
              This policy explains what {site.legalName} does with information you send us through this website. We are a small local contractor, and we keep it simple.
            </p>
            <h2>What we collect</h2>
            <p>
              When you use the quote form, we receive the details you type in: your name, phone number, town, the service you are interested in, and any message or email address you choose to add. If you call or email us, we receive whatever you share.
            </p>
            <h2>How we use it</h2>
            <p>
              We use your details to reply to your request, to visit the property, and to prepare a quote. We do not sell your information, and we do not share it for advertising.
            </p>
            <h2>Who handles it</h2>
            <p>
              The quote form is delivered to us by email through a transactional email service. Our website is hosted by a third-party hosting provider. Those providers process the data only to deliver the service to us.
            </p>
            <h2>Cookies and tracking</h2>
            <p>
              This website does not use advertising cookies or analytics trackers. Videos on some blog posts load from YouTube only after you press play, and YouTube then handles that request under its own policy.
            </p>
            <h2>How long we keep it</h2>
            <p>
              We keep quote requests and job records for as long as we need them to do the work, answer questions about it, and meet our own business and tax record requirements.
            </p>
            <h2>Your choices</h2>
            <p>
              You can ask us to correct or delete the details you sent us by emailing <a href={`mailto:${site.email}`}>{site.email}</a> or calling <a href={`tel:${site.phoneTel}`}>{site.phone}</a>.
            </p>
            <h2>Children</h2>
            <p>This website is meant for property owners and managers and is not directed at children.</p>
            <h2>Changes</h2>
            <p>If we change how we handle information, we will update this page and the date above.</p>
            <h2>Contact</h2>
            <p>
              {site.legalName}, {site.region}. Phone <a href={`tel:${site.phoneTel}`}>{site.phone}</a>. Email <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
