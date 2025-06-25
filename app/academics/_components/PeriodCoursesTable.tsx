import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { Course } from "@/lib/academics/types";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Info } from "lucide-react";

type Props = {
  courses: Course[];
};

export default function PeriodCoursesTable({ courses }: Props) {
  return (
    <Table className="text-sm">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Hours</TableHead>
          <TableHead>Modality</TableHead>
          <TableHead>Grade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow
            key={course.id}
            className={cn(!course.grade && "opacity-50")}
          >
            <TableCell className="flex flex-row items-center gap-1.5">
              <span>{course.name.en}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="size-4 opacity-50" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[300px]">{course.syllabus.en}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>{course.hours}</TableCell>
            <TableCell>{capitalizeFirstLetter(course.modality)}</TableCell>
            <TableCell>{course.grade || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
