import Award from "@/app/components/Award";

export default function Awards() {
    return (
        <section id="honors" className="scroll-mt-24 space-y-10">
            <h1 className="text-xl">Awards</h1>
            <Award
                year={2024}
                title="Academic Excellence Award"
                institution="Pontifical Catholic University of Minas Gerais"
                count={2}
            >
                <p>
                    I was awarded the Academic Excellence Award twice in a row. This award is given to a single student
                    every semester.
                </p>
            </Award>
            <Award
                year={2024}
                title="Outstanding Project Award"
                institution="Pontifical Catholic University of Minas Gerais"
                count={3}
            >
                <p>
                    The teams I led were awarded the Outstanding Project Award three times in a row. This award is given
                    to a single team every semester.
                </p>
            </Award>
        </section>
    );
}