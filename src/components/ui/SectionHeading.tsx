import { Item, Stagger } from "./Reveal";
import { cn } from "./cn";

type Props = {
  /** Editorial index, e.g. "01" — renders as "01 — Collection". */
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
  children?: React.ReactNode;
};

/** Eyebrow → title → lead, revealed in sequence. */
export function SectionHeading({ index, eyebrow, title, lead, tone = "dark", className, as: H = "h2", id, children }: Props) {
  const accent = tone === "light" ? "text-tan" : "text-cognac";
  return (
    <Stagger className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <Item as="p" className={cn("eyebrow mb-5 flex items-center gap-3", accent)}>
          {index && (
            <>
              <span className="tabular-nums">{index}</span>
              <span aria-hidden className="h-px w-6 bg-current opacity-60" />
            </>
          )}
          {eyebrow}
        </Item>
      )}
      <Item>
        <H id={id} className="t-h2">
          {title}
        </H>
      </Item>
      {lead && (
        <Item as="p" className={cn("t-lead mt-6", tone === "light" ? "text-ivory/75" : "text-ink/70")}>
          {lead}
        </Item>
      )}
      {children && <Item className="mt-8">{children}</Item>}
    </Stagger>
  );
}
