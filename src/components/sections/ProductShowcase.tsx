import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/categories";
import { Reveal } from "../ui/Reveal";

const uses = [
  { word: "Ride", items: "Biker jackets", href: "/products/jackets" },
  { word: "Work", items: "Laptop bags · Formal shoes · Belts", href: "/products/bags" },
  { word: "Travel", items: "Travel bags · Backpacks", href: "/products/bags" },
  { word: "Everyday", items: "Wallets · Handbags · Slings", href: "/products/wallets" },
  { word: "Formal", items: "Formal shoes · Loafers · Chelsea boots", href: "/products/shoes" },
  { word: "Accessories", items: "Keychains · Small leather goods", href: "/products/accessories" },
];

/** Full-bleed store aisle with an editorial index of lifestyle uses. */
export function ProductShowcase() {
  return (
    <section aria-labelledby="lifestyle-title" className="relative overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0">
        <Image
          src={images.storeAisle.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_40%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
      </div>

      <div className="container-x relative grid gap-14 py-24 sm:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-5 text-tan">Product showcase</p>
          <h2 id="lifestyle-title" className="display text-balance text-[2.5rem] sm:text-6xl">
            Leather for every part of your <span className="italic text-tan">lifestyle.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-ivory/65">
            Walk our aisles and you&rsquo;ll find leather for the commute, the ride, the trip and the everyday.
          </p>
        </Reveal>

        <ul className="border-t border-ivory/15 lg:col-span-6 lg:col-start-7">
          {uses.map((u, i) => (
            <Reveal as="li" key={u.word} delay={i * 0.05} y={12}>
              <Link
                href={u.href}
                className="group flex items-baseline justify-between gap-6 border-b border-ivory/15 py-5 sm:py-6"
              >
                <span className="font-serif text-[2.1rem] leading-none transition-[color,transform] duration-500 ease-out-soft group-hover:translate-x-2 group-hover:text-tan sm:text-5xl">
                  {u.word}
                </span>
                <span className="text-right text-xs leading-relaxed text-ivory/55 sm:text-sm">{u.items}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
