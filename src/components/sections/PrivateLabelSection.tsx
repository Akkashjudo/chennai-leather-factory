import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

export const privateLabelSteps = [
  { title: "Idea", copy: "Tell us what you want to sell." },
  { title: "Product", copy: "Select or develop the product." },
  { title: "Customize", copy: "Discuss leather, colour, design and specifications." },
  { title: "Brand", copy: "Discuss your private-label requirements." },
  { title: "Production", copy: "Manufacturing begins after requirements are finalized." },
  { title: "Sell", copy: "Launch products under your own business or brand." },
];

export const privateLabelAudience = [
  "New fashion brands",
  "Instagram businesses",
  "Retail stores",
  "Corporate businesses",
  "Resellers",
  "Online sellers",
  "Entrepreneurs",
];

/**
 * B2B tone: lighter surface, ruled grid, sans-led spec-sheet feel —
 * deliberately different from the cinematic retail sections.
 */
export function PrivateLabelSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section
      id="private-label"
      aria-labelledby="pl-title"
      className="relative bg-ivory py-24 sm:py-32"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(16 14 12 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(16 14 12 / 0.05) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }}
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="mb-5 inline-flex items-center gap-2 border border-ink/20 bg-ivory px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink">
              <span className="size-1.5 rounded-full bg-cognac" /> For businesses · Private / white label
            </p>
            <H id="pl-title" className="text-balance text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
              Your Brand.
              <br />
              <span className="font-serif font-normal italic tracking-[-0.01em] text-cognac">Our Manufacturing Support.</span>
            </H>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={0.1}>
            <p className="text-pretty text-base leading-relaxed text-ink/70 sm:text-lg">
              Want to launch your own leather business? Work with Chennai Leather Factory to explore leather products,
              customization and manufacturing options for your own brand — without setting up a factory.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid grid-cols-2 border-l border-t border-ink/15 bg-ivory lg:grid-cols-3 xl:grid-cols-6">
          {privateLabelSteps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 0.05}
              y={14}
              className="group relative border-b border-r border-ink/15 p-4 transition-colors duration-500 hover:bg-ink hover:text-ivory sm:p-6"
            >
              <span className="font-mono text-xs text-cognac transition-colors group-hover:text-tan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight sm:mt-8 sm:text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60 transition-colors group-hover:text-ivory/65">{s.copy}</p>
              {i < privateLabelSteps.length - 1 && (
                <span aria-hidden className="absolute right-4 top-4 text-ink/25 sm:right-5 sm:top-6 transition-colors group-hover:text-ivory/40">
                  →
                </span>
              )}
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/50">Who it&rsquo;s for</p>
            <ul className="flex flex-wrap gap-2">
              {privateLabelAudience.map((a) => (
                <li key={a} className="border border-ink/15 bg-ivory px-3.5 py-2 text-sm text-ink/80">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end" delay={0.1}>
            <Button href={whatsappLink("privateLabel")} variant="primary" icon={<WhatsAppIcon className="size-4" />}>
              Discuss Private Label
            </Button>
            <Button href="/wholesale" variant="outline">
              Request Wholesale Details
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
