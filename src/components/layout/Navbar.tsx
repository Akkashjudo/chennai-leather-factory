"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { images } from "@/lib/categories";
import { ease, menuTransition } from "@/lib/motion";
import { nav, site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";
import { cn } from "../ui/cn";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  // Close on any route change, including browser back/forward.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Solid background after leaving the hero; hide on scroll-down, reveal on scroll-up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 480);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close if the viewport grows past the mobile breakpoint while open.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,transform] duration-500 ease-out-soft",
          solid ? "border-b border-ivory/10 bg-ink/85 backdrop-blur-lg" : "border-b border-transparent",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-3">
              {nav.slice(1).map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group/nav relative flex min-h-11 items-center px-2.5 text-[0.84rem] tracking-wide transition-colors",
                        active ? "text-ivory" : "text-ivory/75 hover:text-ivory",
                      )}
                    >
                      <FlipText>{item.label}</FlipText>
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-2.5 bottom-1.5 h-px origin-left bg-tan transition-transform duration-500 ease-out-soft",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink("product")}
              target="_blank"
              rel="noopener noreferrer"
              className="group/wa hidden min-h-11 items-center gap-2 bg-ivory px-5 text-[0.84rem] font-medium text-ink transition-colors duration-300 hover:bg-tan active:scale-[0.97] sm:inline-flex"
            >
              <WhatsAppIcon className="size-4 text-wa transition-transform duration-300 group-hover/wa:-rotate-12" />
              WhatsApp Us
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 inline-flex size-12 items-center justify-center text-ivory lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-soft",
                    open && "translate-y-[5.25px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 right-0 h-[1.5px] bg-current transition-all duration-500 ease-out-soft",
                    open ? "w-full -translate-y-[5.25px] -rotate-45" : "w-4",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={close} pathname={pathname} toggleRef={toggleRef} />
    </>
  );
}

/**
 * Letter-flip hover, adapted from the 21st.dev "Flip Links" / Hyperiux nav:
 * each character slides up and its text-shadow twin slides in beneath it.
 */
function FlipText({ children }: { children: string }) {
  return (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="relative inline-flex overflow-hidden leading-[1.15]">
        {[...children].map((ch, i) => (
          <span
            key={i}
            className="inline-block whitespace-pre transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover/nav:-translate-y-[1.2em] group-focus-visible/nav:-translate-y-[1.2em] motion-reduce:transition-none"
            style={{ textShadow: "0 1.2em currentColor", transitionDelay: `${i * 14}ms` }}
          >
            {ch}
          </span>
        ))}
      </span>
    </>
  );
}

/**
 * Full-screen mobile menu — clip-path wipe + staggered links, adapted from the
 * 21st.dev "Immersive Full Screen Navigation" (rebuilt on Framer Motion, no GSAP).
 */
function MobileMenu({
  open,
  onClose,
  pathname,
  toggleRef,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll lock + focus trap + Escape; focus returns to the toggle on close.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const toggle = toggleRef.current;

    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    const raf = requestAnimationFrame(() => focusables()[0]?.focus({ preventScroll: true }));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggle, ...focusables()].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      html.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open, onClose, toggleRef]);

  const linkVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: reduce ? 0 : 0.28 + i * 0.05 } }),
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", transition: { ...menuTransition, duration: 0.55 } }}
          transition={reduce ? { duration: 0.2 } : menuTransition}
          className="grain fixed inset-0 z-40 flex h-dvh flex-col overflow-y-auto overscroll-contain bg-ink pt-[var(--header-h)] text-ivory lg:hidden"
        >
          <nav aria-label="Mobile" className="container-x flex-1 pt-4">
            <ul className="border-b border-ivory/10">
              {nav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <m.li key={item.href} custom={i} variants={linkVariants} initial="hidden" animate="show" className="border-t border-ivory/10">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="group flex min-h-14 items-center justify-between py-2.5"
                    >
                      <span className={cn("font-serif text-[clamp(1.75rem,1.2rem+2.6vw,2.4rem)] leading-none", active && "italic text-tan")}>
                        {item.label}
                      </span>
                      <span className="text-xs tabular-nums tracking-widest text-ivory/60">{String(i + 1).padStart(2, "0")}</span>
                    </Link>
                  </m.li>
                );
              })}
            </ul>
          </nav>

          <m.div
            className="container-x space-y-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: reduce ? 0 : 0.6 } }}
          >
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-ivory/15 p-3"
            >
              <span className="relative size-16 shrink-0 overflow-hidden">
                <Image src={images.storefrontDay.src} alt="" fill sizes="64px" className="object-cover object-[50%_35%]" />
              </span>
              <span className="min-w-0">
                <span className="eyebrow block text-tan">Visit the store</span>
                <span className="mt-1 block text-sm leading-snug text-ivory/85">
                  Opp. Jawaharlal Nehru Stadium, Gate 1 · Raja Muthiah Rd
                </span>
              </span>
            </a>
            <a
              href={whatsappLink("product")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-2.5 bg-wa text-base font-medium text-white active:scale-[0.98]"
            >
              <WhatsAppIcon /> WhatsApp Us
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${site.phone.raw}`}
                className="flex min-h-12 items-center justify-center gap-2 border border-ivory/25 text-sm text-ivory active:bg-ivory/10"
              >
                <Phone className="size-4" aria-hidden /> Call
              </a>
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 border border-ivory/25 text-sm text-ivory active:bg-ivory/10"
              >
                <MapPin className="size-4" aria-hidden /> Directions
              </a>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
