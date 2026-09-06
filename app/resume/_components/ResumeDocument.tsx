import RichText from "@/app/_components/RichText";
import { awards } from "@/lib/awards/awards";
import { formatYearMonthRange } from "@/lib/dates";
import {
  education,
  formatDegree,
  isInProgress,
} from "@/lib/education/education";
import { positions } from "@/lib/experiences/experiences";
import { Description } from "@/lib/experiences/types";
import { resume } from "@/lib/resume/resume";
import { cn } from "@/lib/utils";
import { Fragment, ReactNode } from "react";

/**
 * The resume itself, rendered as an A4 "sheet". It is shown on the resume
 * page and printed to PDF by `scripts/build-resume-pdf.ts`, so it only uses
 * explicit light colors (never theme tokens) and `pt` sizes.
 *
 * On screen the sheet pads itself to match the @page margin declared in
 * `app/globals.css` (6mm 7mm); when printing, the padding is dropped and the
 * @page margin takes over, so both versions share the same content box.
 */
export default function ResumeDocument() {
  return (
    <article
      lang="en"
      className={cn(
        "w-full max-w-[210mm] bg-white p-[4mm] font-sans text-[10pt] leading-[1.3] text-neutral-900 shadow-2xl sm:px-[7mm] sm:py-[6mm]",
        "print:max-w-none print:p-0 print:shadow-none",
      )}
      style={{ printColorAdjust: "exact" }}
    >
      <header className="space-y-0.5 text-center">
        <h1 className="text-[20pt] leading-tight font-bold">{resume.name}</h1>
        <p>
          <strong>{resume.title}</strong> | {resume.location}
        </p>
        <p>
          {resume.contacts.map((contact, index) => (
            <Fragment key={contact.url}>
              {index > 0 && " | "}
              <a href={contact.url} className="text-blue-700 underline">
                {contact.label}
              </a>
            </Fragment>
          ))}
        </p>
      </header>

      <ResumeSection title="Summary">
        <p className="text-justify">
          <RichText text={resume.summary} />
        </p>
      </ResumeSection>

      <ResumeSection title="Professional Experience">
        <div className="space-y-3">
          {positions.map((position) => (
            <div
              key={`${position.title}-${position.startDate}`}
              className="space-y-1 not-first:border-t not-first:border-neutral-200 not-first:pt-3"
            >
              <p className="break-after-avoid">
                <strong>
                  {position.title} | {position.company.name}
                </strong>{" "}
                (
                {formatYearMonthRange(
                  position.startDate,
                  position.endDate,
                  "long",
                )}
                )
              </p>
              {position.company.description && (
                <p className="break-after-avoid italic">
                  {position.company.description}
                </p>
              )}
              <DescriptionBlock description={position.description.concise} />
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Academic Background" avoidBreak>
        <div className="space-y-3">
          {education.map((entry) => (
            <div key={`${entry.school.name}-${entry.startDate}`}>
              <p>
                <strong>{formatDegree(entry)}</strong>
              </p>
              <p>{entry.school.name}</p>
              <p>
                {formatYearMonthRange(entry.startDate, entry.endDate)}
                {isInProgress(entry) && " (Expected)"}
              </p>
            </div>
          ))}
          {awards.length > 0 && (
            <div>
              <p>
                <strong>Academic Recognitions:</strong>
              </p>
              <BulletList>
                {awards.map((award) => (
                  <li key={award.name}>
                    <strong>
                      {award.occurrences.length}× {award.name}
                    </strong>{" "}
                    –{" "}
                    {award.description ? (
                      <RichText text={award.description} />
                    ) : (
                      award.occurrences.join(", ")
                    )}
                  </li>
                ))}
              </BulletList>
            </div>
          )}
        </div>
      </ResumeSection>

      <ResumeSection title="Technical Skills" avoidBreak>
        <BulletList>
          {resume.technicalSkills.map((group) => (
            <li key={group.category}>
              <strong>{group.category}:</strong> {group.items.join(", ")}
            </li>
          ))}
        </BulletList>
      </ResumeSection>

      <ResumeSection title="Languages" avoidBreak>
        <BulletList>
          {resume.languages.map((language) => (
            <li key={language.name}>
              <strong>{language.name}:</strong> {language.level}
            </li>
          ))}
        </BulletList>
      </ResumeSection>
    </article>
  );
}

function ResumeSection({
  title,
  avoidBreak = false,
  children,
}: {
  title: string;
  /** Keep the whole section on one page when printing (for short sections). */
  avoidBreak?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={cn("mt-4 space-y-2", avoidBreak && "break-inside-avoid")}
    >
      <h2 className="break-after-avoid border-b-2 border-neutral-900 pb-0.5 text-[11pt] font-bold tracking-wide uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ children }: { children: ReactNode }) {
  return <ul className="list-['–__'] space-y-1.5 pl-5">{children}</ul>;
}

function DescriptionBlock({ description }: { description: Description }) {
  return (
    <div className="space-y-1">
      {description.paragraphs.map((paragraph, index) => (
        <p key={index} className="break-after-avoid">
          <RichText text={paragraph} />
        </p>
      ))}
      {description.highlights.length > 0 && (
        <BulletList>
          {description.highlights.map((highlight, index) => (
            <li key={index} className="break-inside-avoid">
              <RichText text={highlight} />
            </li>
          ))}
        </BulletList>
      )}
    </div>
  );
}
