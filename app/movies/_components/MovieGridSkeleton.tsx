import { Skeleton } from "@/app/_components/ui/skeleton";

export default function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-3 justify-center gap-6 md:grid-cols-6 lg:grid-cols-8">
      {Array.from({ length: 16 }, (_, index) => (
        <Skeleton key={index} className="aspect-2/3 w-full" />
      ))}
    </div>
  );
}
