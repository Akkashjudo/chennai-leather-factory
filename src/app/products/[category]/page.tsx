import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { categories, getCategory } from "@/lib/categories";
import { pageMetadata } from "@/lib/seo";
import { categoryWhatsappLink, whatsappLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/PageHero";
import { StoreLocation } from "@/components/sections/StoreLocation";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await props.params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMetadata({ title: c.metaTitle, description: c.metaDescription, path: `/products/${c.slug}` });
}

export default async function CategoryPage(props: PageProps<"/products/[category]">) {
  const { category } = await props.params;
  const c = getCategory(category);
  if (!c) notFound();

  const others = categories.filter((o) => o.slug !== c.slug);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={c.name}
        lead={c.intro}
        image={c.image}
        crumbs={[
          { name: "Products", path: "/products" },
          { name: c.name, path: `/products/${c.slug}` },
        ]}
      >
        <Button href={categoryWhatsappLink(c.enquiryNoun)} variant="whatsapp" icon={<WhatsAppIcon className="size-5" />}>
          Enquire on WhatsApp
        </Button>
        <Button href="#visit" variant="outline-light">
          See Them In Store
        </Button>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5 text-cognac">What you&rsquo;ll find</p>
            <h2 className="display text-balance text-[2.2rem] sm:text-5xl">{c.tagline}</h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink/65">
              Designs, sizes and colours change with new stock. The quickest way to check availability is to message
              us — or visit the store to see and try everything in person.
            </p>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-ink/15">
              {c.types.map((t, i) => (
                <Reveal as="li" key={t.name} delay={i * 0.05} y={12}>
                  <div id={t.id} className="flex scroll-mt-28 items-center justify-between gap-4 border-b border-ink/15 py-5">
                    <span className="flex items-center gap-4">
                      <Check className="size-4 text-cognac" aria-hidden />
                      <span className="font-serif text-2xl">{t.name}</span>
                    </span>
                    <a
                      href={categoryWhatsappLink(t.name.toLowerCase())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs font-medium tracking-wide text-cognac underline-offset-4 hover:underline"
                    >
                      Ask availability
                    </a>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2">
              <Link href="/wholesale" className="group bg-ivory p-6 transition-colors hover:bg-bone">
                <p className="eyebrow text-cognac">Buying in bulk?</p>
                <p className="mt-3 font-serif text-2xl">Wholesale {c.name.toLowerCase()}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-sm text-ink/60">
                  Request pricing <ArrowUpRight className="size-3.5" />
                </p>
              </Link>
              <Link
                href={c.customizable ? "/custom-leather" : "/private-label"}
                className="group bg-ivory p-6 transition-colors hover:bg-bone"
              >
                <p className="eyebrow text-cognac">{c.customizable ? "Have a design in mind?" : "Building a brand?"}</p>
                <p className="mt-3 font-serif text-2xl">{c.customizable ? "Make it custom" : "Private label"}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-sm text-ink/60">
                  {c.customizable ? "Send your reference" : "Discuss manufacturing"} <ArrowUpRight className="size-3.5" />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {!c.image && (
        <section className="bg-bone py-16">
          <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl font-serif text-2xl leading-snug sm:text-3xl">
              We&rsquo;re photographing this collection. Message us and we&rsquo;ll share current designs directly.
            </p>
            <Button href={categoryWhatsappLink(c.enquiryNoun)} variant="whatsapp" icon={<WhatsAppIcon className="size-5" />}>
              Get Photos on WhatsApp
            </Button>
          </div>
        </section>
      )}

      <section className="border-t border-ink/10 py-20">
        <div className="container-x">
          <p className="eyebrow mb-8 text-ink/50">More categories</p>
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/products/${o.slug}`} className="group inline-flex items-center gap-2 font-serif text-3xl hover:text-cognac">
                  {o.name}
                  <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <Button href={whatsappLink("product")} variant="outline" arrow>
              Talk to our team
            </Button>
          </div>
        </div>
      </section>

      <StoreLocation />
    </>
  );
}
