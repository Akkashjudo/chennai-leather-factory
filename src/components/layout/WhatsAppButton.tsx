"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { MapPin, Phone, X, ArrowUpRight } from "lucide-react";
import { ease } from "@/lib/motion";
import { site } from "@/lib/site";
import { whatsappLink, type WhatsAppIntent } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";
import { cn } from "../ui/cn";

const intents: { intent: WhatsAppIntent; label: string; hint: string }[] = [
  { intent: "product", label: "Products", hint: "Jackets, shoes, bags & more" },
  { intent: "custom", label: "Custom jacket", hint: "I have a reference design" },
  { intent: "wholesale", label: "Wholesale", hint: "Bulk / business quantities" },
  { intent: "privateLabel", label: "Private label", hint: "Start my own leather brand" },
];

/**
 * WhatsApp entry that asks for intent first, so every chat opens with context.
 * Desktop: floating button that steps aside over [data-fab-avoid] regions (forms, footer)
 * so it never covers a CTA. Mobile: sticky Call / Directions / WhatsApp bar.
 */
export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [avoid, setAvoid] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setAvoid(visible.size > 0);
    });
    const observe = () => document.querySelectorAll("[data-fab-avoid]").forEach((el) => io.observe(el));
    observe();
    // Re-scan after client-side navigations swap the page content.
    const mo = new MutationObserver(() => {
      io.disconnect();
      visible.clear();
      observe();
    });
    mo.observe(document.getElementById("main") ?? document.body, { childList: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    const raf = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }));
    const trigger = triggerRef.current;
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const toggle = (e: React.MouseEvent<HTMLElement>) => {
    triggerRef.current = e.currentTarget;
    setOpen((v) => !v);
  };

  return (
    <div ref={rootRef}>
      <div className="fixed bottom-[calc(var(--mobile-bar-h)+env(safe-area-inset-bottom)+0.75rem)] right-4 z-30 md:bottom-6 md:right-6">
        <AnimatePresence>
          {open && (
            <m.div
              ref={panelRef}
              role="dialog"
              aria-label="Choose what you'd like to discuss on WhatsApp"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
              className="absolute bottom-0 right-0 w-[min(20rem,calc(100vw-2rem))] origin-bottom-right bg-ivory text-ink shadow-[0_24px_60px_-20px_rgba(16,14,12,0.55)] md:bottom-[4.5rem]"
            >
              <div className="flex items-start justify-between border-b border-ink/10 py-4 pl-5 pr-2">
                <div>
                  <p className="t-h4">How can we help?</p>
                  <p className="mt-1 text-xs text-ink/65">WhatsApp opens with your message ready.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="inline-flex size-11 items-center justify-center text-ink/60 hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              </div>
              <ul className="divide-y divide-ink/10">
                {intents.map((i) => (
                  <li key={i.intent}>
                    <a
                      href={whatsappLink(i.intent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group flex min-h-14 items-center justify-between px-5 py-3 transition-colors hover:bg-bone focus-visible:bg-bone"
                    >
                      <span>
                        <span className="block text-[0.95rem] font-medium">{i.label}</span>
                        <span className="block text-xs text-ink/65">{i.hint}</span>
                      </span>
                      <ArrowUpRight className="size-4 text-cognac transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={open ? "Close WhatsApp options" : "Chat on WhatsApp"}
          tabIndex={avoid && !open ? -1 : undefined}
          className={cn(
            "hidden size-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_12px_30px_-8px_rgba(31,122,77,0.6)] transition-[transform,opacity] duration-500 ease-out-soft hover:scale-105 active:scale-95 md:inline-flex",
            avoid && !open && "pointer-events-none translate-y-4 scale-90 opacity-0",
          )}
        >
          {open ? <X className="size-6" /> : <WhatsAppIcon className="size-7" />}
        </button>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_1fr_1.6fr] border-t border-ivory/10 bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        <a
          href={`tel:${site.phone.raw}`}
          className="flex h-[var(--mobile-bar-h)] flex-col items-center justify-center gap-1 text-[0.7rem] tracking-wide text-ivory/85 active:bg-ivory/10"
        >
          <Phone className="size-[1.1rem]" aria-hidden /> Call
        </a>
        <a
          href={site.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[var(--mobile-bar-h)] flex-col items-center justify-center gap-1 border-x border-ivory/10 text-[0.7rem] tracking-wide text-ivory/85 active:bg-ivory/10"
        >
          <MapPin className="size-[1.1rem]" aria-hidden /> Directions
        </a>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="dialog"
          className="m-2 flex items-center justify-center gap-2 bg-wa text-sm font-medium text-white active:scale-[0.97]"
        >
          <WhatsAppIcon className="size-5" /> WhatsApp
        </button>
      </div>
    </div>
  );
}
