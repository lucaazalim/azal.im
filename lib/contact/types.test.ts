import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact/types";

describe("contactSchema", () => {
  it("accepts valid input and lowercases the email", () => {
    const result = contactSchema.parse({
      name: "Luca Azalim",
      email: "Luca@Example.com",
      subject: "Hello there",
      message: "This is a long enough message to pass validation.",
    });

    expect(result.email).toBe("luca@example.com");
  });

  it("rejects a name that is too short", () => {
    const result = contactSchema.safeParse({
      name: "L",
      email: "luca@example.com",
      subject: "Hello there",
      message: "This is a long enough message to pass validation.",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const result = contactSchema.safeParse({
      name: "Luca Azalim",
      email: "not-an-email",
      subject: "Hello there",
      message: "This is a long enough message to pass validation.",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a message longer than 2000 characters", () => {
    const result = contactSchema.safeParse({
      name: "Luca Azalim",
      email: "luca@example.com",
      subject: "Hello there",
      message: "a".repeat(2001),
    });

    expect(result.success).toBe(false);
  });

  it("rejects a subject shorter than 5 characters", () => {
    const result = contactSchema.safeParse({
      name: "Luca Azalim",
      email: "luca@example.com",
      subject: "Hi",
      message: "This is a long enough message to pass validation.",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a subject longer than 150 characters", () => {
    const result = contactSchema.safeParse({
      name: "Luca Azalim",
      email: "luca@example.com",
      subject: "a".repeat(151),
      message: "This is a long enough message to pass validation.",
    });

    expect(result.success).toBe(false);
  });

  it("accepts a subject of exactly 150 characters", () => {
    const result = contactSchema.safeParse({
      name: "Luca Azalim",
      email: "luca@example.com",
      subject: "a".repeat(150),
      message: "This is a long enough message to pass validation.",
    });

    expect(result.success).toBe(true);
  });
});
