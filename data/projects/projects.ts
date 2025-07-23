import { Project } from "@/lib/projects/types";

export const projects: Project[] = [
  {
    startedAt: new Date("2025-01-01"),
    endedAt: new Date("2025-12-31"),
    image: ["/projects/pollmodoro.png"],
    title: "Pollmodoro",
    subtitle: "Personal project",
    description:
      "Pollmodoro is an open-source, real-time polling platform built with SvelteKit and Cloudflare Workers. It allows users to create and share polls instantly, with results updated live via WebSockets and polls stored in the edge. The project highlights my expertise in modern web technologies, serverless architecture, and real-time interactivity.",
    skills: [
      "TypeScript",
      "Svelte",
      "SvelteKit",
      "TailwindCSS",
      "CloudFlare Workers",
      "Durable Objects",
    ],
    urls: {
      sourceCode: "https://github.com/lucaazalim/pollmodoro",
    },
  },
  {
    startedAt: new Date("2024-01-01"),
    endedAt: new Date("2025-12-31"),
    image: ["/projects/90ti-docs/1.png"],
    title: "90TI Docs",
    subtitle: "90 Information Technology",
    description:
      "I developed the 90TI Docs, a comprehensive knowledge base and documentation platform for 90TI, a Brazilian software company specializing in construction management solutions.",
    skills: ["TypeScript", "Next.js", "TailwindCSS", "PWA"],
    urls: {
      specialPage: "/projects/90ti-docs",
      live: "https://docs.noventa.com.br",
    },
  },
  {
    startedAt: new Date("2015-01-01"),
    endedAt: new Date("2022-12-31"),
    image: ["/projects/redesky.png"],
    title: "Rede Sky",
    subtitle: "Largest Minecraft network in Brazil",
    description:
      "Rede Sky was the largest Minecraft community in Brazil, reaching over 300,000 active players per month and setting a national record of 8,115 concurrent players online. In total, more than 16 million players engaged with the game modes launched by the company.",
    skills: [
      "Java",
      "SQL",
      "Bash",
      "Lua",
      "Redis",
      "MongoDB",
      "Grafana",
      "Linux",
      "DevOps",
    ],
    urls: {
      live: "https://redesky.com",
    },
  },
  {
    startedAt: new Date("2024-01-01"),
    endedAt: new Date("2025-12-31"),
    image: ["/projects/portal-do-fornecedor.png"],
    title: "Portal do Fornecedor (Supplier Portal)",
    subtitle: "90 Information Technology",
    description:
      "I developed the Supplier Portal for 90 TI — a web application designed to streamline and enhance the relationship between ERP clients and their suppliers, facilitating more efficient communication and collaboration.",
    skills: [
      "C#",
      ".NET",
      "Entity Framework",
      "PostgreSQL",
      "TypeScript",
      "Next.js",
      "TailwindCSS",
      "Docker",
    ],
    urls: {
      live: "https://fornecedor.noventa.com.br",
    },
  },
  {
    startedAt: new Date("2023-01-01"),
    endedAt: new Date("2024-12-31"),
    image: ["/projects/webtech.png"],
    title: "WebTech",
    subtitle: "Pontifical Catholic University of Minas Gerais",
    description:
      "It was an honor to volunteer for the WebTech extension project for one year. I was responsible for developing the project's website and contributed to other initiatives as well.",
    skills: [
      "JavaScript",
      "SQL",
      "Node.js",
      "Next.js",
      "TailwindCSS",
      "Docker",
    ],
    urls: {
      live: "https://webtech.network",
    },
  },
  {
    startedAt: new Date("2024-01-01"),
    endedAt: new Date("2024-12-31"),
    image: ["/projects/boutique-das-carnes.png"],
    title: "Boutique das Carnes",
    subtitle: "Interdisciplinary Project: Web Applications",
    description:
      "Along with my team, I developed a web application that allowed Boutique das Carnes to manage its operation, including inventory management and order processing.",
    skills: [
      "JavaScript",
      "SQL",
      "MariaDB",
      "Node.js",
      "Sequelize",
      "React",
      "Next.js",
      "TailwindCSS",
      "Docker",
    ],
    urls: {
      sourceCode: "https://github.com/lucaazalim/boutique-das-carnes",
    },
  },
  {
    startedAt: new Date("2024-01-01"),
    endedAt: new Date("2024-12-31"),
    image: ["/projects/novas.png"],
    title: "Novas",
    subtitle: "Personal Project",
    description:
      "Novas is an open-source news website built with Next.js and TailwindCSS. It uses the News API to fetch the latest news from around the world.",
    skills: [
      "JavaScript",
      "SQL",
      "MariaDB",
      "Node.js",
      "Sequelize",
      "React",
      "Next.js",
      "TailwindCSS",
      "Docker",
    ],
    urls: {
      sourceCode: "https://github.com/lucaazalim/novas",
    },
  },
  {
    startedAt: new Date("2023-01-01"),
    endedAt: new Date("2023-12-31"),
    image: ["/projects/morada.png"],
    title: "Morada",
    subtitle: "Interdisciplinary Project: Applications for Business Processes",
    description:
      "Morada is a platform for property rental and listing that streamlines the rental process for both tenants and landlords, offering an efficient, centralized solution for listings, processes, and documentation.",
    skills: [
      "Java",
      "Spring Boot",
      "Docker",
      "Grafana",
      "HTML",
      "CSS",
      "Bootstrap 5",
    ],
    urls: {
      sourceCode: "https://github.com/lucaazalim/tiapn-morada",
    },
  },
];
