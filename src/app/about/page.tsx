import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/categories";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { BusinessStrip } from "@/components/sections/BusinessStrip";
import { WhyCLF } from "@/components/sections/WhyCLF";
import { StoreLocation } from "@/components/sections/StoreLocation";
import { CTASection } from "@/components/sections/CTASection";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "About Chennai Leather Factory | Leather Manufacturer & Store in Chennai",
  description:
    "Chennai Leather Factory is a leather products manufacturer, wholesaler and retailer with a store opposite Jawaharlal Nehru Stadium, Chennai — offering customization and private-label manufacturing.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CLF"
        title={
          <>
            Real leather. <span className="italic text-tan">Direct from the manufacturer.</span>
          </>
        }
        lead="Chennai Leather Factory makes, supplies and sells leather products — from a store you can walk into, opposite Jawaharlal Nehru Stadium."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <BusinessStrip />

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5 text-cognac">Who we are</p>
            <h2 className="display text-balance text-[2.3rem] sm:text-5xl">
              A leather manufacturer with its doors open to everyone.
            </h2>
            <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-ink/70 sm:text-lg">
              <p>
                Most leather shops sell what someone else made. At Chennai Leather Factory, manufacturing sits behind
                the counter — which is why we can serve very different customers from the same place.
              </p>
              <p>
                Walk in for a jacket, a pair of formal shoes or a wallet. Bring a reference photo and discuss a custom
                piece. Buy in bulk for your store. Or work with us to launch products under your own brand.
              </p>
              <p>
                Whatever brings you in, you deal directly with the people who make and supply the product.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5 lg:col-start-8">
            <MaskReveal className="relative col-span-2 aspect-[4/3]">
              <Image src={images.leatherDetail.src} alt={images.leatherDetail.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </MaskReveal>
            <MaskReveal className="relative aspect-[3/4]">
              <Image src={images.shoesWall.src} alt={images.shoesWall.alt} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
            </MaskReveal>
            <MaskReveal className="relative aspect-[3/4]">
              <Image src={images.handbags.src} alt={images.handbags.alt} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
            </MaskReveal>
          </div>
        </div>
      </section>

      <WhyCLF />
      <StoreLocation />
      <CTASection />
    </>
  );
}
