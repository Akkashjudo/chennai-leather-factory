"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { images } from "@/lib/categories";

/** Hero photograph with a gentle scroll parallax (off under reduced motion). The LCP image. */
export function HeroMedia() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 90]);

  return (
    <div className="absolute inset-0 overflow-hidden lg:relative lg:order-2 lg:col-span-6">
      <m.div className="absolute -inset-y-6 inset-x-0 lg:-bottom-24 lg:top-0" style={reduce ? undefined : { y }}>
        <Image
          src={images.storefrontNight.src}
          alt={images.storefrontNight.alt}
          fill
          preload
          fetchPriority="high"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="enter-media object-cover object-[50%_28%]"
        />
      </m.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/45 lg:bg-gradient-to-r lg:from-ink lg:via-ink/10 lg:to-transparent" />
      <p className="absolute bottom-8 right-[calc(var(--gutter)+5rem)] hidden text-right text-[0.65rem] uppercase tracking-[0.22em] text-ivory/70 lg:block">
        The CLF storefront
        <br />
        Raja Muthiah Rd, Chennai
      </p>
    </div>
  );
}
