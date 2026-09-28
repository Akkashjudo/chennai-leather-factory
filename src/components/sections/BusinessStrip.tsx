import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const items = [
  { n: "01", title: "Retail", copy: "Shop leather products directly.", href: "/products" },
  { n: "02", title: "Wholesale", copy: "Bulk purchasing for businesses and resellers.", href: "/wholesale" },
  { n: "03", title: "Customization", copy: "Turn your reference into a personalized leather piece.", href: "/custom-leather" },
  { n: "04", title: "Private Label", copy: "Build your own leather brand with manufacturing support.", href: "/private-label" },
];

export function BusinessStrip() {
  return (
    <section aria-label="What we do" className="bg-charcoal text-ivory">
      <div className="container-x">
        <ul className="grid grid-cols-1 gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal as="li" key={item.n} delay={i * 0.06} y={12} className="bg-charcoal">
              <Link href={item.href} className="group flex h-full flex-col gap-3 py-7 sm:px-6 sm:py-9">
                <span className="flex items-baseline justify-between">
                  <span className="flex items-baseline gap-3">
                    <span className="text-[0.7rem] tracking-[0.2em] text-tan">{item.n}</span>
                    <span className="font-serif text-[1.7rem] leading-none">{item.title}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 text-ivory/40 transition-all duration-500 ease-out-soft group-hover:translate-x-1 group-hover:text-tan"
                  />
                </span>
                <span className="text-sm leading-relaxed text-ivory/60">{item.copy}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
