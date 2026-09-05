import {
  BASE_URL,
  CONTACT_EMAIL,
  GMAIL_APP_PASSWORD,
  GMAIL_USER,
  ROUTES,
} from "@/lib/constants";
import { escapeHtml } from "@/lib/contact/escape";
import { isRateLimited } from "@/lib/contact/rate-limit";
import { contactSchema } from "@/lib/contact/types";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    // Best-effort per-instance rate limit, keyed by the caller's IP.
    const key =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(key)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();

    // Validate the request body using the contact schema
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          issues: z.treeifyError(result.error),
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = result.data;

    // Check if required environment variables exist
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error("Gmail credentials are not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    if (!CONTACT_EMAIL) {
      console.error("CONTACT_EMAIL is not configured");
      return NextResponse.json(
        { error: "Contact email not configured" },
        { status: 500 },
      );
    }

    // Create nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    // Send email using nodemailer
    const info = await transporter.sendMail({
      from: GMAIL_USER,
      to: CONTACT_EMAIL,
      subject: `Contact Form: ${subject}`,
      html: `
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong> ${escapeHtml(message)}</p>
          <p>This message was sent from <a href="${BASE_URL + ROUTES.contact}">your contact page</a>.</p>
        `,
      replyTo: email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        id: info.messageId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
