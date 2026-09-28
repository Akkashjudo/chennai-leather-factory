import type { Metadata } from "next";
import { Navigation, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/PageHero";
import { StoreLocation } from "@/components/sections/StoreLocation";
import { LeadForm } from "@/components/sections/LeadForm";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export const metadata: Metadata = pageMetadata({
  title: "Contact Chennai Leather Factory | Store Opposite Nehru Stadium, Chennai",
  description:
    "Visit, call or WhatsApp Chennai Leather Factory — Gate 1, 67 Raja Muthiah Rd, opposite Jawaharlal Nehru Stadium, next to Punjab National Bank, Periyamedu, Chennai 600003. Phone 08072650043.",
  path: "/contact",
});

const channels = [
  {
    label: "WhatsApp",
    value: "Fastest reply",
    href: whatsappLink("product"),
    icon: <WhatsAppIcon className="size-5" />,
  },
  { label: "Call", value: site.phone.raw, href: `tel:${site.phone.raw}`, icon: <Phone className="size-5" /> },
  { label: "Directions", value: "Opp. Nehru Stadium, Gate 1", href: site.directionsUrl, icon: <Navigation className="size-5" /> },
  { label: "Instagram", value: site.instagram.handle, href: site.instagram.url, icon: <InstagramIcon className="size-5" /> },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Come see us, <span className="italic text-tan">or just say hello.</span>
          </>
        }
        lead="Opposite Jawaharlal Nehru Stadium, near Gate 1 on Raja Muthiah Road — next to Punjab National Bank."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      >
        <Button href={site.directionsUrl} variant="primary" icon={<Navigation className="size-4" />}>
          Get Directions
        </Button>
        <Button href={`tel:${site.phone.raw}`} variant="outline-light" icon={<Phone className="size-4" />}>
          Call {site.phone.raw}
        </Button>
      </PageHero>

      <section className="bg-ink pb-16 text-ivory">
        <div className="container-x">
          <ul className="grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => {
              const external = c.href.startsWith("http");
              return (
                <li key={c.label} className="bg-charcoal">
                  <a
                    href={c.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex h-full items-center gap-4 p-6 transition-colors hover:bg-graphite"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ivory/20 text-tan">
                      {c.icon}
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.18em] text-ivory/50">{c.label}</span>
                      <span className="mt-1 block text-[0.95rem]">{c.value}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-xs text-ivory/45">
            Planning a visit? Call or WhatsApp us first to confirm store timings.
          </p>
        </div>
      </section>

      <StoreLocation showHeading={false} />
      <LeadForm defaultType="other" title="Send us an enquiry." lead="Products, custom work, wholesale or private label — tell us what you need." />
    </>
  );
}
