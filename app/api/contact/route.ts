import { contactSchema } from "@/lib/contact/types";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body using the contact schema
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          issues: result.error.format(),
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = result.data;

    // Check if required environment variables exist
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Gmail credentials are not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    if (!process.env.CONTACT_EMAIL) {
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
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email using nodemailer
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Contact Form: ${subject}`,
      html: `
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p>This message was sent from <a href="https://azal.im/contact">azal.im/contact</a>.</p>
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
