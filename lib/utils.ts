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

export function objectToSearchParams(
  obj: Record<string, string | string[] | number | undefined | null>,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value.toString());
    }
  }

  return searchParams;
}

export function formatToMonthYear(date: Date) {
  date = new Date(date);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${year}`;
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
