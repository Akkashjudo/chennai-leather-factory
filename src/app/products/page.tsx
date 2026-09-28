import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/categories";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/PageHero";
import { StoreLocation } from "@/components/sections/StoreLocation";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export const metadata: Metadata = pageMetadata({
  title: "Leather Products in Chennai | Jackets, Shoes, Bags, Wallets & Belts",
  description:
    "Browse leather jackets, shoes, Chelsea boots, bags, wallets, belts and accessories at Chennai Leather Factory — available in store, for wholesale and for custom orders.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Leather, <span className="italic text-tan">every way you need it.</span>
          </>
        }
        lead="Jackets, footwear, bags, wallets, belts and accessories. Stock changes often — message us to check what's in store right now, or visit to see the full range."
        crumbs={[{ name: "Products", path: "/products" }]}
      >
        <Button href={whatsappLink("product")} variant="whatsapp" icon={<WhatsAppIcon className="size-5" />}>
          Ask What&rsquo;s In Stock
        </Button>
        <Button href="#visit" variant="outline-light">
          Visit Our Store
        </Button>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={(i % 3) * 0.06}>
                <Link href={`/products/${c.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                    {c.image ? (
                      <Image
                        src={c.image.src}
                        alt={c.image.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105"
                      />
                    ) : (
                      <div className="grain flex size-full flex-col justify-end bg-cognac p-7 text-ivory">
                        <span className="eyebrow text-[0.62rem] text-ivory/75">Photos coming soon</span>
                        <span className="mt-3 font-serif text-4xl leading-none">{c.name}</span>
                        <span className="mt-3 max-w-[16rem] text-sm text-ivory/75">
                          Ask us on WhatsApp for current designs
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-[1.9rem] leading-tight">{c.name}</h2>
                      <p className="mt-1 text-sm text-ink/60">{c.tagline}</p>
                    </div>
                    <ArrowUpRight className="mt-2 size-5 shrink-0 text-cognac transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <StoreLocation />
      <CTASection />
    </>
  );
}
