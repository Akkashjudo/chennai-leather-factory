import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/categories";
import { nav, services, site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { InstagramIcon } from "../ui/InstagramIcon";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-fab-avoid
      className="grain bg-ink pb-[calc(var(--mobile-bar-h)+env(safe-area-inset-bottom)+2rem)] pt-[var(--section-y-sm)] text-ivory md:pb-10"
    >
      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pb-14 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-3">
            <Logo size="lg" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/70">{site.description}</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-ivory/85 transition-colors hover:text-tan"
            >
              <InstagramIcon className="size-4" /> {site.instagram.handle}
            </a>
          </div>

          <FooterCol title="Explore" className="lg:col-span-2">
            {nav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Products" className="lg:col-span-2">
            {categories.map((c) => (
              <FooterLink key={c.slug} href={`/products/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Business" className="lg:col-span-2">
            {services.map((s) => (
              <FooterLink key={s.href} href={s.href}>
                {s.label}
              </FooterLink>
            ))}
            <FooterLink href="/contact#enquiry">Bulk enquiry</FooterLink>
          </FooterCol>

          <div className="col-span-2 lg:col-span-3">
            <p className="eyebrow mb-5 text-ivory/60">Visit</p>
            <address className="text-sm not-italic leading-relaxed text-ivory/85">
              <span className="block text-ivory">Chennai Leather Factory</span>
              {site.address.line1}, {site.address.landmark},
              <br />
              {site.address.near}, {site.address.locality},
              <br />
              {site.address.city}, {site.address.region} – {site.address.postalCode}
            </address>
            <ul className="mt-5 space-y-1 text-sm">
              <li>
                <a className="inline-flex min-h-10 items-center text-ivory hover:text-tan" href={`tel:${site.phone.raw}`}>
                  {site.phone.raw}
                </a>
              </li>
              <li>
                <a className="inline-flex min-h-10 items-center gap-1 text-ivory/85 hover:text-tan" href={whatsappLink("product")} target="_blank" rel="noopener noreferrer">
                  WhatsApp <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </li>
              <li>
                <a className="inline-flex min-h-10 items-center gap-1 text-ivory/85 hover:text-tan" href={site.directionsUrl} target="_blank" rel="noopener noreferrer">
                  Get directions <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div aria-hidden className="stitch text-tan" />

        <div className="flex flex-col gap-4 pt-8 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Chennai Leather Factory. All Rights Reserved.</p>
          <a href="#main" className="group inline-flex min-h-10 items-center gap-2 self-start hover:text-ivory sm:self-auto">
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-4 text-ivory/60">{title}</p>
      <ul>{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-9 items-center text-sm text-ivory/80 transition-colors hover:text-tan">
        {children}
      </Link>
    </li>
  );
}
