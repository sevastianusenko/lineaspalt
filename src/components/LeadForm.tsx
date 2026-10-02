"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const serviceOptions = [
  "Line striping",
  "Parking lot striping",
  "ADA markings",
  "Fire lane marking",
  "Warehouse floor marking",
  "Sealcoating (commercial)",
  "Driveway sealcoating",
  "Crack filling",
  "Pothole repair",
  "Parking lot maintenance plan",
  "Not sure yet",
];

export default function LeadForm({ defaultService = "", compact = false }: { defaultService?: string; compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErr("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/lead/", { method: "POST", body: JSON.stringify(Object.fromEntries(fd)), headers: { "Content-Type": "application/json" } });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Something went wrong.");
      setState("done");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="border-t-4 border-yellow bg-grey p-8" role="status">
        <p className="eyebrow">Request received</p>
        <h3 className="mt-3 text-[26px]">Thanks. We will call you soon.</h3>
        <p className="mt-3 text-muted">
          We reply to every request within one business day. If it is urgent, call{" "}
          <a href={`tel:${site.phoneTel}`} className="font-bold text-black underline underline-offset-4">{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="lbl" htmlFor="lf-name">Name</label>
          <input id="lf-name" name="name" required autoComplete="name" className="field" placeholder="Your name" />
        </div>
        <div>
          <label className="lbl" htmlFor="lf-phone">Phone</label>
          <input id="lf-phone" name="phone" type="tel" required autoComplete="tel" className="field" placeholder="717-555-0100" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="lbl" htmlFor="lf-email">Email (optional)</label>
          <input id="lf-email" name="email" type="email" autoComplete="email" className="field" placeholder="you@example.com" />
        </div>
        <div>
          <label className="lbl" htmlFor="lf-town">Town or ZIP</label>
          <input id="lf-town" name="town" required className="field" placeholder="Lititz, PA" />
        </div>
      </div>
      <div>
        <label className="lbl" htmlFor="lf-service">What do you need?</label>
        <select id="lf-service" name="service" className="field" defaultValue={defaultService || ""} required>
          <option value="" disabled>Select a service</option>
          {serviceOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      {!compact && (
        <div>
          <label className="lbl" htmlFor="lf-msg">Tell us about the job</label>
          <textarea id="lf-msg" name="message" rows={4} className="field" placeholder="Size, what you see, when you would like it done. Photos help: reply to our call or text with pictures." />
        </div>
      )}
      {/* honeypot */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>Leave this empty<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-yellow" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "Submit request"}
        </button>
        <span className="text-[14px] text-faint">Free estimate. No obligation. Reply within one business day.</span>
      </div>
      {state === "error" && (
        <p role="alert" className="text-[16px] text-[#b3261e]">
          {err} You can also call us at <a className="underline" href={`tel:${site.phoneTel}`}>{site.phone}</a>.
        </p>
      )}
    </form>
  );
}
