import Image from "next/image";
import Link from "next/link";
import { cn } from "../ui/cn";

/**
 * Official CLF monogram (supplied artwork, background removed, proportions untouched)
 * paired with the business name, mirroring the storefront signage.
 */
export function Logo({
  className,
  tone = "light",
  size = "md",
}: {
  className?: string;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  const h = size === "lg" ? 64 : 44;
  const w = Math.round((h * 708) / 856);
  return (
    <Link
      href="/"
      aria-label="Chennai Leather Factory — home"
      className={cn("inline-flex items-center gap-3", tone === "light" ? "text-ivory" : "text-ink", className)}
    >
      <Image
        src="/brand/clf-monogram.png"
        alt=""
        width={w}
        height={h}
        loading="eager"
      />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif tracking-[-0.01em]", size === "lg" ? "text-2xl" : "text-[1.15rem] sm:text-[1.3rem]")}>
          Chennai Leather
        </span>
        <span className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.42em] opacity-65">Factory</span>
      </span>
    </Link>
  );
}
