"use server";

import crypto from "crypto";
import { headers } from "next/headers";

const store = new Map<string, number>();

export async function leaveTangerine() {
  const _headers = await headers();
  const ip = _headers.get("x-forwarded-for") || "unknown";
  const ua = _headers.get("user-agent") || "unknown";

  const fingerprintInput = `${ip}|${ua}`;

  const fingerprint = crypto
    .createHash("sha256")
    .update(fingerprintInput)
    .digest("hex");

  const currentCount = store.get(fingerprint) || 0;

  if (currentCount >= 8) {
    return {
      error: "You have already left the maximum number of cookies.",
    };
  }

  const newCount = currentCount + 1;

  store.set(fingerprint, newCount);

  const total = Array.from(store.values()).reduce(
    (sum, count) => sum + count,
    0,
  );

  return {
    success: true,
    total,
    count: newCount,
  };
}
