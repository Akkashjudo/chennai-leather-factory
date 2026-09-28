import type { Metadata } from "next";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/PageHero";
import { CustomLeatherSection } from "@/components/sections/CustomLeatherSection";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const path = "/custom-leather";
const description =
  "Custom leather jackets and products in Chennai. Share a reference photo of a jacket you love and discuss the design, leather, fit, colour and detailing with Chennai Leather Factory.";

export const metadata: Metadata = pageMetadata({
  title: "Custom Leather Jackets in Chennai | Made to Your Reference",
  description,
  path,
});

const sendList = [
  { title: "Reference images", copy: "Screenshots, Instagram or Pinterest posts, film stills — front and back if you have them." },
  { title: "Your size & fit", copy: "Your usual size and how you like it to fit — slim, regular or relaxed." },
  { title: "Leather & colour", copy: "Any preference on colour, finish or feel. Not sure? We'll help you choose." },
  { title: "Details", copy: "Zips, collars, linings, quilting, patches — anything that makes it yours." },
];

export default function CustomLeatherPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd({ name: "Custom leather jackets and products", description, path })} />
      <PageHero
        eyebrow="Custom leather"
        title={
          <>
            Seen a jacket you love? <span className="italic text-tan">Let&rsquo;s make it yours.</span>
          </>
        }
        lead="Share your reference image with us and discuss the design, leather, fit, colour and customization you want."
        crumbs={[{ name: "Custom Leather", path }]}
      >
        <Button href={whatsappLink("custom")} variant="whatsapp" icon={<WhatsAppIcon className="size-5" />}>
          Send Your Reference on WhatsApp
        </Button>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-5 text-cognac">Before you message</p>
            <h2 className="display text-[2.2rem] sm:text-5xl">What to send us</h2>
            <p className="mt-6 max-w-sm leading-relaxed text-ink/65">
              The more we can see, the better the conversation. Don&rsquo;t worry if you don&rsquo;t have everything
              — a single photo is a good start.
            </p>
          </Reveal>
          <ol className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {sendList.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.05} className="bg-ivory p-6 sm:p-8">
                <span className="text-xs tracking-[0.2em] text-cognac">0{i + 1}</span>
                <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CustomLeatherSection />

      <FAQ
        items={[
          {
            q: "Can you make an exact copy of the jacket in my photo?",
            a: "We use your reference as the starting point and discuss what can be made — the final piece depends on the leather, construction and specifications we agree together. We'll be clear about any differences before production.",
          },
          {
            q: "Is it only jackets?",
            a: "Jackets are the most common request, but you can also ask about other custom leather products such as bags, wallets and accessories.",
          },
          {
            q: "How do pricing and timelines work?",
            a: "They depend on the design, leather and details you choose, so we share them after discussing your requirements.",
          },
          {
            q: "Can I visit the store to discuss in person?",
            a: "Yes — visit us opposite Jawaharlal Nehru Stadium (Gate 1), Raja Muthiah Road. You can see leathers and finished products while you discuss your design.",
          },
        ]}
      />

      <LeadForm
        defaultType="custom"
        title="Tell us about your custom piece."
        lead="Prefer a form? Share the basics here — then send your reference images on WhatsApp."
      />
    </>
  );
}
