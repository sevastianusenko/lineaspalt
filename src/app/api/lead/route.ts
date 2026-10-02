import { NextResponse } from "next/server";

export const runtime = "nodejs";

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  // Honeypot: bots fill this in, humans never see it.
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const town = clean(body.town, 120);
  const service = clean(body.service, 120);
  const message = clean(body.message, 4000);

  if (!name || !phone || !town) {
    return NextResponse.json({ error: "Please add your name, phone and town." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Please enter a phone number with area code." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO || "contact@linesasphalt.com";
  const from = process.env.LEAD_FROM || "Lines & Asphalt Website <onboarding@resend.dev>";

  const html = `<h2>New quote request</h2>
<p><b>Name:</b> ${esc(name)}<br><b>Phone:</b> ${esc(phone)}<br><b>Email:</b> ${esc(email) || "(none)"}<br><b>Town:</b> ${esc(town)}<br><b>Service:</b> ${esc(service) || "(not chosen)"}</p>
<p><b>Message:</b><br>${esc(message).replace(/\n/g, "<br>") || "(none)"}</p>`;

  if (!key) {
    console.log("[lead] RESEND_API_KEY not set. Lead:", { name, phone, email, town, service, message });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email || undefined,
      subject: `New quote request: ${service || "asphalt"} in ${town}`,
      html,
    }),
  });
  if (!res.ok) {
    console.error("[lead] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "We could not send your request just now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered: true });
}
