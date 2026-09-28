import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "./cn";

type Variant = "primary" | "light" | "outline" | "outline-light" | "whatsapp";

const base =
  "group/btn relative inline-flex min-h-12 select-none items-center justify-center gap-2.5 overflow-hidden px-6 py-3 text-center text-[0.9rem] font-medium tracking-wide transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.97] sm:whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-cognac text-ivory hover:bg-cognac-deep",
  light: "bg-ivory text-ink hover:bg-tan",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  "outline-light": "border border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
  whatsapp: "bg-wa text-white hover:bg-wa-deep",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: React.ReactNode;
  arrow?: boolean;
  /** Full width on phones, natural width from `sm` up. */
  block?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * Primary CTA. Micro-interactions: label nudges, icon lifts, and the arrow
 * flips out/in (the 21st.dev "Flip Links" idea applied to the icon), plus press feedback.
 */
export function Button({ href, children, variant = "primary", icon, arrow, block, className, ariaLabel }: Props) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const content = (
    <>
      {icon && (
        <span aria-hidden className="transition-transform duration-300 ease-out-soft group-hover/btn:-translate-y-px">
          {icon}
        </span>
      )}
      <span className="transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-0.5">{children}</span>
      {arrow && (
        <span aria-hidden className="relative -mr-1 size-4 overflow-hidden">
          <ArrowUpRight className="absolute inset-0 size-4 transition-transform duration-300 ease-out-soft group-hover/btn:-translate-y-full group-hover/btn:translate-x-full" />
          <ArrowUpRight className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
        </span>
      )}
    </>
  );
  const cls = cn(base, variants[variant], block && "w-full sm:w-auto", className);
  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
