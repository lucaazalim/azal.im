import Experience from "@/app/components/Experience";

export default function Experiences() {
    return (
        <section id="experience" className="scroll-mt-24 space-y-10">

            <h1 className="text-xl">Experience</h1>

            <Experience
                fromYear={2024}
                title="Software Engineer Intern"
                institution="90 Information Technology"
                link="https://noventa.com.br"
                skills={["C#", ".NET", "TypeScript", "SQL", "React", "TailwindCSS", "Next.js"]}
            >
                <p>
                    I am currently leading the architecture and development of a comprehensive web platform
                    aimed at optimizing processes. I am building RESTful APIs using
                    .NET and C#, and front-end interfaces with TypeScript, Next.js, and TailwindCSS.
                </p>
            </Experience>

            <Experience
                fromYear={2015}
                toYear={2022}
                title="CEO and Lead Developer"
                institution="Rede Sky"
                link="https://redesky.com"
                skills={["Java", "SQL", "Redis", "MongoDB", "Grafana", "Linux", "DevOps"]}
            >
                <p>
                    Led the largest Minecraft server network and community in Brazil, with over 16 million
                    registered users and a peak of 300,000 active players per month. Achieved the national
                    record of 8,115 concurrent players.
                </p>
                <p>
                    Focused on strategic decision-making and IT management, overseeing company operations for
                    seven years. Recruited and led a team of 10 developers, game designers, and project
                    managers. Directed over 50 projects involving development, launch, marketing, and ongoing
                    support.
                </p>
            </Experience>

            <Experience
                fromYear={2014}
                toYear={2015}
                title="Founder and Lead Developer"
                institution="Mineland Network"
                skills={["Java", "SQL", "Redis"]}
            >
                <p>
                    Led a small team of three developers to build five different Minecraft game modes, peaking a
                    total of 500 concurrent players.
                </p>
            </Experience>

        </section>
    );
}