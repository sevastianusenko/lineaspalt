import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "Lancaster Lines & Asphalt: line striping, sealcoating, crack filling in Lancaster, PA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const logo = fs.readFileSync(path.join(process.cwd(), "public", "img", "logo-horizontal.png"));
  const photo = fs.readFileSync(path.join(process.cwd(), "public", "img", "og-photo.jpg"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", color: "#0a0500", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 60px", width: 760 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={300} height={82} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1 }}>Asphalt maintenance</div>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1 }}>
              &amp;&nbsp;<span style={{ background: "#ffcd05", padding: "0 10px" }}>line striping</span>
            </div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 28, color: "#555" }}>Lancaster, PA. Sealcoating, crack filling, pothole repair.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", background: "#0a0500", color: "#fff", padding: "14px 26px", fontSize: 30, fontWeight: 800 }}>717-808-1600</div>
            <div style={{ display: "flex", fontSize: 24, color: "#555" }}>Free estimates &middot; 5.0 on Google</div>
          </div>
        </div>
        <div style={{ display: "flex", width: 440, height: "100%", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} width={440} height={630} alt="" style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 12, background: "#ffcd05", display: "flex" }} />
        </div>
      </div>
    ),
    size,
  );
}
