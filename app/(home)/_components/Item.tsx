import EntryHeader from "@/app/(home)/_components/EntryHeader";
import ExperienceSkills from "@/app/(home)/_components/ExperienceSkills";
import { ReactNode } from "react";

type Props = {
  date?: string;
  /** Shown under the date, e.g. `Expected`. */
  dateNote?: string;
  badge?: string;
  title: string;
  subtitle: string;
  link?: string;
  skills?: string[];
  children?: ReactNode;
};

export const itemCardClassName =
  "item-card border-foreground/10 relative border from-white/10 to-white/1 p-8 transition-all ease-in-out lg:border-transparent lg:group-has-[:where(.item-card:hover)]/section:opacity-50 lg:hover:border-t-white/20 lg:hover:border-b-black/50 lg:hover:border-l-white/20 lg:hover:bg-white/5 lg:hover:bg-linear-to-br lg:hover:opacity-100";

export default function Item({
  date,
  dateNote,
  badge,
  title,
  subtitle,
  link,
  skills,
  children,
}: Props) {
  return (
    <Link href={link}>
      <div className={itemCardClassName}>
        <div className="space-y-4">
          <EntryHeader
            title={title}
            subtitle={subtitle}
            badge={badge}
            dateRange={date}
            dateNote={dateNote}
          />
          {children && (
            <div className="text-muted-foreground space-y-4 text-sm">
              {children}
            </div>
          )}
          {skills && <ExperienceSkills skills={skills} />}
        </div>
      </div>
    </Link>
  );
}

function Link({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) {
    return children;
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
