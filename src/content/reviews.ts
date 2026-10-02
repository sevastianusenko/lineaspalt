export type Review = { name: string; text: string; job: string; date: string };

// Public Google reviews of Lancaster Lines & Asphalt. Texts verbatim, pulled from the Google
// review feed the old site stored (Trustindex, synced March 2026). The profile has 12 ratings,
// 10 of them with text; the two rating-only reviews have nothing to show.
export const reviews: Review[] = [
  {
    name: "Jerry Melnik",
    job: "Asphalt services",
    date: "2025-12-05",
    text: "Fast and easy service. Thank you!",
  },
  {
    name: "Sviatoslav Koval",
    job: "Asphalt services",
    date: "2025-12-02",
    text: "Ruvim, is very diligent, honest man that will get the job done well.",
  },
  {
    name: "Andrew Dariychuk",
    job: "Asphalt services",
    date: "2025-11-26",
    text: "What an outstanding experience with Lancaster's Lines & Asphalt! From start to finish, he was professional, efficient, and highly skilled. The pricing was very reasonable, and the service exceeded my expectations. He was punctual, completed the job quickly, and the quality of their work is top-notch. I highly recommend him for anyone looking for reliable asphalt services at a great price. Definitely five stars!",
  },
  {
    name: "Steele Broderick",
    job: "Superior Homes, line striping",
    date: "2025-11-25",
    text: "We are so happy with our new lines at Superior Homes. We are very happy with the professional guidance and smooth install process.",
  },
  {
    name: "Ray Peifer",
    job: "Asphalt services",
    date: "2025-11-25",
    text: "Awesome job, thank you. Would definitely use again!",
  },
  {
    name: "Bryan Weaver",
    job: "Office parking lot striping",
    date: "2025-11-25",
    text: "Ruvim came out to put lines on my parking lot at the office and everything was smooth sailing from the second I called him. Clean lines, reasonably priced, and a quick turnaround to get the work completed. I was very happy I had called Lancaster Lines and Asphalt.",
  },
  {
    name: "Max Reznik",
    job: "Driveway resealing",
    date: "2025-11-25",
    text: "Lancaster Lines & Asphalt did an outstanding job resealing my driveway. Ruvim was very professional and on time. This was the best company I have dealt with before with reasonable prices and quality work!",
  },
  {
    name: "Trent Petersheim",
    job: "Driveway resealing",
    date: "2025-11-24",
    text: "Ruvium did a phenomenal job re-sealing my driveway. The quality was unmatched. The price was competitive and the experience was phenomenal.",
  },
  {
    name: "Christian Miller",
    job: "Asphalt repair and lines",
    date: "2025-11-24",
    text: "Ruvim did a beautiful job on my property. Very thorough asphalt repair, as well as made my lines good as new. Highly recommend him and his team.",
  },
  {
    name: "kylie weaver",
    job: "Quotes and communication",
    date: "2025-11-24",
    text: "Lancaster Lines & Asphalt is the best in the business!!! Hard workers that get the job done exactly how you want it! Ruvim is always getting quotes out on time and responding to your calls in a timely manner!",
  },
];

// Longest, most specific reviews first for the home page; the full list keeps Google's order.
export const featured: Review[] = [
  reviews[2], // Andrew
  reviews[5], // Bryan
  reviews[6], // Max
  reviews[3], // Steele
  reviews[7], // Trent
  reviews[8], // Christian
];

export const reviewMonth = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", timeZone: "UTC" });
