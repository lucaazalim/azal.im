import Item from "@/app/_components/home/Item";
import SectionTitle from "@/app/_components/home/SectionTitle";

export default function Experiences() {
    return (
        <section id="experience" className="scroll-mt-24 space-y-10 group/section">

            <SectionTitle>Experience</SectionTitle>

            <Item
                date="1/2025 - Present"
                title="Mid-Level Software Developer"
                subtitle="90 Information Technology"
                link="https://noventa.com.br"
                skills={["C#", ".NET", "TypeScript", "SQL", "React", "TailwindCSS", "Next.js"]}
            />

            <Item
                date="6/2024 - 12/2024"
                title="Software Developer Intern"
                subtitle="90 Information Technology"
                link="https://noventa.com.br"
                skills={["C#", ".NET", "TypeScript", "SQL", "React", "TailwindCSS", "Next.js"]}
            >
                <ul className="list-disc space-y-3">
                    <li>Designed and developed a platform connecting 90 TI ERP clients with construction material
                        suppliers, modernizing the company's tech stack and boosting team productivity.
                    </li>
                    <li>Introduced a new development stack used in all recent projects, reducing infrastructure costs
                        and improving efficiency.
                    </li>
                    <li>Enhanced the company website with an optimized SaaS checkout, modern blog, improved SEO, and
                        CRM-integrated lead capture forms.
                    </li>
                    <li>Built a knowledge base platform to centralize and share product documentation.</li>
                    <li>Led the migration from SVN to Git/GitHub, enabling code reviews and CI/CD workflows for
                        modernized development processes.
                    </li>
                </ul>

            </Item>

            <Item
                date="2/2015 – 10/2022"
                title="CEO and Lead Developer"
                subtitle="Rede Sky"
                link="https://redesky.com"
                skills={["Java", "SQL", "Bash", "Lua", "Redis", "MongoDB", "Grafana", "Linux", "DevOps"]}
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
            </Item>

            <Item
                date="2014 – 2015"
                title="Founder and Lead Developer"
                subtitle="Mineland Network"
                skills={["Java", "SQL", "Redis"]}
            >
                <p>
                    Led a small team of three developers to build five different Minecraft game modes, peaking a
                    total of 500 concurrent players.
                </p>
            </Item>

        </section>
    );
}