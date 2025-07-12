import { routes } from "@/lib/constants";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(routes.resume("en"));
}
