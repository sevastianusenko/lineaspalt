"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Mode = "seal" | "stripe" | "crack" | "pothole";

const modes: { key: Mode; label: string; unit: string; placeholder: string; def: number }[] = [
  { key: "seal", label: "Sealcoating", unit: "square feet", placeholder: "1200", def: 1200 },
  { key: "stripe", label: "Re-striping", unit: "parking stalls", placeholder: "30", def: 30 },
  { key: "crack", label: "Crack filling", unit: "linear feet of crack", placeholder: "150", def: 150 },
  { key: "pothole", label: "Pothole repair", unit: "potholes", placeholder: "2", def: 2 },
];

const MIN = 400;
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function estimate(mode: Mode, n: number): { low: number; high: number; note: string } {
  if (!n || n <= 0) return { low: 0, high: 0, note: "" };
  if (mode === "seal") {
    if (n <= 800) return { low: MIN, high: MIN, note: "Small driveways land on our $400 minimum." };
    if (n <= 1500) return { low: 400, high: 550, note: "Average two-car driveway range." };
    if (n <= 2500) return { low: 550, high: 700, note: "Large driveway range. Long runs and turnarounds push toward the top." };
    return { low: 700, high: Math.round((n / 2500) * 700 + 100), note: "Extra large surfaces are quoted individually after a visit." };
  }
  if (mode === "stripe") {
    const low = Math.max(MIN, n * 4);
    const high = Math.max(MIN, n * 6);
    return { low, high, note: "Re-striping over existing lines. Stencils, ADA symbols ($25 to $45 each) and arrows ($15 to $30 each) are added on top. A brand new layout runs $8 to $12 per stall." };
  }
  if (mode === "crack") {
    const low = Math.max(MIN, n * 1);
    const high = Math.max(MIN, n * 3);
    return { low, high, note: "Hot pour sealing runs $1 to $3 per linear foot depending on width and prep." };
  }
  if (n <= 3) return { low: 400, high: 800, note: "One to three typical potholes." };
  return { low: 800, high: 2500, note: "Multiple holes, often with base damage. Depth and base condition drive the price more than width does." };
}

export default function PriceCalc() {
  const [mode, setMode] = useState<Mode>("seal");
  const m = modes.find((x) => x.key === mode)!;
  const [vals, setVals] = useState<Record<Mode, string>>({ seal: "1200", stripe: "30", crack: "150", pothole: "2" });
  const n = Number(vals[mode]);
  const est = useMemo(() => estimate(mode, n), [mode, n]);

  return (
    <div className="chamfer bg-asphalt-800 p-6 sm:p-9">
      <p className="stencil text-[15px] tracking-[0.16em] text-paint">Quick price check</p>
      <h3 className="mt-2 text-[34px] sm:text-[42px]">What will it roughly cost?</h3>

      <div role="tablist" aria-label="Service" className="mt-6 flex flex-wrap gap-2">
        {modes.map((x) => (
          <button
            key={x.key}
            role="tab"
            aria-selected={mode === x.key}
            onClick={() => setMode(x.key)}
            className={`shrink-0 px-4 py-2.5 font-display text-[18px] font-bold uppercase tracking-[0.05em] transition-colors ${mode === x.key ? "bg-paint text-black" : "bg-asphalt-700 text-line hover:bg-asphalt-600"}`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6">
        <div>
          <label htmlFor="pc-n" className="lbl">How many {m.unit}?</label>
          <input
            id="pc-n"
            inputMode="numeric"
            className="field !text-[26px] font-bold"
            value={vals[mode]}
            placeholder={m.placeholder}
            onChange={(e) => setVals((v) => ({ ...v, [mode]: e.target.value.replace(/[^\d]/g, "") }))}
          />
          {mode === "seal" && <p className="mt-2 text-[14px] text-asphalt-300">Tip: length times width. A 20 ft by 60 ft driveway is 1,200 sq ft.</p>}
        </div>
        <div aria-live="polite">
          <p className="lbl !mb-1">Typical range</p>
          <p className="font-display text-[clamp(52px,8vw,76px)] font-extrabold leading-none text-paint">
            {est.low ? (est.low === est.high ? money(est.low) : `${money(est.low)} to ${money(est.high)}`) : "$0"}
          </p>
        </div>
      </div>

      <p className="mt-5 text-[16px] text-asphalt-300">{est.note}</p>
      <div className="dash-line mt-6 opacity-70" aria-hidden />
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link href="/contact/" className="btn btn-paint">Get an exact quote</Link>
        <p className="text-[14px] text-asphalt-300">A planning range, not a quote. Our minimum job is $400. Final price comes after we see the job.</p>
      </div>
    </div>
  );
}
