import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CategoryImage } from "@/lib/categories";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "../ui/JsonLd";

type Crumb = { name: string; path: string };

/** Inner-page hero: breadcrumb, eyebrow, serif title, optional image panel. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  image?: CategoryImage;
  children?: React.ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="grain relative bg-ink text-ivory">
      <JsonLd data={breadcrumbJsonLd(all)} />
      <div className="container-x grid gap-10 pb-16 pt-32 sm:pb-20 sm:pt-40 lg:grid-cols-12 lg:items-end">
        <div className={image ? "lg:col-span-7" : "lg:col-span-10"}>
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ivory/50">
              {all.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3" aria-hidden />}
                  {i === all.length - 1 ? (
                    <span aria-current="page" className="text-ivory/80">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="hover:text-ivory">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="animate-[fadeUp_0.9s_cubic-bezier(0.22,1,0.36,1)_both]">
            <p className="eyebrow mb-5 text-tan">{eyebrow}</p>
            <h1 className="display text-balance text-[2.75rem] sm:text-7xl">{title}</h1>
            {lead && <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-ivory/70 sm:text-lg">{lead}</p>}
            {children && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{children}</div>}
          </div>
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden lg:col-span-5 lg:aspect-[4/5]">
            <Image src={image.src} alt={image.alt} fill preload fetchPriority="high" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
