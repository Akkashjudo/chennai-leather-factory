"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { duration, ease, fadeUp, maskFrame, maskImage, stagger, viewportOnce } from "@/lib/motion";
import type { Variants } from "framer-motion";
import { cn } from "./cn";

const withDelay = (delay: number): Variants => ({
  hidden: fadeUp.hidden,
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease, delay } },
});

type Tag = "div" | "li" | "ul" | "ol" | "section" | "p" | "span";

/** Single element fade-up on first entry into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  /** @deprecated legacy prop — travel distance now comes from the shared fadeUp variant. */
  y?: number;
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      variants={delay ? withDelay(delay) : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Comp>
  );
}

/** Container that reveals its <Item> children in sequence, once. */
export function Stagger({
  children,
  className,
  as = "div",
  gap = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
  delay?: number;
}) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={stagger(gap, delay)} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </Comp>
  );
}

/** Child of <Stagger>; inherits the parent's timeline. */
export function Item({
  children,
  className,
  as = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  id?: string;
}) {
  const Comp = m[as];
  return (
    <Comp id={id} className={className} variants={fadeUp}>
      {children}
    </Comp>
  );
}

/**
 * Editorial image reveal: the frame wipes open and the photo eases from 1.03 → 1.
 * Optional gentle parallax (disabled under reduced motion). The frame keeps its
 * aspect ratio from the first paint, so nothing shifts.
 */
export function ImageReveal({
  children,
  className,
  parallax = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Max vertical drift in px while scrolling past (0 = off). */
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);
  const drift = parallax && !reduce;

  return (
    <m.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      variants={maskFrame}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <m.div className={cn("absolute", drift ? "-inset-y-[var(--p)] inset-x-0" : "inset-0")} style={drift ? { y, ["--p" as string]: `${parallax}px` } : undefined}>
        <m.div className="absolute inset-0" variants={maskImage}>
          {children}
        </m.div>
      </m.div>
    </m.div>
  );
}

/**
 * @deprecated transitional alias kept while sections migrate to <ImageReveal>.
 * Frame wipes open; children keep their own layout (e.g. next/image with `fill`).
 */
export function MaskReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div className={cn("overflow-hidden", className)} variants={maskFrame} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </m.div>
  );
}
