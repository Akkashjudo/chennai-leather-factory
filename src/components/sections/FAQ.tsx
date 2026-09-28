import { Plus } from "lucide-react";
import { Reveal } from "../ui/Reveal";

export type QA = { q: string; a: React.ReactNode };

/** Native <details> accordion — accessible, zero JS; height animated via CSS interpolate-size. */
export function FAQ({ title = "Questions", items }: { title?: string; items: QA[] }) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-5 text-cognac">Good to know</p>
          <h2 className="display text-[2.2rem] sm:text-5xl">{title}</h2>
        </Reveal>
        <div className="border-t border-ink/15 lg:col-span-7 lg:col-start-6">
          {items.map((item) => (
            <details key={item.q} className="faq group border-b border-ink/15">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl leading-snug sm:text-2xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  className="size-5 shrink-0 text-cognac transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <div className="faq-body">
                <div className="max-w-2xl pb-6 leading-relaxed text-ink/70">{item.a}</div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
