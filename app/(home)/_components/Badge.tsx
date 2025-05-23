export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-primary bg-primary/25 flex h-7 min-w-7 items-center justify-center rounded-full p-2 text-xs font-semibold select-none">
      <p>{children}</p>
    </div>
  );
}
