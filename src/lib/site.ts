export const site = {
  name: "Lancaster Lines & Asphalt",
  legalName: "Lancaster Lines & Asphalt LLC",
  short: "Lines & Asphalt",
  tagline: "Professional asphalt maintenance and line striping services. Locally owned. Quality guaranteed.",
  category: "Asphalt contractor",
  url: "https://linesasphalt.com",
  phone: "717-808-1600",
  phoneTel: "+17178081600",
  email: "contact@linesasphalt.com",
  owner: "Ruvim",
  region: "Lancaster County, PA",
  // Address as published on the Google Business Profile (NAP must match it).
  address: {
    street: "150 E Main St",
    locality: "Strasburg",
    state: "PA",
    postalCode: "17579",
    line: "150 E Main St, Strasburg, PA 17579",
  },
  geo: { lat: 39.9820543, lng: -76.1717022 },
  hours: [
    { days: "Mon to Fri", open: "8:00 AM", close: "5:00 PM" },
  ],
  // Google Business Profile (cid from the profile link the client shared).
  gbp: {
    cid: "10068187502945296993",
    url: "https://www.google.com/maps?cid=10068187502945296993",
    reviewUrl:
      "https://www.google.com/search?q=Lancaster+Lines+%26+Asphalt+Strasburg+PA&ludocid=10068187502945296993#lrd=0x4391ccebe38decb7:0x8bb96330bd14e261,3",
  },
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
