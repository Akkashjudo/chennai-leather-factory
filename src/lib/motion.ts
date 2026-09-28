import type { Transition, Variants } from "framer-motion";

/** One motion language for the whole site: fast in, soft landing, no bounce. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = { fast: 0.35, base: 0.75, slow: 1.1 } as const;

export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.base, ease } },
};

/** Parent that sequences its children (heading → text → cards). */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Image frame wipes open while the photo settles from 1.03 → 1. */
export const maskFrame: Variants = {
  hidden: { clipPath: "inset(12% 0% 12% 0%)", opacity: 0 },
  show: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, transition: { duration: duration.slow, ease } },
};
export const maskImage: Variants = {
  hidden: { scale: 1.03 },
  show: { scale: 1, transition: { duration: 1.4, ease } },
};

export const menuTransition: Transition = { duration: 0.7, ease: [0.76, 0, 0.24, 1] };
