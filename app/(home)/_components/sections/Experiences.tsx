import Item from "@/app/(home)/_components/Item";
import SectionTitle from "@/app/(home)/_components/SectionTitle";

export default function Experiences() {
  return (
    <section id="experience" className="group/section scroll-mt-24 space-y-10">
      <SectionTitle>Experience</SectionTitle>

      <Item
        date="7/2025 – Present"
        title="Full-Stack Software Engineer"
        subtitle="Limestone Digital"
        link="https://limestonedigital.com"
        skills={["TypeScript", "Node.js", "React"]}
      />

      <Item
        date="6/2024 – 4/2025"
        title="Full-Stack Software Engineer"
        subtitle="90 Information Technology"
        link="https://noventa.com.br"
        skills={[
          "C#",
          ".NET",
          "TypeScript",
          "SQL",
          "React",
          "TailwindCSS",
          "Next.js",
        ]}
      >
        <ul className="list-disc space-y-3">
          <li>
            Led the development of a complete web platform connecting ERP's
            clients to suppliers of construction materials, using{" "}
            <strong>.NET 9, Next.js, PostgreSQL</strong>, and{" "}
            <strong>Docker</strong>.
          </li>
          <li>
            Promoted initiatives to{" "}
            <strong>modernize the company’s legacy systems</strong> and the
            adoption of a <strong>new stack of modern technologies</strong> for
            web project development.
          </li>
          <li>
            Planned and executed the migration of the company’s code
            repositories to GitHub, modernizing the development process and
            enabling <strong>code review</strong> and <strong>CI/CD</strong>{" "}
            flows.
          </li>
          <li>
            Contributed to the improvement of the company’s new institutional
            website, implementing a new{" "}
            <strong>optimized check-out experience</strong> for SaaS products, a
            modern institutional blog, and best practices for SEO and
            performance, in addition to integrating forms with a CRM for lead
            capture.
          </li>
          <li>
            Conceived and developed a knowledge base platform for publishing
            articles about the software products marketed by the company.
          </li>
        </ul>
      </Item>

      <Item
        date="2/2015 – 10/2022"
        title="CEO and Lead Developer"
        subtitle="Rede Sky"
        link="https://redesky.com"
        skills={[
          "Java",
          "SQL",
          "Bash",
          "Lua",
          "Redis",
          "MongoDB",
          "Grafana",
          "Linux",
          "DevOps",
        ]}
      >
        <ul className="list-disc space-y-3">
          <li>
            Led the company's operation for seven years, focusing on managing
            the technology area and growth strategies that led to{" "}
            <strong>16 million</strong> registered accounts,{" "}
            <strong>300,000</strong> monthly active players, and a national
            record of <strong>8,115</strong> players online simultaneously.
          </li>
          <li>
            Designed and scaled the company's systems to support loads of over{" "}
            <strong>8,000</strong> players online simultaneously, distributed
            across more than <strong>30 game modes</strong> developed and
            maintained by the company itself.
          </li>
          <li>
            Led the development of the first Minecraft game mode with
            distributed architecture in Brazil, which allowed more than{" "}
            <strong>1,000</strong> users to interact in a{" "}
            <strong>single virtual environment</strong>.
          </li>
          <li>
            Established best practices for development, architecture, and CI/CD
            that were applied to over <strong>250 code repositories</strong>,
            mostly in the <strong>Java</strong> language.
          </li>
        </ul>
      </Item>

      <Item
        date="2014 – 2015"
        title="Founder and Lead Developer"
        subtitle="Mineland Network"
        skills={["Java", "SQL", "Redis"]}
      >
        <p>
          Led a small team of three developers to build five different Minecraft
          game modes, peaking a total of 500 concurrent players.
        </p>
      </Item>
    </section>
  );
}
