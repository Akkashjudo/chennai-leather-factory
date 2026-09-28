import type { Metadata } from "next";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/PageHero";
import { PrivateLabelSection } from "@/components/sections/PrivateLabelSection";
import { ManufacturingSection } from "@/components/sections/ManufacturingSection";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const path = "/private-label";
const description =
  "Start your own leather brand with private-label and white-label leather manufacturing support from Chennai Leather Factory — jackets, bags, wallets, belts and more.";

export const metadata: Metadata = pageMetadata({
  title: "Private Label Leather Manufacturer in Chennai | Start Your Leather Brand",
  description,
  path,
});

const prepare = [
  "The products you want to sell",
  "Reference designs or samples, if you have them",
  "Your preferred leather, colours and finishes",
  "Branding needs — e.g. your logo on the product or packaging",
  "Rough quantities and your launch timeline",
];

export default function PrivateLabelPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd({ name: "Private-label leather manufacturing", description, path })} />
      <PageHero
        eyebrow="Private label · White label"
        title={
          <>
            Start your leather brand — <span className="italic text-tan">without building a factory.</span>
          </>
        }
        lead="New fashion labels, Instagram businesses, retailers and entrepreneurs work with us to explore products, customization and manufacturing for their own brand."
        crumbs={[{ name: "Private Label", path }]}
      >
        <Button href={whatsappLink("privateLabel")} variant="whatsapp" icon={<WhatsAppIcon className="size-5" />}>
          Start Your Leather Brand
        </Button>
        <Button href="#enquiry" variant="outline-light">
          Send an Enquiry
        </Button>
      </PageHero>

      <PrivateLabelSection />

      <section className="bg-bone py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5 text-cognac">Before our first call</p>
            <h2 className="display text-[2.2rem] sm:text-5xl">What to have ready</h2>
            <p className="mt-6 max-w-sm leading-relaxed text-ink/65">
              None of this is required to start the conversation — but it helps us understand your brand faster.
            </p>
          </Reveal>
          <ul className="border-t border-ink/15 lg:col-span-6 lg:col-start-7">
            {prepare.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 0.05} y={12} className="flex gap-5 border-b border-ink/15 py-5">
                <span className="font-mono text-xs text-cognac">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg">{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ManufacturingSection />

      <FAQ
        items={[
          {
            q: "What's the difference between private label and wholesale?",
            a: "Wholesale is buying our products in business quantities. Private label is about products made or finished for your own brand — we discuss your specifications and branding requirements first.",
          },
          {
            q: "Which products can I launch under my brand?",
            a: "Talk to us about jackets, bags, wallets, belts and accessories. What's possible depends on the product and your requirements.",
          },
          {
            q: "How are quantities, pricing and timelines decided?",
            a: "They depend on the product, customization and branding you need, so we confirm them once your requirements are finalized.",
          },
        ]}
      />

      <LeadForm
        defaultType="private-label"
        title="Tell us about your brand."
        lead="Share what you want to sell and our team will reach out to discuss products, customization and manufacturing."
      />
    </>
  );
}
