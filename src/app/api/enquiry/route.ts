import { NextResponse } from "next/server";
import { formatEnquiry, validateEnquiry } from "@/lib/enquiry";

/**
 * Receives lead-form submissions.
 * Set ENQUIRY_WEBHOOK_URL (e.g. a Google Apps Script, Zapier, Make or CRM webhook) to deliver leads.
 * Without it, the client falls back to opening WhatsApp with the enquiry prefilled — no lead is lost.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const result = validateEnquiry(body);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: 422 });

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: true, delivered: false });

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...result.data, summary: formatEnquiry(result.data), receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    return NextResponse.json({ ok: true, delivered: res.ok });
  } catch {
    return NextResponse.json({ ok: true, delivered: false });
  }
}
