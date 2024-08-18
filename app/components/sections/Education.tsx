import Experience from "@/app/components/Experience";

export default function Education() {
    return (
        <section id="education" className="scroll-mt-24 space-y-10">
            <h1 className="text-xl">Education</h1>
            <Experience
                fromYear={2023}
                toYear={2026}
                title="Bachelor's Degree in Software Engineering"
                institution="Pontifical Catholic University of Minas Gerais"
                link="https://pucminas.br"
            >
                <p>
                </p>
            </Experience>
        </section>
    );
}