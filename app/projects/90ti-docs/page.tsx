import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
import ProjectDesktopImage from "../_components/ProjectDesktopImage";
import ProjectImageCarousel from "../_components/ProjectImageCarousel";
import ProjectMain from "../_components/ProjectMain";
import ProjectMobileImage from "../_components/ProjectMobileImage";
import ProjectPageHeader from "../_components/ProjectPageHeader";
import ProjectPageWrapper from "../_components/ProjectPageWrapper";
import ProjectSection from "../_components/ProjectSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "90TI Docs",
  description: "A comprehensive knowledge base and documentation platform for 90TI. Built with Next.js, featuring Git as CMS, custom MDX components, and PWA capabilities.",
  openGraph: {
    title: "90TI Docs - Luca Azalim",
    description: "A comprehensive knowledge base and documentation platform for 90TI. Built with Next.js, featuring Git as CMS, custom MDX components, and PWA capabilities.",
    url: "https://azal.im/projects/90ti-docs",
    type: "website",
  },
  twitter: {
    title: "90TI Docs - Luca Azalim",
    description: "A comprehensive knowledge base and documentation platform for 90TI. Built with Next.js, featuring Git as CMS, custom MDX components, and PWA capabilities.",
  },
};

export default function Page() {
  return (
    <ProjectPageWrapper>
      <ProjectPageHeader>
        <PageHeaderTitle>90TI Docs</PageHeaderTitle>
        <PageHeaderDescription>
          A comprehensive knowledge base and documentation platform for 90TI.
        </PageHeaderDescription>
      </ProjectPageHeader>
      <ProjectMain>
        <ProjectSection>
          <h2>Summary</h2>
          <p>
            90TI Docs is a comprehensive knowledge base and documentation
            platform I developed as a Software Developer at{" "}
            <a href="https://noventa.com.br">90TI</a>, a Brazilian software
            company specializing in construction management solutions. Built
            with Next.js, the platform serves as a centralized hub for all
            public software documentation, making complex technical information
            easily accessible to both users and prospective clients.
          </p>
          <div className="flex justify-between gap-5">
            <div>
              <h4>PERIOD</h4>
              2024 – 2025
            </div>
            <div>
              <h4>STACK</h4>
              <ul>
                <li>React.js</li>
                <li>Next.js</li>
                <li>Shadcn/ui</li>
                <li>TailwindCSS</li>
              </ul>
            </div>
            <div>
              <h4>LIVE</h4>
              <a href="https://docs.noventa.com.br" target="_blank">
                90TI Docs
              </a>
            </div>
          </div>
        </ProjectSection>
        <ProjectDesktopImage
          src="/projects/90ti-docs/1.png"
          alt="Home screen of 90TI Docs"
        />
        <ProjectSection>
          <h2>My role</h2>
          <p>
            I was responsible for the entire development of the 90TI Docs
            platform, from initial concept to production deployment.
            Additionally, I mentored the QA team on best practices for authoring
            and maintaining documentation articles.
          </p>
          <h2>Motivation</h2>
          <p>
            The project emerged from a critical business need at 90TI. The
            company's software documentation was scattered across multiple
            platforms, making it difficult for users to find answers to their
            questions. This resulted in increased support tickets and user
            frustration. As the company's product portfolio expanded, the need
            for a centralized, searchable knowledge base became paramount.
          </p>
          <h2>Technical Planning</h2>
          <p>
            I began by analyzing the existing documentation structure and
            feedback from both team members and clients to understand pain
            points. The initial design focused on:
          </p>
          <ul>
            <li>
              <b>Information architecture: </b>
              Hierarchical organization that mirrors how users think about the
              products and their features.
            </li>
            <li>
              <b>UX: </b>The documentation must allow fast navigation and quick
              access to information, even with a large number of articles.
            </li>
            <li>
              <b>Maintainability: </b> The documentation must be easy to
              maintain, and also migrate to another platform if needed in the
              future.
            </li>
          </ul>
        </ProjectSection>
        <ProjectSection>
          <h2>UI</h2>
          <p>
            The UI design was crafted to be clean, modern, and user-friendly,
            with a focus on readability and ease of navigation. Key features
            include:
          </p>
          <ul>
            <li>
              <b>Responsive design:</b> Ensures a seamless experience across
              devices, from desktops to mobile phones.
            </li>
            <li>
              <b>Dark and ligt mode:</b> A toggle for dark and light mode,
              catering to user preferences and improving accessibility.
            </li>
            <li>
              <b>Semantic HTML:</b> The documentation is structured using
              semantic HTML elements, enhancing accessibility and SEO.
            </li>
          </ul>
        </ProjectSection>
        <ProjectDesktopImage
          src="/projects/90ti-docs/2.png"
          alt="Sample article published in 90TI Docs"
        />
        <ProjectDesktopImage
          src="/projects/90ti-docs/4.png"
          alt="Light mode for those who prefer it"
        />
        <ProjectSection>
          <h2>Git as CMS</h2>
          <p>
            During team discussions, we recognized the importance of enabling
            both developers and less-technical team members to contribute to the
            documentation. At the same time, we needed a reliable way to manage
            version control and implement a review workflow.
          </p>
          <p>
            To address these needs, instead of building some kind of CMS or
            using an existing one, we adopted the "Git as CMS" approach. By
            storing our documentation in a Git repository, we benefit from
            powerful versioning capabilities and seamless collaboration across
            the team.
          </p>
          <p>
            Every documentation article is stored as a <b>MDX file</b>, allowing
            us to write content in Markdown while also embedding React
            components for interactive elements. This approach not only
            simplifies the writing process but also enhances the user experience
            by enabling custom documentation components.
          </p>
        </ProjectSection>
        <ProjectSection>
          <h2>Custom components for special articles</h2>
          <p>
            Leveraging the power of MDX, we enhanced the user experience by
            embedding custom React components directly into the documentation.
            One example is the "Brand Guidelines" article, which features custom
            components to display brand colors and all brand and product logos.
          </p>
        </ProjectSection>
        <ProjectDesktopImage
          src="/projects/90ti-docs/3.png"
          alt="Brand guidelines article in 90TI Docs"
        />
        <ProjectSection>
          <h2>Search engine</h2>
          <p>
            To ensure users can quickly find the information they need, I
            implemented a simple but effective search engine. This allows for
            fast, full-text search across all documentation articles.
          </p>
          <p>
            In the future, this can be replaced with a more advanced solution,
            such as <a href="https://www.algolia.com/">Algolia</a> or{" "}
            <a href="https://www.meilisearch.com/">Meilisearch</a>, to further
            enhance search capabilities and performance.
          </p>
        </ProjectSection>
        <ProjectDesktopImage
          src="/projects/90ti-docs/5.png"
          alt="Brand guidelines article in 90TI Docs"
        />
        <ProjectSection>
          <h2>SSG and CI/CD</h2>
          <p>
            The documentation platform is built using Next.js, which allows for
            Static Site Generation (SSG). This means that all documentation
            articles are pre-rendered at build time, ensuring fast load times
            and optimal performance.
          </p>
          <p>
            The CI/CD pipeline is set up to automatically build and deploy the
            documentation whenever changes are pushed to the main branch of the
            Git repository. This ensures that the latest documentation is always
            available to users without manual intervention.
          </p>
        </ProjectSection>
        <ProjectSection>
          <h2>PWA for mobile users</h2>
          <p>
            One of the requirements for the project was to ensure that mobile
            and tablet users could access the documentation easily. To achieve
            this, the platform was made available as a Progressive Web App
            (PWA). This allows users to install the documentation on their
            devices, providing a native app-like experience with offline access
            and fast loading times.
          </p>
        </ProjectSection>
        <ProjectImageCarousel>
          <ProjectMobileImage
            src="/projects/90ti-docs/6.jpeg"
            alt="Sidebar navigation in 90TI Docs on a mobile device"
          />
          <ProjectMobileImage
            src="/projects/90ti-docs/7.jpeg"
            alt="Article in 90TI Docs on a mobile device"
          />
        </ProjectImageCarousel>
        <ProjectSection>
          <h2>Main takeaways</h2>
          <p>
            The 90TI Docs project was a significant achievement that addressed a
            critical business need. By centralizing documentation and making it
            easily accessible, we reduced support tickets and improved user
            satisfaction. The use of Git as a CMS allowed for efficient
            collaboration and version control, while the custom components and
            search engine enhanced the overall user experience.
          </p>
        </ProjectSection>
      </ProjectMain>
    </ProjectPageWrapper>
  );
}
