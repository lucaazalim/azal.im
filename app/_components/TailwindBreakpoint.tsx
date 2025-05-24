import { cn } from "@/lib/utils";

export default function TailwindBreakpoint() {
  return (
    <div className="fixed right-0 bottom-0 z-2147483647">
      <Badge breakpoint="xs" className="hidden max-sm:block" />
      <Badge breakpoint="sm" className="hidden sm:max-md:block" />
      <Badge breakpoint="md" className="hidden md:max-lg:block" />
      <Badge breakpoint="lg" className="hidden lg:max-xl:block" />
      <Badge breakpoint="xl" className="hidden xl:max-2xl:block" />
      <Badge breakpoint="2xl" className="hidden 2xl:block" />
    </div>
  );
}

function Badge({
  breakpoint,
  className,
}: {
  breakpoint: string;
  className: string;
}) {
  return (
    <span
      className={cn(
        "rounded-tl-lg border-1 border-purple-700 bg-purple-500 p-1 text-xs text-white",
        className,
      )}
    >
      {breakpoint}
    </span>
  );
}
