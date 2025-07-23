import { ROUTES } from "@/lib/constants";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(ROUTES.resume("en"));
}
