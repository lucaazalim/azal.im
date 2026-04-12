import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function searchParamsToObject(searchParams: URLSearchParams) {
  const obj: Record<string, unknown> = {};

  const setByPath = (path: string[], value: string) => {
    let current: Record<string, unknown> = obj;

    for (let index = 0; index < path.length - 1; index++) {
      const key = path[index];
      if (
        typeof current[key] !== "object" ||
        current[key] === null ||
        Array.isArray(current[key])
      ) {
        current[key] = {};
      }
      current = current[key] as Record<string, unknown>;
    }

    const lastKey = path[path.length - 1];
    const existingValue = current[lastKey];

    if (existingValue !== undefined) {
      current[lastKey] = Array.isArray(existingValue)
        ? [...existingValue, value]
        : [existingValue as string, value];
    } else {
      current[lastKey] = value;
    }
  };

  for (const [key, value] of searchParams.entries()) {
    setByPath(key.split("."), value);
  }

  return obj;
}

export function objectToSearchParams(obj: Record<string, unknown>) {
  const searchParams = new URLSearchParams();

  const appendEntries = (value: unknown, parentKey?: string) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => {
        if (parentKey) {
          searchParams.append(parentKey, entry.toString());
        }
      });
      return;
    }

    if (typeof value === "object") {
      Object.entries(value as Record<string, unknown>).forEach(
        ([key, child]) => {
          appendEntries(child, parentKey ? `${parentKey}.${key}` : key);
        },
      );
      return;
    }

    if (parentKey) {
      searchParams.append(parentKey, value.toString());
    }
  };

  Object.entries(obj).forEach(([key, value]) => appendEntries(value, key));

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
