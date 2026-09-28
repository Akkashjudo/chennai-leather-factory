import Image from "next/image";
import { images } from "@/lib/categories";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "../ui/Button";
import { MaskReveal, Reveal } from "../ui/Reveal";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

const points = [
  { title: "Direct Manufacturing", copy: "Greater control over product development and sourcing — without unnecessary middleman margins." },
  { title: "Wholesale Capability", copy: "Products for stores, resellers and businesses." },
  { title: "Customization", copy: "Discuss leather, fit, design and finishing according to your requirement." },
  { title: "Private Label", copy: "Manufacturing support for businesses building their own leather brand." },
];

export function ManufacturingSection() {
  return (
    <section aria-labelledby="mfg-title" className="bg-bone py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <MaskReveal className="relative aspect-[4/3] w-full sm:aspect-[4/5] lg:sticky lg:top-28">
            <Image
              src={images.craftsman.src}
              alt={images.craftsman.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_35%]"
            />
            <span className="eyebrow absolute bottom-4 left-4 bg-ink/80 px-3 py-2 text-[0.62rem] text-ivory backdrop-blur-sm">
              In our workshop · Chennai
            </span>
          </MaskReveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:py-6">
          <Reveal>
            <p className="eyebrow mb-5 text-cognac">The manufacturer advantage</p>
            <h2 id="mfg-title" className="display text-balance text-[2.5rem] sm:text-6xl">
              Not just a store. <span className="italic text-cognac">We make</span> leather products.
            </h2>
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-ink/70 sm:text-lg">
              Our own manufacturing sits behind everything on our shelves. It lets us offer competitive pricing,
              take on custom work, supply businesses at wholesale and help new brands produce under their own name —
              sourced closer to where the product is actually made.
            </p>
          </Reveal>

          <ol className="mt-12 border-t border-ink/15">
            {points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05} y={16} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-ink/15 py-6 sm:grid-cols-[4rem_1fr]">
                <span className="pt-1 text-xs tracking-[0.2em] text-cognac">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl leading-tight sm:text-[1.7rem]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65 sm:text-base">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-10">
            <Button href={whatsappLink("product")} variant="primary" icon={<WhatsAppIcon className="size-4" />}>
              Talk to Our Team
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
