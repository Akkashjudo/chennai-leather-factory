import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { images, type CategoryImage } from "@/lib/categories";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { cn } from "../ui/cn";

type Tile = {
  name: string;
  note: string;
  href: string;
  image?: CategoryImage;
  /** Tailwind grid placement for desktop. */
  span: string;
  /** Styling for tiles without photography. */
  tone?: "cognac" | "ink" | "bone";
  objectPosition?: string;
};

// Tiles without real product photography are deliberately typographic rather than stock/AI imagery.
const tiles: Tile[] = [
  {
    name: "Leather Jackets",
    note: "Biker, casual & made-to-reference",
    href: "/products/jackets",
    span: "col-span-2 lg:col-span-5 lg:row-span-2 min-h-[22rem] lg:min-h-0",
    tone: "cognac",
  },
  {
    name: "Leather Shoes",
    note: "Formal, loafers & derbies",
    href: "/products/shoes",
    image: images.shoesWall,
    span: "col-span-2 lg:col-span-7 lg:row-span-2 aspect-[4/3] lg:aspect-auto",
    objectPosition: "50% 40%",
  },
  {
    name: "Leather Bags",
    note: "Laptop, travel & backpacks",
    href: "/products/bags",
    image: images.bagsLaptop,
    span: "col-span-1 lg:col-span-4 aspect-[4/5] lg:aspect-[5/4]",
  },
  {
    name: "Women's Leather",
    note: "Handbags, slings & purses",
    href: "/products/bags#womens",
    image: images.handbags,
    span: "col-span-1 lg:col-span-4 aspect-[4/5] lg:aspect-[5/4]",
  },
  {
    name: "Wallets",
    note: "Wallets & folios",
    href: "/products/wallets",
    image: images.wallets,
    span: "col-span-2 lg:col-span-4 aspect-[2/1] lg:aspect-[5/4]",
  },
  {
    name: "Belts",
    note: "Formal & casual",
    href: "/products/belts",
    image: images.belts,
    span: "col-span-2 lg:col-span-6 aspect-[16/10] lg:aspect-[16/9]",
    objectPosition: "50% 60%",
  },
  {
    name: "Chelsea Boots",
    note: "Ask for current styles",
    href: "/products/shoes#chelsea-boots",
    span: "col-span-1 lg:col-span-3 min-h-[13rem]",
    tone: "ink",
  },
  {
    name: "Accessories",
    note: "Keychains & small goods",
    href: "/products/accessories",
    span: "col-span-1 lg:col-span-3 min-h-[13rem]",
    tone: "bone",
  },
];

export function CategoryGrid() {
  return (
    <section aria-labelledby="shop-title" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Shop by category"
            title={<span id="shop-title">Everything in leather, under one roof.</span>}
          />
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-8 hover:underline"
          >
            View all products
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[minmax(14rem,auto)] lg:grid-cols-12">
          {tiles.map((t, i) => (
            <Reveal as="li" key={t.name} delay={(i % 3) * 0.06} className={cn("relative", t.span)}>
              <CategoryTile tile={t} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CategoryTile({ tile }: { tile: Tile }) {
  const photo = !!tile.image;
  const toneCls =
    tile.tone === "cognac"
      ? "bg-cognac text-ivory"
      : tile.tone === "ink"
        ? "grain bg-charcoal text-ivory"
        : tile.tone === "bone"
          ? "bg-bone text-ink"
          : "bg-charcoal text-ivory";

  return (
    <Link
      href={tile.href}
      className={cn("group absolute inset-0 flex flex-col justify-end overflow-hidden p-5 sm:p-7", toneCls)}
    >
      {tile.image && (
        <>
          <Image
            src={tile.image.src}
            alt={tile.image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
            style={{ objectPosition: tile.objectPosition ?? "50% 50%" }}
            className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
        </>
      )}

      {!photo && tile.tone === "cognac" && (
        <span className="eyebrow absolute left-5 top-5 border border-ivory/30 px-3 py-1.5 text-[0.62rem] text-ivory/85 sm:left-7 sm:top-7">
          Custom-made available
        </span>
      )}

      <div className="relative flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3
            className={cn(
              "font-serif leading-[1.02] transition-transform duration-500 ease-out-soft group-hover:-translate-y-1",
              tile.tone === "cognac" ? "text-4xl sm:text-5xl" : "text-[1.35rem] sm:text-3xl",
            )}
          >
            {tile.name}
          </h3>
          <p className={cn("mt-2 text-xs tracking-wide sm:text-sm", tile.tone === "bone" ? "text-ink/60" : "text-ivory/70")}>
            {tile.note}
          </p>
        </div>
        <span
          className={cn(
            "flex size-8 shrink-0 items-center sm:size-10 justify-center rounded-full border transition-all duration-500 ease-out-soft group-hover:rotate-45",
            tile.tone === "bone"
              ? "border-ink/20 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory"
              : "border-ivory/30 group-hover:border-ivory group-hover:bg-ivory group-hover:text-ink",
          )}
        >
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
