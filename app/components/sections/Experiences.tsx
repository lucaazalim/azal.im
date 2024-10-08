import Item from "@/app/components/Item";
import SectionTitle from "@/app/components/SectionTitle";

export default function Experiences() {
    return (
        <section id="experience" className="scroll-mt-24 space-y-10 group/section">

            <SectionTitle>Experience</SectionTitle>

            <Item
                date="2024 – Present"
                title="Software Engineer Intern"
                subtitle="90 Information Technology"
                link="https://noventa.com.br"
                skills={["C#", ".NET", "TypeScript", "SQL", "React", "TailwindCSS", "Next.js"]}
            >
                <p>
                    I am currently leading the architecture and development of a comprehensive web platform
                    aimed at automating and optimizing processes for the ERP clients.
                </p>
            </Item>

            <Item
                date="2015 – 2022"
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