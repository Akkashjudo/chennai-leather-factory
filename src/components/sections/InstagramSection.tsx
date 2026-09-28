import { InstagramIcon } from "../ui/InstagramIcon";
import { site } from "@/lib/site";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

/**
 * Lightweight social band — no third-party embed script, so it costs nothing in performance.
 * TODO: once CLF supplies selected post images, add a small static grid here linking to each post.
 */
export function InstagramSection() {
  return (
    <section aria-labelledby="ig-title" className="border-y border-ink/10 bg-ivory py-20 sm:py-24">
      <div className="container-x flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-2 text-cognac">
            <InstagramIcon className="size-4" /> On Instagram
          </p>
          <h2 id="ig-title" className="display break-words text-[1.75rem] sm:text-5xl lg:text-6xl">
            Follow <span className="italic">@chennaileatherfactory</span>
          </h2>
          <p className="mt-4 max-w-lg text-ink/65">New arrivals, store walkthroughs and custom work — as it happens.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href={site.instagram.url} variant="outline" arrow>
            Follow on Instagram
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
