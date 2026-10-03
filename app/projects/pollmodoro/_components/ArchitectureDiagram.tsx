import { cn } from "@/lib/utils";
import { ArrowDown, ArrowRight, Database, Radio } from "lucide-react";
import { ReactNode } from "react";

const VOTERS = [
  { city: "São Paulo", note: "Poll creator" },
  { city: "São Paulo", note: "Voter" },
  { city: "Lisbon", note: "Voter" },
];

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Box({
  children,
  highlight,
  className,
}: {
  children: ReactNode;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-card rounded-lg border px-4 py-3 text-sm",
        highlight && "border-primary/60",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <div className="text-muted-foreground flex items-center justify-center">
      <ArrowDown className="size-5 md:hidden" />
      <ArrowRight className="hidden size-5 md:block" />
    </div>
  );
}

export default function ArchitectureDiagram() {
  return (
    <figure className="w-full max-w-5xl space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1.2fr]">
        <Column title="Browsers">
          {VOTERS.map((voter, index) => (
            <Box key={index}>
              <p className="font-semibold">{voter.city}</p>
              <p className="text-muted-foreground">{voter.note}</p>
            </Box>
          ))}
        </Column>
        <Arrow />
        <Column title="Nearest Worker">
          {VOTERS.map((voter, index) => (
            <Box key={index}>
              <p className="font-semibold">Worker</p>
              <p className="text-muted-foreground">{voter.city} data center</p>
            </Box>
          ))}
        </Column>
        <Arrow />
        <Column title="One Durable Object per poll">
          <Box highlight className="flex h-full flex-col justify-center gap-4">
            <div>
              <p className="font-semibold">Poll hMRwidAt…</p>
              <p className="text-muted-foreground">
                Lives in São Paulo, where it was first requested
              </p>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Database className="text-primary size-4 shrink-0" />
                SQLite: poll, options, votes
              </li>
              <li className="flex items-center gap-2">
                <Radio className="text-primary size-4 shrink-0" />
                WebSockets of everyone watching
              </li>
            </ul>
          </Box>
        </Column>
      </div>
      <figcaption className="text-muted-foreground text-center text-sm">
        Every request is handled by the closest Worker, but all of them reach
        the same Durable Object, wherever it lives.
      </figcaption>
    </figure>
  );
}
