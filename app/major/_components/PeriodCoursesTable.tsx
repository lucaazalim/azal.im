import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Course } from "@/lib/major/types";
import { capitalizeFirstLetter, cn } from "@/lib/utils";

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
            <TableCell>{course.name.en}</TableCell>
            <TableCell>{course.hours}</TableCell>
            <TableCell>{capitalizeFirstLetter(course.modality)}</TableCell>
            <TableCell>{course.grade || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
