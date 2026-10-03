import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
import { BASE_URL, ROUTES } from "@/lib/constants";
import { Metadata } from "next";
import MacOSImageFrame from "../../_components/MacOSImageFrame";
import ProjectMain from "../_components/ProjectMain";
import ProjectPageHeader from "../_components/ProjectPageHeader";
import ProjectPageWrapper from "../_components/ProjectPageWrapper";
import ProjectSection from "../_components/ProjectSection";

export const metadata: Metadata = {
  title: "Minecraft Server Census",
  description:
    "A public dashboard that pings thousands of Minecraft Java Edition servers every 10 minutes, counts each server once, and runs on a single small VM.",
  openGraph: {
    title: "Minecraft Server Census - Luca Azalim",
    description:
      "A public dashboard that pings thousands of Minecraft Java Edition servers every 10 minutes, counts each server once, and runs on a single small VM.",
    url: BASE_URL + ROUTES.projects("minecraft-server-census"),
    type: "website",
  },
  twitter: {
    title: "Minecraft Server Census - Luca Azalim",
    description:
      "A public dashboard that pings thousands of Minecraft Java Edition servers every 10 minutes, counts each server once, and runs on a single small VM.",
  },
};

export default function Page() {
  return (
    <ProjectPageWrapper>
      <ProjectPageHeader>
        <PageHeaderTitle>Minecraft Server Census</PageHeaderTitle>
        <PageHeaderDescription>
          How many people are playing Minecraft multiplayer right now, and
          where?
        </PageHeaderDescription>
      </ProjectPageHeader>
      <ProjectMain>
        <ProjectSection>
          <h2>Summary</h2>
          <p>
            Minecraft Server Census is a personal project that pings thousands
            of public Minecraft Java Edition servers every 10 minutes and turns
            the answers into a public dashboard: players online now and over
            time, the busiest servers, per-country views, and a page for every
            server with its player history, accepted client versions, software
            and hosting details.
          </p>
          <div className="flex justify-between gap-5">
            <div>
              <h4>PERIOD</h4>
              2026
            </div>
            <div>
              <h4>STACK</h4>
              <ul>
                <li>Node.js</li>
                <li>SQLite</li>
                <li>React</li>
                <li>TailwindCSS</li>
                <li>Fly.io</li>
              </ul>
            </div>
            <div>
              <h4>LINKS</h4>
              <ul>
                <li>
                  <a href="https://census.azal.im" target="_blank">
                    Live dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/lucaazalim/minecraft-server-census"
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
          src="/projects/minecraft-server-census/1.png"
          alt="Minecraft Server Census dashboard"
          width={1280}
          height={720}
        />
        <ProjectSection>
          <h2>Motivation</h2>
          <p>
            Minecraft is a big part of my life. I spent years building{" "}
            <a href="https://redesky.com">Rede Sky</a>, which became the largest
            Minecraft network in Brazil, and since I stepped away from that
            world I&apos;ve been curious about what the multiplayer scene looks
            like today. Which servers are growing, how big the Brazilian
            community is compared to the rest of the world, and when people
            actually play.
          </p>
          <p>
            At Rede Sky we had internal tools to keep an eye on competitors, so
            the idea wasn&apos;t new to me. This time I wanted a broader, public
            version of it, partly out of curiosity and partly in the hope that
            one day I&apos;ll build something around Minecraft servers again.
          </p>
          <h2>How it works</h2>
          <ul>
            <li>
              <b>Sweep: </b>Every 10 minutes, each tracked server gets the same
              status request the game client sends when you open the multiplayer
              menu. The full reply is stored: player count, version, message of
              the day, icon, mods.
            </li>
            <li>
              <b>De-duplicate: </b>Hostnames that are really the same server are
              grouped together, so their players are counted once.
            </li>
            <li>
              <b>Aggregate: </b>Totals are written per sweep, overall and per
              country, and each server&apos;s history is rolled up by hour so
              long time ranges stay cheap to query.
            </li>
            <li>
              <b>Serve: </b>A read-only JSON API and the React dashboard are
              served by the same process.
            </li>
          </ul>
        </ProjectSection>
        <MacOSImageFrame
          src="/projects/minecraft-server-census/2.png"
          alt="Server page with player history and details"
          width={1280}
          height={720}
        />
        <ProjectSection>
          <h2>Challenge: counting each server once</h2>
          <p>
            Pinging a server is the easy part. The hard part is deciding what
            counts as <i>one</i> server. Big networks are reachable through many
            hostnames (<code>play.example.com</code>,{" "}
            <code>mc.example.com</code>, <code>example.net</code>…), and simply
            adding them up inflates the total a lot: at the time of writing, the
            naive sum of every hostname is about <b>twice</b> the real number.
          </p>
          <p>
            Neither DNS nor the status reply can settle it alone. Large networks
            spread a single player pool across several IPs and ports, while DDoS
            protection services and hosting providers put dozens of{" "}
            <i>unrelated</i> servers behind the same IP. So hostnames are only
            merged when there is a link between them <b>and</b> the status
            replies corroborate it:
          </p>
          <ul>
            <li>
              <b>Same player: </b>the same real player shows up in both player
              samples.
            </li>
            <li>
              <b>Same address: </b>they share an IP and port, report the same
              player count, and have the same icon, message or domain.
            </li>
            <li>
              <b>Same DNS target: </b>they point to the same DNS record, with
              matching player counts and the same icon or message.
            </li>
            <li>
              <b>Same fingerprint: </b>identical icon, message and player limit,
              with matching player counts, for networks spread across several
              IPs.
            </li>
          </ul>
          <p>
            Small servers have to look identical to be merged, since that&apos;s
            where hosting providers place many customers behind one address and
            tiny player counts agree by accident. Every merge is shown on the
            server&apos;s page along with its evidence, so a wrong one is easy
            to spot and fix by adjusting the rules.
          </p>
        </ProjectSection>
        <MacOSImageFrame
          src="/projects/minecraft-server-census/3.png"
          alt="Seven hostnames counted as a single server"
          width={1280}
          height={720}
        />
        <ProjectSection>
          <h2>Challenge: running it for almost nothing</h2>
          <p>
            This is a side project with no revenue, so I wanted the monthly bill
            to be as close to zero as possible. Everything runs as a single
            Node.js process on one 1 GB, shared-CPU virtual machine, with no
            separate database server, queue or cache to pay for. Storage is
            SQLite through Node&apos;s built-in <code>node:sqlite</code>, pings
            use raw TCP sockets, and there are no native dependencies.
          </p>
          <p>
            Fitting the workload on such a small machine shaped most of the
            design decisions:
          </p>
          <ul>
            <li>
              <b>Lean writes: </b>Pings are the bulk of the data, at around
              700,000 rows a day. That table has a single index, and a
              server&apos;s full status reply is only stored again when it
              changes.
            </li>
            <li>
              <b>Hourly rollups: </b>Anything older than three days is read from
              hourly aggregates instead of raw pings, so charts covering weeks
              stay fast.
            </li>
            <li>
              <b>Reads off the main thread: </b>SQLite in Node is synchronous,
              so API queries run on a separate thread. A slow query never stalls
              a sweep in progress.
            </li>
            <li>
              <b>Cache per sweep: </b>The data only changes every 10 minutes, so
              each API response is computed at most once per sweep, no matter
              how many people are looking at the dashboard.
            </li>
            <li>
              <b>Backoff for dead servers: </b>Servers that stop answering are
              pinged less often, so they don&apos;t eat into the sweep&apos;s
              time budget.
            </li>
          </ul>
          <p>
            The result is a full sweep of almost 5,000 hostnames in about a
            minute, on a machine that costs just a few dollars a month.
          </p>
        </ProjectSection>
        <ProjectSection>
          <h2>Main takeaways</h2>
          <p>
            Minecraft Server Census started as a way to satisfy my own curiosity
            and turned into an interesting engineering exercise: the data is
            noisy and self-reported, and getting an honest number out of it took
            far more thought than collecting it. It also showed me how far a
            single process and SQLite can go when the workload is designed
            around them. Above all, it brought me closer to the Minecraft
            community again.
          </p>
        </ProjectSection>
      </ProjectMain>
    </ProjectPageWrapper>
  );
}
