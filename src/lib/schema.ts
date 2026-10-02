import { abs, site } from "./site";
import { towns } from "@/content/towns";
import { services } from "@/content/services";

const areaServed = [
  ...new Set(["Lancaster", ...towns.map((t) => t.name)]),
].map((name) => ({ "@type": "City", name: `${name}, PA` }));

export const businessId = `${site.url}/#business`;

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": businessId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: abs("/img/logo-mark.png"),
    image: abs("/opengraph-image"),
    description:
      "Locally owned asphalt maintenance company in Lancaster County, PA. Line striping, parking lot striping, ADA markings, sealcoating, crack filling and pothole repair for homeowners and commercial properties.",
    telephone: `+1-${site.phone}`,
    email: site.email,
    priceRange: "$$",
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.owner },
    address: { "@type": "PostalAddress", addressLocality: site.locality, addressRegion: site.state, postalCode: site.postalCode, addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed,
    serviceArea: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng }, geoRadius: 64374 },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
    ],
    sameAs: [site.social.facebook, site.social.instagram],
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
