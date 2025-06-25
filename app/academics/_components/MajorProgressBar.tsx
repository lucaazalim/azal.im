import { Progress } from "@/app/_components/ui/progress";

// Revalidate every 2 minutes (120 seconds)
export const dynamic = "force-dynamic";
export const revalidate = 120;

export default function MajorProgressBar() {
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2026-12-31");
  const currentDate = new Date();

  // Calculate total duration in milliseconds
  const totalDuration = endDate.getTime() - startDate.getTime();

  // Calculate elapsed time in milliseconds
  const elapsedTime = Math.max(0, currentDate.getTime() - startDate.getTime());

  // Calculate progress percentage (0-100)
  const progressPercentage = Math.min(
    100,
    Math.max(0, (elapsedTime / totalDuration) * 100),
  );

  // Calculate remaining time
  const remainingTime = Math.max(0, endDate.getTime() - currentDate.getTime());
  const remainingMonths = Math.ceil(
    remainingTime / (1000 * 60 * 60 * 24 * 30.44),
  ); // Average days per month

  // Format current date
  const currentMonth = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const timeInfo = {
    currentMonth,
    remainingMonths,
    isComplete: progressPercentage >= 100,
  };

  return (
    <div className="w-full space-y-3">
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span>January 2023</span>
        <span className="text-foreground font-medium">
          {timeInfo.currentMonth}
        </span>
        <span>December 2026</span>
      </div>

      <Progress value={progressPercentage} className="h-3" />

      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <span>{Math.round(progressPercentage)}% complete</span>
        <span>
          {timeInfo.isComplete
            ? "Major completed!"
            : `~${timeInfo.remainingMonths} months remaining`}
        </span>
      </div>
    </div>
  );
}
