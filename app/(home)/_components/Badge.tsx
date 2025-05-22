export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-7 select-none items-center justify-center rounded-full p-2 text-xs font-semibold min-w-7 text-accent bg-accent/25">
      <p>{children}</p>
    </div>
  );
}
