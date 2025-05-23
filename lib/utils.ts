import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function searchParamsToObject(searchParams: URLSearchParams) {
  const obj: Record<string, string | string[]> = {};

  for (const [key, value] of searchParams.entries()) {
    // Handle multiple values (e.g., tags=tag1&tags=tag2)
    if (obj[key]) {
      obj[key] = Array.isArray(obj[key])
        ? [...(obj[key] as string[]), value]
        : [obj[key] as string, value];
    } else {
      obj[key] = value;
    }
  }

  return obj;
}
