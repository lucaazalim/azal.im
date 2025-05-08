import SectionTitle from "@/app/_components/SectionTitle";
import Item from "@/app/_components/Item";

export default function Awards() {
  return (
    <section id="awards" className="scroll-mt-24 space-y-10 group/section">
      <SectionTitle>Awards</SectionTitle>

      <Item
        date="2024"
        title="Academic Excellence Award"
        subtitle="Pontifical Catholic University of Minas Gerais"
        badge="2x"
        link="https://www.linkedin.com/posts/lucaazalim_como-compartilhei-recentemente-por-aqui-activity-7177182303314460672-xNfd?utm_source=share&utm_medium=member_desktop"
      >
        <p>
          I was awarded the Academic Excellence Award twice in a row. This award
          is given to a single student every semester.
        </p>
      </Item>

      <Item
        date="2024"
        title="Outstanding Project Award"
        subtitle="Pontifical Catholic University of Minas Gerais"
        badge="3x"
        link="https://www.linkedin.com/posts/lucaazalim_certificado-de-destaque-acad%C3%AAmico-1%C2%BA2024-activity-7229986810079133697-1JQx?utm_source=share&utm_medium=member_desktop"
      >
        <p>
          The teams I led were awarded the Outstanding Project Award three times
          in a row. This award is given to a single team every semester.
        </p>
      </Item>
    </section>
  );
}
