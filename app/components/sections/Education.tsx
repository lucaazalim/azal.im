import Item from "@/app/components/Item";
import SectionTitle from "@/app/components/SectionTitle";

export default function Education() {
    return (
        <section id="education" className="scroll-mt-24 space-y-10">

            <SectionTitle>Education</SectionTitle>

            <Item
                fromYear={2023}
                toYear={2026}
                title="Bachelor's Degree in Software Engineering"
                subtitle="Pontifical Catholic University of Minas Gerais"
                link="https://pucminas.br"
            >
                <p>
                </p>
            </Item>
        </section>
    );
}