import type { Metadata } from "next";
import Image from "next/image";
import { images, categories } from "@/lib/categories";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/PageHero";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const path = "/wholesale";
const description =
  "Wholesale leather products from a Chennai manufacturer — jackets, shoes, bags, wallets, belts and accessories for retailers, resellers, online sellers and corporate buyers.";

export const metadata: Metadata = pageMetadata({
  title: "Leather Products Wholesale in Chennai | Chennai Leather Factory",
  description,
  path,
});

const buyers = [
  { title: "Retail stores", copy: "Stock leather jackets, footwear, bags and accessories." },
  { title: "Resellers & online sellers", copy: "Source closer to the manufacturer for your shop or marketplace." },
  { title: "Corporate buyers", copy: "Wallets, belts, bags and accessories for teams and gifting." },
  { title: "Instagram businesses", copy: "Products to sell through your page or online store." },
];

const steps = [
  { title: "Enquire", copy: "Tell us the products, rough quantities and your city." },
  { title: "Discuss", copy: "We go through designs, options and requirements with you." },
  { title: "Pricing", copy: "We share wholesale pricing for your requirement." },
  { title: "Order", copy: "Confirm and we prepare your order." },
];

export default function WholesalePage() {
  return (
    <>
      <JsonLd data={serviceJsonLd({ name: "Wholesale leather products", description, path })} />
      <PageHero
        eyebrow="Wholesale"
        title={
          <>
            Wholesale leather, <span className="italic text-tan">direct from the manufacturer.</span>
          </>
        }
        lead="Why pay unnecessary middleman margins? Buy leather products in business quantities from a Chennai manufacturer with its own store and production."
        crumbs={[{ name: "Wholesale", path }]}
      >
        <Button href="#enquiry" variant="primary" arrow>
          Get Bulk Pricing
        </Button>
        <Button href={whatsappLink("wholesale")} variant="whatsapp" icon={<WhatsAppIcon className="size-5" />}>
          Enquire for Wholesale
        </Button>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MaskReveal className="relative aspect-[4/5]">
              <Image src={images.storeAisle.src} alt={images.storeAisle.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </MaskReveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow mb-5 text-cognac">Who we supply</p>
              <h2 className="display text-balance text-[2.2rem] sm:text-5xl">Built for businesses that sell leather.</h2>
            </Reveal>
            <ul className="mt-10 border-t border-ink/15">
              {buyers.map((b, i) => (
                <Reveal as="li" key={b.title} delay={i * 0.05} y={12} className="border-b border-ink/15 py-5">
                  <h3 className="font-serif text-2xl">{b.title}</h3>
                  <p className="mt-1 text-sm text-ink/65">{b.copy}</p>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-10">
              <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/50">Categories available for wholesale enquiry</p>
              <ul className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li key={c.slug} className="border border-ink/15 px-3.5 py-2 text-sm">
                    {c.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="grain bg-ink py-20 text-ivory sm:py-28">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-5 text-tan">How it works</p>
            <h2 className="display max-w-2xl text-balance text-[2.2rem] sm:text-5xl">From enquiry to order in four steps.</h2>
          </Reveal>
          <ol className="mt-12 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="bg-ink p-7">
                <span className="text-xs tracking-[0.2em] text-tan">0{i + 1}</span>
                <h3 className="mt-5 font-serif text-[1.7rem]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/60">{s.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FAQ
        items={[
          {
            q: "Is there a minimum order quantity?",
            a: "Quantities depend on the product and your requirement. Share what you're looking for and our team will discuss what's possible.",
          },
          {
            q: "Can wholesale products carry my own brand?",
            a: "Yes, that's something we can discuss — see our private-label service for businesses building their own leather brand.",
          },
          {
            q: "Can I see products before ordering?",
            a: "Yes. Visit our store opposite Jawaharlal Nehru Stadium, Chennai, or ask us to share photos and videos on WhatsApp.",
          },
        ]}
      />

      <LeadForm defaultType="wholesale" title="Request wholesale pricing." />
    </>
  );
}
