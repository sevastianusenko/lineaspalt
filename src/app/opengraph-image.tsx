import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "Lancaster Lines & Asphalt: line striping, sealcoating, crack filling in Lancaster, PA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const logo = fs.readFileSync(path.join(process.cwd(), "public", "img", "logo-mark.png"));
  const photo = fs.readFileSync(path.join(process.cwd(), "public", "img", "og-photo.jpg"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#08090a", color: "#f4f2ec", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 60px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={104} height={98} alt="" />
            <div style={{ display: "flex", flexDirection: "column", fontSize: 30, letterSpacing: 4, color: "#ffb400", fontWeight: 800 }}>
              <span>LANCASTER</span>
              <span style={{ color: "#f4f2ec", fontSize: 22, letterSpacing: 7 }}>LINES &amp; ASPHALT</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 92, fontWeight: 900, lineHeight: 0.95, textTransform: "uppercase", letterSpacing: -1 }}>Straight lines.</div>
            <div style={{ display: "flex", fontSize: 92, fontWeight: 900, lineHeight: 0.95, textTransform: "uppercase", color: "#ffb400", letterSpacing: -1 }}>Sealed surfaces.</div>
            <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#aeb4ba" }}>Line striping, sealcoating, crack filling, pothole repair</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", background: "#ffb400", color: "#000", padding: "12px 26px", fontSize: 34, fontWeight: 900 }}>717-808-1600</div>
            <div style={{ display: "flex", fontSize: 26, color: "#aeb4ba" }}>Lancaster County, PA &middot; Free estimates</div>
          </div>
        </div>
        <div style={{ display: "flex", width: 440, height: "100%", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} width={440} height={630} alt="" style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 10, background: "#ffb400", display: "flex" }} />
        </div>
      </div>
    ),
    size,
  );
}
