import Image from "next/image";
import { ArrowRight, ImagePlus } from "lucide-react";
import { images } from "@/lib/categories";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "../ui/Button";
import { MaskReveal, Reveal } from "../ui/Reveal";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

export const customSteps = [
  { title: "Send your reference", copy: "A photo, screenshot or sketch of the jacket you like." },
  { title: "Discuss requirements", copy: "Style, fit, leather, colour and detailing." },
  { title: "Confirm specifications", copy: "We agree on the details before anything is cut." },
  { title: "Production", copy: "Your piece is made in our workshop." },
  { title: "Receive your piece", copy: "Your custom leather product, ready to wear." },
];

export function CustomLeatherSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section id="custom" aria-labelledby="custom-title" className="grain bg-ink py-24 text-ivory sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5 text-tan">Custom leather jackets</p>
            <H id="custom-title" className="display text-balance text-[2.6rem] sm:text-6xl xl:text-7xl">
              From Reference <span className="italic text-tan">to Reality.</span>
            </H>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="text-pretty text-base leading-relaxed text-ivory/70 sm:text-lg">
              Seen a jacket you love — on Instagram, Pinterest or in a film? Send us the picture and discuss your
              preferred style, fit, leather, colour and detailing with our team.
            </p>
          </Reveal>
        </div>

        {/* Transformation visual */}
        <div className="mt-16 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-6 lg:mt-20">
          <Reveal>
            <div className="relative flex aspect-[16/10] flex-col items-center justify-center gap-4 border sm:aspect-[4/3] border-dashed border-ivory/25 bg-ivory/[0.03] p-8 text-center">
              <ImagePlus className="size-9 text-tan" strokeWidth={1.25} aria-hidden />
              <p className="font-serif text-2xl sm:text-3xl">Your reference</p>
              <p className="max-w-[16rem] text-xs leading-relaxed text-ivory/55 sm:text-sm">
                Instagram post · Pinterest pin · Film still · Your own sketch
              </p>
              <span className="eyebrow absolute left-4 top-4 text-[0.6rem] text-ivory/40">Step 01</span>
            </div>
          </Reveal>

          <div aria-hidden className="flex justify-center">
            <span className="flex size-14 rotate-90 items-center justify-center rounded-full border border-tan/50 text-tan sm:rotate-0">
              <ArrowRight className="size-5" />
            </span>
          </div>

          <MaskReveal className="relative aspect-[16/10] sm:aspect-[4/3]">
            <Image
              src={images.leatherDetail.src}
              alt={images.leatherDetail.alt}
              fill
              sizes="(min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <p className="absolute bottom-5 left-5 font-serif text-2xl sm:text-3xl">Made by CLF</p>
            <span className="eyebrow absolute left-4 top-4 text-[0.6rem] text-ivory/70">Step 05</span>
          </MaskReveal>
        </div>

        {/* Process */}
        <ol className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-5">
          {customSteps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} y={14} className="bg-ink p-6 lg:p-7">
              <span className="text-xs tracking-[0.2em] text-tan">0{i + 1}</span>
              <h3 className="mt-4 font-serif text-[1.45rem] leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/55">{s.copy}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Button href={whatsappLink("custom")} variant="whatsapp" icon={<WhatsAppIcon className="size-5" />}>
            Send Your Design on WhatsApp
          </Button>
          <p className="max-w-md text-xs leading-relaxed text-ivory/45">
            Every custom piece is discussed individually — final design depends on the leather and specifications we
            agree together.
          </p>
        </div>
      </div>
    </section>
  );
}
