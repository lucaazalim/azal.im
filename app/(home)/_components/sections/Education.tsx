import Item from "@/app/(home)/_components/Item";
import SectionTitle from "@/app/(home)/_components/SectionTitle";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 space-y-10 group/section">
      <SectionTitle>Education</SectionTitle>

      <Item
        date="2023 – 2026"
        title="Bachelor's Degree in Software Engineering"
        subtitle="Pontifical Catholic University of Minas Gerais"
        link="https://pucminas.br"
      >
        <p></p>
      </Item>
    </section>
  );
}
