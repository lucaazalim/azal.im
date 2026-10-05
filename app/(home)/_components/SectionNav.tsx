import {
  HOME_SECTIONS,
  HomeSectionId,
  sectionNumber,
} from "@/app/(home)/_components/home";

const sectionIds = Object.keys(HOME_SECTIONS) as HomeSectionId[];

/** In-page links to each homepage section. */
export default function SectionNav({ className }: { className?: string }) {
  return (
    <nav aria-label="Sections" className={className}>
      <ol>
        {sectionIds.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="group text-muted-foreground hover:text-foreground flex h-8 items-center gap-3 font-mono text-sm font-light uppercase transition-colors"
            >
              <span className="text-primary/80 text-xs">
                {sectionNumber(id)}
              </span>
              <span
                aria-hidden="true"
                className="bg-muted-foreground group-hover:bg-foreground h-px w-5 transition-all ease-in-out group-hover:w-10"
              />
              {HOME_SECTIONS[id]}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
