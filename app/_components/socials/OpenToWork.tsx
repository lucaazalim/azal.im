export default function OpenToWork() {
  return (
    <div className="bg-accent flex items-center gap-2 border-1 px-3 py-2 font-mono text-xs uppercase">
      <div className="relative size-2">
        <div className="absolute size-full animate-ping bg-green-500" />
        <div className="relative size-full animate-pulse bg-green-500" />
      </div>
      Open to work & Collabs
    </div>
  );
}
