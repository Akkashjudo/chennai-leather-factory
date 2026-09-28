import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const reasons = [
  { title: "Manufacturing Capability", copy: "Products backed by direct manufacturing access." },
  { title: "Retail + Wholesale", copy: "Buy individually or enquire for business quantities." },
  { title: "Customization", copy: "Discuss personalized leather products and jackets." },
  { title: "Private Label", copy: "Support for entrepreneurs and leather brands." },
  { title: "Wide Product Range", copy: "From jackets and footwear to bags and accessories." },
  { title: "Chennai Store", copy: "Visit the physical store opposite Jawaharlal Nehru Stadium." },
];

export function WhyCLF() {
  return (
    <section aria-labelledby="why-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why CLF"
          title={<span id="why-title">A store you can visit, backed by manufacturing.</span>}
          className="mb-14"
        />
        <ul className="grid gap-px border-y border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal
              as="li"
              key={r.title}
              delay={(i % 3) * 0.06}
              y={14}
              className="bg-ivory py-8 sm:px-8"
            >
              <h3 className="font-serif text-[1.65rem] leading-tight">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65 sm:text-base">{r.copy}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
