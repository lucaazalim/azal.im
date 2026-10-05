import ExternalLink from "@/app/(home)/_components/ExternalLink";
import { bulletClassName } from "@/app/(home)/_components/home";
import Section from "@/app/(home)/_components/Section";
import RichText from "@/app/_components/RichText";
import { awards } from "@/lib/awards/awards";

export default function Awards() {
  const recognitions = awards.reduce(
    (total, award) => total + award.occurrences.length,
    0,
  );

  return (
    <Section id="awards" caption={`${recognitions} recognitions`}>
      <ul className="divide-y divide-dashed">
        {awards.map((award) => (
          <li
            key={award.name}
            className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 py-8 first:pt-0 last:pb-0 sm:grid-cols-[4.5rem_minmax(0,1fr)]"
          >
            <p
              aria-hidden="true"
              className="text-primary font-mono text-3xl leading-7 font-semibold"
            >
              {award.occurrences.length}×
            </p>
            <article className="space-y-3">
              <header className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {award.url ? (
                    <ExternalLink href={award.url}>{award.name}</ExternalLink>
                  ) : (
                    award.name
                  )}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {award.issuer}
                  <span className="sr-only">
                    , received {award.occurrences.length} times
                  </span>
                </p>
              </header>
              {award.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <RichText text={award.description} />
                </p>
              )}
              <ul className="text-foreground/80 space-y-1.5 text-sm">
                {award.occurrences.map((occurrence) => (
                  <li key={occurrence} className={bulletClassName}>
                    {occurrence}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
