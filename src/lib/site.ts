export const site = {
  name: "Lancaster Lines & Asphalt",
  legalName: "Lancaster Lines & Asphalt LLC",
  short: "Lines & Asphalt",
  url: "https://linesasphalt.com",
  phone: "717-808-1600",
  phoneTel: "+17178081600",
  email: "contact@linesasphalt.com",
  owner: "Ruvim",
  region: "Lancaster County, PA",
  // Service-area business. The street address is intentionally not shown on the site.
  locality: "Strasburg",
  state: "PA",
  postalCode: "17579",
  geo: { lat: 40.037875, lng: -76.305514 },
  hours: [
    { days: "Mon to Fri", open: "8:00 AM", close: "6:00 PM" },
    { days: "Saturday", open: "9:00 AM", close: "2:00 PM" },
  ],
  social: {
    facebook: "https://www.facebook.com/linesasphalt",
    instagram: "https://www.instagram.com/linesasphalt",
  },
  rating: { value: "5.0", count: 12 },
  minJob: 400,
  founded: 2024,
};

export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/gallery/", label: "Our Work" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/service-areas/", label: "Areas" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
];

export const abs = (path: string) => `${site.url}${path}`;
