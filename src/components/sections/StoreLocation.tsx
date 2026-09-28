import Image from "next/image";
import { Landmark, MapPin, Navigation, Phone } from "lucide-react";
import { images } from "@/lib/categories";
import { site } from "@/lib/site";
import { Button } from "../ui/Button";
import { MaskReveal, Reveal } from "../ui/Reveal";

const cues = [
  { icon: Landmark, label: "Opposite Jawaharlal Nehru Stadium", sub: "Look for Gate 1 on Raja Muthiah Road" },
  { icon: MapPin, label: "Next to Punjab National Bank", sub: "Periyamedu, Chennai – 600003" },
];

export function StoreLocation({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="visit" aria-labelledby="visit-title" className="bg-bone py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <MaskReveal className="relative aspect-[4/5] sm:aspect-[5/6]">
            <Image
              src={images.storefrontDay.src}
              alt={images.storefrontDay.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_45%]"
            />
            <span className="eyebrow absolute bottom-4 left-4 bg-ivory px-3 py-2 text-[0.62rem] text-ink">
              This is what you&rsquo;re looking for
            </span>
          </MaskReveal>
        </div>

        <div className="flex flex-col lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow mb-5 text-cognac">Visit the store</p>
            {showHeading ? (
              <h2 id="visit-title" className="display text-balance text-[2.5rem] sm:text-6xl">
                Experience leather <span className="italic text-cognac">in person.</span>
              </h2>
            ) : (
              <h2 id="visit-title" className="display text-balance text-[2.2rem] sm:text-5xl">
                How to find us
              </h2>
            )}
            <p className="mt-6 max-w-lg text-pretty leading-relaxed text-ink/70 sm:text-lg">
              See the products, feel the leather, compare designs and speak directly with the Chennai Leather Factory
              team.
            </p>
          </Reveal>

          <Reveal className="mt-10 grid gap-8 sm:grid-cols-2" delay={0.08}>
            <address className="not-italic">
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/50">Address</p>
              <p className="font-serif text-[1.4rem] leading-snug">
                {site.address.line1},
                <br />
                {site.address.landmark},
                <br />
                {site.address.near},
                <br />
                {site.address.locality}, {site.address.city} – {site.address.postalCode}
              </p>
            </address>
            <ul className="space-y-5">
              {cues.map(({ icon: Icon, label, sub }) => (
                <li key={label} className="flex gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-cognac" strokeWidth={1.5} aria-hidden />
                  <span>
                    <span className="block font-medium">{label}</span>
                    <span className="block text-sm text-ink/60">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row" delay={0.12}>
            <Button href={site.directionsUrl} variant="primary" icon={<Navigation className="size-4" />}>
              Get Directions
            </Button>
            <Button href={`tel:${site.phone.raw}`} variant="outline" icon={<Phone className="size-4" />}>
              Call {site.phone.raw}
            </Button>
          </Reveal>

          <Reveal className="relative mt-10 aspect-[16/10] w-full overflow-hidden bg-sand lg:mt-12" delay={0.15}>
            <iframe
              title="Map showing Chennai Leather Factory opposite Jawaharlal Nehru Stadium, Chennai"
              src={site.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 grayscale-[35%]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
