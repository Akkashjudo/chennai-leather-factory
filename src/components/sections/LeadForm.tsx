"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { enquiryTypes, formatEnquiry, type Enquiry, type EnquiryType } from "@/lib/enquiry";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";
import { cn } from "../ui/cn";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "handoff"; href: string } | { kind: "error"; message: string };

const fieldCls =
  "peer w-full border-0 border-b border-ivory/25 bg-transparent px-0 pb-2.5 pt-6 text-base text-ivory placeholder-transparent transition-colors focus:border-tan focus:outline-none focus:ring-0";
const labelCls =
  "pointer-events-none absolute left-0 top-1.5 text-[0.72rem] uppercase tracking-[0.16em] text-ivory/50 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[0.72rem] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-tan";

export function LeadForm({
  defaultType = "wholesale",
  id = "enquiry",
  title = "Buying in Bulk or Building a Leather Brand?",
  lead = "Tell us what you need. Our team will get back to you to discuss products, quantities and pricing.",
}: {
  defaultType?: EnquiryType;
  id?: string;
  title?: string;
  lead?: string;
}) {
  const uid = useId();
  const [type, setType] = useState<EnquiryType>(defaultType);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const enquiry: Enquiry = {
      type,
      name: data.name ?? "",
      phone: data.phone ?? "",
      business: data.business,
      city: data.city,
      requirement: data.requirement,
      quantity: data.quantity,
      message: data.message,
    };
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...enquiry, website: data.website }),
      });
      const json = (await res.json()) as { ok: boolean; delivered?: boolean; error?: string };
      if (!json.ok) return setStatus({ kind: "error", message: json.error ?? "Something went wrong." });
      if (json.delivered) return setStatus({ kind: "sent" });
      setStatus({ kind: "handoff", href: whatsappLink(formatEnquiry(enquiry)) });
    } catch {
      setStatus({ kind: "handoff", href: whatsappLink(formatEnquiry(enquiry)) });
    }
  }

  return (
    <section id={id} aria-labelledby={`${uid}-title`} className="grain bg-charcoal py-24 text-ivory sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5 text-tan">Business enquiries</p>
          <h2 id={`${uid}-title`} className="display text-balance text-[2.4rem] sm:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-ivory/65">{lead}</p>

          <div className="mt-10 border-t border-ivory/10 pt-8">
            <p className="text-sm text-ivory/60">Faster on WhatsApp?</p>
            <a
              href={whatsappLink(type === "private-label" ? "privateLabel" : type === "custom" ? "custom" : "wholesale")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-12 items-center gap-2.5 bg-wa px-6 text-sm font-medium text-white transition-colors hover:bg-[#186540]"
            >
              <WhatsAppIcon className="size-5" /> Chat with our team
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {status.kind === "sent" || status.kind === "handoff" ? (
              <m.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[24rem] flex-col items-start justify-center border border-ivory/15 p-8 sm:p-12"
                role="status"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-tan text-ink">
                  <Check className="size-6" />
                </span>
                {status.kind === "sent" ? (
                  <>
                    <p className="mt-6 font-serif text-3xl">Thank you — enquiry received.</p>
                    <p className="mt-3 max-w-md text-ivory/65">Our team will contact you on the number you shared.</p>
                  </>
                ) : (
                  <>
                    <p className="mt-6 font-serif text-3xl">One last step.</p>
                    <p className="mt-3 max-w-md text-ivory/65">
                      Send your enquiry to our team on WhatsApp — all your details are already filled in.
                    </p>
                    <a
                      href={status.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex min-h-12 items-center gap-2.5 bg-wa px-6 text-sm font-medium text-white"
                    >
                      <WhatsAppIcon className="size-5" /> Send on WhatsApp
                    </a>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setStatus({ kind: "idle" })}
                  className="mt-6 text-sm text-ivory/50 underline-offset-4 hover:underline"
                >
                  Make another enquiry
                </button>
              </m.div>
            ) : (
              <m.form key="form" onSubmit={onSubmit} initial={false} exit={{ opacity: 0 }} noValidate={false}>
                <fieldset>
                  <legend className="mb-4 text-[0.72rem] uppercase tracking-[0.16em] text-ivory/50">I&rsquo;m enquiring about</legend>
                  <div className="flex flex-wrap gap-2">
                    {enquiryTypes.map((t) => (
                      <label
                        key={t.value}
                        className={cn(
                          "flex min-h-11 cursor-pointer items-center border px-4 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-tan",
                          type === t.value ? "border-tan bg-tan text-ink" : "border-ivory/20 text-ivory/80 hover:border-ivory/50",
                        )}
                      >
                        <input
                          type="radio"
                          name="type"
                          value={t.value}
                          checked={type === t.value}
                          onChange={() => setType(t.value)}
                          className="sr-only"
                        />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  <Field name="name" label="Name" required autoComplete="name" />
                  <Field name="phone" label="Phone" type="tel" required autoComplete="tel" inputMode="tel" />
                  <Field name="business" label="Business name" autoComplete="organization" />
                  <Field name="city" label="City" autoComplete="address-level2" />
                  <Field name="requirement" label="Requirement (e.g. jackets, wallets)" />
                  <Field name="quantity" label="Approximate quantity" />
                  <div className="relative sm:col-span-2">
                    <textarea
                      id={`${uid}-message`}
                      name="message"
                      rows={3}
                      placeholder="Message"
                      className={cn(fieldCls, "resize-none")}
                    />
                    <label htmlFor={`${uid}-message`} className={labelCls}>
                      Message
                    </label>
                  </div>
                  {/* Honeypot */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                </div>

                {status.kind === "error" && (
                  <p role="alert" className="mt-6 text-sm text-[#f0a58a]">
                    {status.message}
                  </p>
                )}

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={status.kind === "sending"}
                    className="inline-flex min-h-13 items-center justify-center gap-2 bg-ivory px-8 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-tan disabled:opacity-60"
                  >
                    {status.kind === "sending" && <Loader2 className="size-4 animate-spin" />}
                    Submit Enquiry
                  </button>
                  <p className="text-xs text-ivory/45">We only use your details to respond to this enquiry.</p>
                </div>
              </m.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  inputMode,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const id = useId();
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={label}
        className={fieldCls}
      />
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="text-tan"> *</span>}
      </label>
    </div>
  );
}
