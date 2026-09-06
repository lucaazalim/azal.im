import Item from "@/app/(home)/_components/Item";
import SectionTitle from "@/app/(home)/_components/SectionTitle";
import RichText from "@/app/_components/RichText";
import { awards } from "@/lib/awards/awards";

export default function Awards() {
  return (
    <section id="awards" className="group/section scroll-mt-24 space-y-10">
      <SectionTitle>Awards</SectionTitle>

      {awards.map((award) => (
        <Item
          key={award.name}
          badge={`${award.occurrences.length}×`}
          title={award.name}
          subtitle={award.issuer}
          link={award.url}
        >
          {award.description && (
            <p>
              <RichText text={award.description} />
            </p>
          )}
          <ul className="list-disc space-y-1 pl-5">
            {award.occurrences.map((occurrence) => (
              <li key={occurrence}>{occurrence}</li>
            ))}
          </ul>
        </Item>
      ))}
    </section>
  );
}
