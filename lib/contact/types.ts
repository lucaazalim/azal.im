import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Is your name really this short?" })
    .max(100, { error: "I'm pretty sure this is not your name." }),
  email: z
    .email({ error: "Please enter a valid email address." })
    .transform((val) => val.toLowerCase()),
  subject: z
    .string()
    .min(5, { error: "Please provide at least 5 characters for the subject." })
    .max(150, {
      error:
        "That's more of a message than a subject — keep it under 150 characters.",
    }),
  message: z
    .string()
    .min(10, { error: "Message must be at least 10 characters." })
    .max(2000, {
      error:
        "Message is too long. Feel free to shoot me a direct email instead.",
    }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
