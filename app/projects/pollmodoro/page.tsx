import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
import { BASE_URL, ROUTES } from "@/lib/constants";
import { Metadata } from "next";
import MacOSImageFrame from "../../_components/MacOSImageFrame";
import ProjectMain from "../_components/ProjectMain";
import ProjectPageHeader from "../_components/ProjectPageHeader";
import ProjectPageWrapper from "../_components/ProjectPageWrapper";
import ProjectSection from "../_components/ProjectSection";
import ArchitectureDiagram from "./_components/ArchitectureDiagram";

export const metadata: Metadata = {
  title: "Pollmodoro",
  description:
    "An open-source, real-time polling platform built with SvelteKit, Cloudflare Workers and Durable Objects, with one stateful object per poll.",
  openGraph: {
    title: "Pollmodoro - Luca Azalim",
    description:
      "An open-source, real-time polling platform built with SvelteKit, Cloudflare Workers and Durable Objects, with one stateful object per poll.",
    url: BASE_URL + ROUTES.projects("pollmodoro"),
    type: "website",
  },
  twitter: {
    title: "Pollmodoro - Luca Azalim",
    description:
      "An open-source, real-time polling platform built with SvelteKit, Cloudflare Workers and Durable Objects, with one stateful object per poll.",
  },
};

export default function Page() {
  return (
    <ProjectPageWrapper>
      <ProjectPageHeader>
        <PageHeaderTitle>Pollmodoro</PageHeaderTitle>
        <PageHeaderDescription>
          A real-time polling platform that runs entirely on Cloudflare&apos;s
          network.
        </PageHeaderDescription>
      </ProjectPageHeader>
      <ProjectMain>
        <ProjectSection>
          <h2>Summary</h2>
          <p>
            Pollmodoro is an open-source poll maker with no sign-up: write a
            question, add up to ten options and share the link. Results update
            live for everyone looking at the poll. It is built with SvelteKit
            and runs on Cloudflare Workers, with each poll stored in its own
            Durable Object.
          </p>
          <div className="flex justify-between gap-5">
            <div>
              <h4>PERIOD</h4>
              2025 – 2026
            </div>
            <div>
              <h4>STACK</h4>
              <ul>
                <li>Svelte</li>
                <li>SvelteKit</li>
                <li>Cloudflare Workers</li>
                <li>Durable Objects</li>
                <li>TailwindCSS</li>
              </ul>
            </div>
            <div>
              <h4>LINKS</h4>
              <ul>
                <li>
                  <a href="https://pollmodoro.com" target="_blank">
                    Live
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/lucaazalim/pollmodoro"
                    target="_blank"
                  >
                    Source code
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ProjectSection>
        <MacOSImageFrame
          src="/projects/pollmodoro/1.png"
          alt="Home screen of Pollmodoro"
          width={1280}
          height={720}
        />
        <ProjectSection>
          <h2>Motivation</h2>
          <p>
            When I started Pollmodoro, there were two technologies I was very
            curious about: <b>Cloudflare&apos;s developer platform</b> and{" "}
            <b>Svelte</b>. Reading docs only gets you so far, so I wanted to
            experiment with them on a project small enough to finish but real
            enough to run into the interesting problems.
          </p>
          <p>
            Pollmodoro is that project. To be honest, a polling app doesn&apos;t
            really need this kind of infrastructure: a single server and a
            regular database would serve it just as well. I picked it because it
            is simple, yet still touches the parts I wanted to explore: shared
            state that many people write to, vote counts that must never be
            wrong, and results that update live for everyone watching.
          </p>
        </ProjectSection>
        <ProjectSection>
          <h2>Cloudflare Workers</h2>
          <p>
            Workers is Cloudflare&apos;s serverless platform. Instead of giving
            each application its own container or virtual machine, the Workers
            runtime runs code inside <b>V8 isolates</b>, the same sandboxing
            mechanism Chrome uses to keep browser tabs apart. Isolates are cheap
            enough that a single process can host thousands of applications, so
            Cloudflare can run every Worker on machines across its whole global
            network, in hundreds of cities. A request is handled by a data
            center close to whoever made it.
          </p>
          <p>
            Pollmodoro has two Workers: the SvelteKit app, which renders pages
            on the server, and the API, built with tRPC. Each is deployed with a
            single Wrangler command, and neither has a server I need to manage.
          </p>
          <p>
            The catch is that Workers are <b>stateless</b>. Two votes on the
            same poll may be handled by two different Workers on different
            continents, which share no memory. The votes need to be stored
            somewhere they can be counted consistently.
          </p>
          <h2>Durable Objects</h2>
          <p>
            Durable Objects are Cloudflare&apos;s answer to state. A Durable
            Object is an instance of a JavaScript class with a{" "}
            <b>globally unique name</b>. Any Worker, anywhere, can get a
            reference to it by name and call its methods as if it were a local
            object. Cloudflare guarantees that only one instance with a given
            name exists in the world at any time. It runs in a single location,
            on a single thread, and has its own private <b>SQLite database</b>{" "}
            stored on the same machine.
          </p>
          <p>
            In Pollmodoro, <b>every poll is a Durable Object</b>. When someone
            creates a poll, the API generates a random ID and uses it as the
            object&apos;s name. That object stores the poll, its options and
            every vote in its own database. Because it handles one request at a
            time, checking whether a poll is closed, validating the options and
            recording a vote happen with no race conditions and no locks.
          </p>
        </ProjectSection>
        <MacOSImageFrame
          src="/projects/pollmodoro/2.png"
          alt="Creating a poll in Pollmodoro"
          width={1280}
          height={720}
        />
        <ProjectSection>
          <h2>A distributed architecture</h2>
          <p>
            Put together, Workers and Durable Objects form an unusual kind of
            distributed system. Compute runs everywhere, but each piece of state
            has exactly one home.
          </p>
        </ProjectSection>
        <ArchitectureDiagram />
        <ProjectSection>
          <ul>
            <li>
              <b>Placement: </b>A Durable Object is created in a data center
              close to where it is first requested, which for Pollmodoro is the
              person creating the poll. It stays there, and requests from
              anywhere else travel to it.
            </li>
            <li>
              <b>Trade-off: </b>All of a poll&apos;s traffic goes through one
              single-threaded object, with a soft limit of about 1,000 requests
              per second. That is what keeps the counts consistent, but it also
              caps how fast a single poll can take votes. A poll shared during a
              big livestream could hit that limit.
            </li>
            <li>
              <b>Scaling: </b>There is no limit on how many objects exist. Since
              polls are independent, the platform scales horizontally by having
              more polls, not bigger servers.
            </li>
          </ul>
          <h2>Real-time results</h2>
          <p>
            Since a poll&apos;s Durable Object is the single place every vote
            goes through, it is also the natural place to push live updates.
            Everyone viewing a poll opens a WebSocket that the Worker forwards
            to the poll&apos;s object. Whenever a vote is recorded, the object
            sends the new results to all connected browsers.
          </p>
          <p>
            The connections use Cloudflare&apos;s <b>WebSocket Hibernation</b>{" "}
            API. Most of the time a poll is idle, with people looking at it and
            nobody voting. With hibernation, Cloudflare can evict the object
            from memory while the connections stay open, and wakes it up again
            when there is something to do. Idle polls don&apos;t accrue duration
            charges.
          </p>
        </ProjectSection>
        <MacOSImageFrame
          src="/projects/pollmodoro/3.png"
          alt="Poll with live results"
          width={1280}
          height={720}
        />
        <ProjectSection>
          <h2>Svelte</h2>
          <p>
            On the frontend, Pollmodoro was my first real project with Svelte.
            Svelte is a compiler: at build time, components are turned into
            JavaScript that updates the DOM directly, so there is no virtual DOM
            and very little framework code shipped to the browser.
          </p>
          <p>
            Svelte 5 handles reactivity with <b>runes</b>: <code>$state</code>{" "}
            for reactive values, <code>$derived</code> for computed ones and{" "}
            <code>$effect</code> for side effects. Runes also work in plain
            TypeScript files, which made small reusable pieces easy to write.
            For example, the &quot;Your polls&quot; list is a reactive class
            that keeps itself in sync with <code>localStorage</code>.
          </p>
          <p>
            SvelteKit renders the poll page on a Worker, so the first response
            already contains the results. tRPC shares types between the frontend
            and the API, so a change in the backend shows up as a type error in
            the UI. To keep spam away without making people sign up, creating a
            poll and voting are both protected by <b>Cloudflare Turnstile</b>.
          </p>
        </ProjectSection>
        <ProjectSection>
          <h2>Was it the right tool?</h2>
          <p>
            For a polling app, not really. Durable Objects make correct counts
            and live updates easy, but nobody notices whether a vote takes 80 or
            300 milliseconds, and very few polls get enough traffic to need a
            globally distributed platform. Workers and Durable Objects pay off
            when many people interact with the same state at the same time and
            every millisecond is felt. For example:
          </p>
          <ul>
            <li>
              <b>Collaborative editors and whiteboards: </b>each document is an
              object, placed near the people editing it, that orders their
              changes and streams them, along with everyone&apos;s cursors, in
              real time.
            </li>
            <li>
              <b>Multiplayer games: </b>each match is an object, placed near its
              players, that holds the authoritative game state and sends updates
              many times per second, where latency is immediately noticeable.
            </li>
          </ul>
        </ProjectSection>
        <ProjectSection>
          <h2>Main takeaways</h2>
          <p>
            Pollmodoro was a great way to learn by building. Durable Objects
            changed how I think about distributed state. Instead of a central
            database that every request competes for, each unit of data gets its
            own small, single-threaded owner. Building something that
            didn&apos;t strictly need it also taught me where it really pays
            off. Svelte, in turn, showed me how pleasant a framework can be when
            most of the work happens at build time.
          </p>
        </ProjectSection>
      </ProjectMain>
    </ProjectPageWrapper>
  );
}
