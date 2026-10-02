import { abs, site } from "./site";
import { towns } from "@/content/towns";
import { services } from "@/content/services";

const areaServed = [
  ...new Set(["Lancaster", ...towns.map((t) => t.name)]),
].map((name) => ({ "@type": "City", name: `${name}, PA` }));

export const businessId = `${site.url}/#business`;

const dayMap: Record<string, string[]> = {
  "Mon to Fri": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  Saturday: ["Saturday"],
  Sunday: ["Sunday"],
};
const to24 = (t: string) => {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return t;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
};

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": businessId,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.short,
    url: site.url,
    logo: abs("/img/logo-round.png"),
    image: [abs("/opengraph-image"), abs("/img/logo-round.png")],
    description:
      "Lancaster Lines & Asphalt is a locally owned asphalt contractor in Lancaster County, PA. Line striping, parking lot striping, ADA markings, sealcoating, crack filling and pothole repair for homeowners and commercial properties.",
    telephone: `+1-${site.phone}`,
    email: site.email,
    priceRange: "$$",
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.gbp.url,
    areaServed,
    serviceArea: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng }, geoRadius: 64374 },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMap[h.days] ?? h.days,
      opens: to24(h.open),
      closes: to24(h.close),
    })),
    sameAs: [site.gbp.url, site.social.facebook, site.social.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Asphalt maintenance and line striping services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: abs(`/${s.slug}/`) },
      })),
    },
  };
}

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { "@id": businessId },
  inLanguage: "en-US",
});
