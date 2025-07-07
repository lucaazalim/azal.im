import Item from "@/app/(home)/_components/Item";
import SectionTitle from "@/app/(home)/_components/SectionTitle";
import { routes } from "@/lib/constants";

export default function Projects() {
  return (
    <section id="projects" className="group/section scroll-mt-24 space-y-10">
      <SectionTitle>Projects</SectionTitle>
      <Item
        date="2025 – 2025"
        image="/projects/pollmodoro.png"
        title="Pollmodoro"
        link="https://github.com/lucaazalim/pollmodoro"
        subtitle="Personal project"
        skills={[
          "TypeScript",
          "Svelte",
          "SvelteKit",
          "TailwindCSS",
          "CloudFlare Workers",
          "Durable Objects",
        ]}
      >
        <p>
          Pollmodoro is an open-source, real-time polling platform built with
          SvelteKit and Cloudflare Workers. It allows users to create and share
          polls instantly, with results updated live via WebSockets and polls
          stored in the edge. The project highlights my expertise in modern web
          technologies, serverless architecture, and real-time interactivity.
        </p>
      </Item>
      <Item
        date="2024 – 2025"
        image="/projects/90ti-docs/1.png"
        title="90TI Docs"
        link={routes.projects["90ti-docs"]}
        subtitle="90 Information Technology"
        skills={["TypeScript", "Next.js", "TailwindCSS", "PWA"]}
      >
        <p>
          I developed the 90TI Docs, a comprehensive knowledge base and
          documentation platform for 90TI, a Brazilian software company
          specializing in construction management solutions.
        </p>
      </Item>
      <Item
        date="2015 – 2022"
        image="/projects/redesky.png"
        title="Rede Sky"
        link="https://redesky.com"
        subtitle="Largest Minecraft network in Brazil"
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
        <p>
          Rede Sky was the largest Minecraft community in Brazil, reaching over
          300,000 active players per month and setting a national record of
          8,115 concurrent players online. In total, more than 16 million
          players engaged with the game modes launched by the company.
        </p>
      </Item>
      <Item
        date="2024 – 2025"
        image="/projects/portal-do-fornecedor.png"
        title="Portal do Fornecedor (Supplier Portal)"
        link="https://fornecedor.noventa.com.br"
        subtitle="90 Information Technology"
        skills={[
          "C#",
          ".NET",
          "Entity Framework",
          "PostgreSQL",
          "TypeScript",
          "Next.js",
          "TailwindCSS",
          "Docker",
        ]}
      >
        <p>
          I developed the Supplier Portal for 90 TI — a web application designed
          to streamline and enhance the relationship between ERP clients and
          their suppliers, facilitating more efficient communication and
          collaboration.
        </p>
      </Item>
      <Item
        date="2023 – 2024"
        image="/projects/webtech.png"
        title="WebTech"
        link="https://webtech.network"
        subtitle="Pontifical Catholic University of Minas Gerais"
        skills={[
          "JavaScript",
          "SQL",
          "Node.js",
          "Next.js",
          "TailwindCSS",
          "Docker",
        ]}
      >
        <p>
          It was an honor to volunteer for the WebTech extension project for one
          year. I was responsible for developing the project's website and
          contributed to other initiatives as well.
        </p>
      </Item>
      <Item
        date="2024"
        image="/projects/boutique-das-carnes.png"
        title="Boutique das Carnes"
        link="https://github.com/lucaazalim/boutique-das-carnes"
        subtitle="Interdisciplinary Project: Web Applications"
        skills={[
          "JavaScript",
          "SQL",
          "MariaDB",
          "Node.js",
          "Sequelize",
          "React",
          "Next.js",
          "TailwindCSS",
          "Docker",
        ]}
      >
        <p>
          Along with my team, I developed a web application that allowed
          Boutique das Carnes to manage its operation, including inventory
          management and order processing.
        </p>
      </Item>
      <Item
        date="2024"
        image="/projects/novas.png"
        title="Novas"
        link="https://github.com/lucaazalim/novas"
        subtitle="Personal Project"
        skills={[
          "JavaScript",
          "SQL",
          "MariaDB",
          "Node.js",
          "Sequelize",
          "React",
          "Next.js",
          "TailwindCSS",
          "Docker",
        ]}
      >
        <p>
          Novas is an open-source news website built with Next.js and
          TailwindCSS. It uses the News API to fetch the latest news from around
          the world.{" "}
        </p>
      </Item>
      <Item
        date="2023"
        image="/projects/morada.png"
        title="Morada"
        link="https://github.com/lucaazalim/tiapn-morada"
        subtitle="Interdisciplinary Project: Applications for Business Processes"
        skills={[
          "Java",
          "Spring Boot",
          "Docker",
          "Grafana",
          "HTML",
          "CSS",
          "Bootstrap 5",
        ]}
      >
        <p>
          Morada is a platform for property rental and listing that streamlines
          the rental process for both tenants and landlords, offering an
          efficient, centralized solution for listings, processes, and
          documentation.
        </p>
      </Item>
    </section>
  );
}
