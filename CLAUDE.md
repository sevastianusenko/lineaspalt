# Lancaster Lines & Asphalt site

See README.md for structure and scripts.

## Design (do not drift)

The client's own look, carried over from the old WordPress site: white background, light grey (#f4f4f2) alternating sections, one black band (core services) and black CTA bands, yellow #ffcd05 as the only accent (active menu item block, buttons, `mark.hl` highlight behind a key word, yellow circle in the hero). Sen bold for headings, Public Sans for body. Photos with 16px rounded corners, white cards with 1px border. Buttons: yellow fill, black fill, black outline.
Icons are the client's: `public/icons/*.png` built by `scripts/icons.mjs` from source-media (striper, sealing, coating, repair = the 4-icon composite; lot, fire-lane, ada, crack, striper-solid, shovel-solid = the yellow silhouettes). Each service has an `icon` field in services.ts. Do not swap in generic icon fonts.
Rejected on 2026-10-02: a dark "asphalt" theme with Big Shoulders stencil type. User said it was too dark and cramped.

## Facts that need the client

- Phone: 717-808-1600 used everywhere. Old site also had (717) 454-9931 in schema and some pages. Confirm which is real.
- Email: contact@linesasphalt.com (old schema had info@ too).
- Address: not shown (service-area business). Old schema listed 150 E Main St, Strasburg PA 17579; schema here carries locality/zip only.
- Hours Mon to Fri 8 to 6, Sat 9 to 2 came from the old schema. Unverified.
- PA Home Improvement Contractor registration number: not on the site. HICPA expects it in advertising for home improvement work. Add to footer + schema when known.
- "Fully insured" comes from the old site. Insurance details not verified.
- Socials: facebook.com/linesasphalt and instagram.com/linesasphalt from the old schema, not verified.
- 12 Google reviews / 5.0 from the old Trustindex widget. 10 review texts are shown.

## Deploy checklist

1. Push to GitHub, create Vercel project.
2. Env: RESEND_API_KEY, LEAD_TO, LEAD_FROM (verified domain).
3. Move linesasphalt.com from Hostinger WordPress to Vercel; 301 map is in next.config.ts, check old URLs after DNS switch.
4. Search Console: submit /sitemap.xml, request indexing for home and service pages.
5. Google Business Profile: NAP must match the site.
6. Before the old WordPress is switched off: export Rank Math redirects if any.

## Not used from the supplied media

- `IMG_1646.MP4`, `IMG_1647.MP4` (44 MB) and the `.MOV` live-photo clips: no ffmpeg on this machine to compress them. Hero video is a possible next step.
- ChatGPT-made icons (`line.png`, `lot.png`, ...): low-res and off-brand next to the photos.
- HEIC photos 450x600 and `b34f...jpeg` 360x480: too small for full-width use.
