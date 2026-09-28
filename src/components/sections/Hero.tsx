import { MapPin } from "lucide-react";
import { Button } from "../ui/Button";
import { HeroMedia } from "./HeroMedia";

const lines = [
  { text: "Crafted in Leather.", italic: false },
  { text: "Made in Chennai.", italic: true },
];

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/**
 * Split editorial hero: type on ink, the lit storefront as the image.
 * Entrance is pure CSS (`.enter*`) so text paints before hydration, and it waits
 * for the intro loader via the `--intro` offset. On phones the photo goes full-bleed.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grain relative overflow-hidden bg-ink text-ivory">
      <div className="relative grid min-h-[100svh] lg:min-h-[max(40rem,100svh)] lg:grid-cols-12">
        <HeroMedia />

        <div className="relative z-10 flex flex-col justify-end pb-[calc(var(--mobile-bar-h)+2.5rem)] pt-32 md:pb-16 lg:order-1 lg:col-span-6 lg:justify-center lg:pb-24">
          <div className="container-x lg:ml-auto lg:max-w-[45rem] lg:pr-6">
            <p className="enter eyebrow mb-6 flex items-center gap-3 text-tan" style={d(0)}>
              <span aria-hidden className="hidden h-px w-8 bg-tan/70 sm:block" />
              Manufacturer · Wholesaler · Retailer
            </p>
            <h1 id="hero-title" className="t-hero">
              {lines.map((l, i) => (
                <span key={l.text} className="block overflow-hidden pb-[0.08em]">
                  <span className={`enter-line block ${l.italic ? "italic text-tan" : ""}`} style={d(0.1 + i * 0.12)}>
                    {l.text}
                  </span>
                </span>
              ))}
            </h1>
            <p className="enter t-lead mt-7 max-w-md text-ivory/80" style={d(0.4)}>
              Leather jackets, footwear, bags and accessories — retail, wholesale, customization and private-label
              manufacturing.
            </p>
            <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={d(0.52)}>
              <Button href="/products" variant="primary" arrow block>
                Explore Collection
              </Button>
              <Button href="#visit" variant="outline-light" block>
                Visit Our Store
              </Button>
            </div>
            <p className="enter mt-8 flex items-center gap-2 text-xs tracking-wide text-ivory/70" style={d(0.64)}>
              <MapPin className="size-3.5 shrink-0 text-tan" aria-hidden />
              Opp. Jawaharlal Nehru Stadium · Gate 1 · Chennai
            </p>
          </div>
        </div>

        {/* Scroll cue — desktop only */}
        <div
          aria-hidden
          className="enter absolute bottom-8 left-[var(--gutter)] z-10 hidden items-center gap-3 text-[0.65rem] uppercase tracking-[0.25em] text-ivory/50 lg:flex"
          style={d(0.9)}
        >
          <span className="relative h-10 w-px overflow-hidden bg-ivory/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollCue_2.2s_ease-in-out_infinite] bg-tan motion-reduce:hidden" />
          </span>
          Scroll
        </div>
      </div>
    </section>
  );
}
