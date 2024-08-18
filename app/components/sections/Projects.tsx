import Project from "@/app/components/Project";

export default function Projects() {
    return (
        <section id="projects" className="scroll-mt-24 space-y-10">
            <h1 className="text-xl">Projects</h1>
            <Project
                fromYear={2023}
                toYear={2024}
                image="/projects/webtech.png"
                title="WebTech"
                link="https://webtech.network"
                institution="Pontifical Catholic University of Minas Gerais"
                skills={["JavaScript", "SQL", "Node.js", "Next.js", "TailwindCSS", "Docker"]}
            >
                <p>
                    It was an honor to volunteer for the WebTech extension project for one year. I was responsible for
                    developing the project's website and contributed to other initiatives as well.
                </p>
            </Project>
            <Project
                fromYear={2024}
                toYear={2024}
                image="/projects/boutique-das-carnes.png"
                title="Boutique das Carnes"
                link="https://github.com/lucaazalim/boutique-das-carnes"
                institution="Pontifical Catholic University of Minas Gerais"
                skills={["JavaScript", "SQL", "MariaDB", "Node.js", "Sequelize", "React", "Next.js", "TailwindCSS", "Docker"]}
            >
                <p>
                    Along with my team, I developed a web application that allowed Boutique das Carnes to manage its
                    operation, including inventory management and order processing.
                </p>
            </Project>
            <Project
                fromYear={2024}
                toYear={2024}
                image="/projects/novas.png"
                title="Novas"
                link="https://github.com/lucaazalim/novas"
                institution="Personal Project"
                skills={["JavaScript", "SQL", "MariaDB", "Node.js", "Sequelize", "React", "Next.js", "TailwindCSS", "Docker"]}
            >
                <p>
                    Novas is an open-source news website built with Next.js and TailwindCSS. It uses the News API to
                    fetch the latest news from around the world. </p>
            </Project>
        </section>
    );
}