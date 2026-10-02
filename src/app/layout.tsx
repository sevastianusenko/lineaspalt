import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Big_Shoulders_Stencil, Public_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallBar from "@/components/CallBar";
import RevealInit from "@/components/RevealInit";
import JsonLd from "@/components/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const display = Big_Shoulders({ subsets: ["latin"], variable: "--font-display", weight: "variable", axes: ["opsz"], display: "swap" });
const stencil = Big_Shoulders_Stencil({ subsets: ["latin"], variable: "--font-stencil", weight: ["700", "800"], display: "swap" });
const body = Public_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Asphalt Maintenance & Line Striping in Lancaster, PA | Lancaster Lines & Asphalt",
    template: "%s | Lancaster Lines & Asphalt",
  },
  description:
    "Line striping, sealcoating, crack filling and pothole repair in Lancaster, PA. Locally owned, rated 5.0 on Google. Free estimates, call 717-808-1600.",
  applicationName: site.name,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${stencil.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-paint focus:px-4 focus:py-2 focus:text-black">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CallBar />
        <RevealInit />
        <JsonLd data={businessSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
