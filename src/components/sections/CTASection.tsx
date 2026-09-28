import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const routes = [
  {
    kicker: "For you",
    title: "Shop / Visit Store",
    copy: "Browse categories, then see and feel the leather in person.",
    href: "/products",
    cta: "Explore products",
  },
  {
    kicker: "Made for you",
    title: "Customize a Product",
    copy: "Share a reference and discuss the design, leather and fit.",
    href: "/custom-leather",
    cta: "Start a custom piece",
  },
  {
    kicker: "For business",
    title: "Wholesale / Private Label",
    copy: "Bulk supply for resellers, or manufacturing support for your brand.",
    href: "/wholesale",
    cta: "Talk business",
  },
];

export function CTASection() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <h2 id="final-cta-title" className="display max-w-4xl text-balance text-[2.6rem] sm:text-7xl">
            Looking for leather? <span className="italic text-cognac">Start here.</span>
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-px bg-ink/15 md:grid-cols-3">
          {routes.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.07} className="bg-ivory">
              <Link
                href={r.href}
                className="group flex h-full flex-col gap-10 p-7 transition-colors duration-500 hover:bg-ink hover:text-ivory sm:p-9"
              >
                <span className="eyebrow text-cognac transition-colors group-hover:text-tan">{r.kicker}</span>
                <span>
                  <span className="block font-serif text-[2rem] leading-tight">{r.title}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-ink/65 transition-colors group-hover:text-ivory/65">
                    {r.copy}
                  </span>
                </span>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium">
                  {r.cta}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
