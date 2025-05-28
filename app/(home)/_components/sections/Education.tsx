import Item from "@/app/(home)/_components/Item";
import SectionTitle from "@/app/(home)/_components/SectionTitle";
import { Button } from "@/app/_components/ui/button";
import { routes } from "@/lib/constants";
import Link from "next/link";

export default function Education() {
  return (
    <section id="education" className="group/section scroll-mt-24 space-y-10">
      <SectionTitle>Education</SectionTitle>

      <Item
        date="2023 – 2026"
        title="Bachelor's Degree in Software Engineering"
        subtitle="Pontifical Catholic University of Minas Gerais"
      >
        <Link href={routes.major}>
          <Button variant="outline">Check all my grades</Button>
        </Link>
      </Item>
    </section>
  );
}
