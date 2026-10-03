import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      // Old WordPress (2022 to 2026) URLs that changed or were merged.
      { source: "/parking-lot-painting-striping-in-lancaster-pa/", destination: "/parking-lot-striping-lancaster-pa/", permanent: true },
      { source: "/contact-us/", destination: "/contact/", permanent: true },
      { source: "/pricing/", destination: "/services/", permanent: true },
      { source: "/ada-parking-lot-requirements/", destination: "/ada-parking-compliance-pennsylvania/", permanent: true },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/post-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/category-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/local-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/locations.kml", destination: "/sitemap.xml", permanent: true },
      { source: "/feed/", destination: "/blog/", permanent: true },
      { source: "/comments/feed/", destination: "/blog/", permanent: true },
      { source: "/blog/page/:n/", destination: "/blog/", permanent: true },
      { source: "/category/:path*", destination: "/blog/", permanent: true },
      { source: "/author/:path*", destination: "/about/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/wp-content/:path*", destination: "/", permanent: false },
      { source: "/wp-json/:path*", destination: "/", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/img/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
