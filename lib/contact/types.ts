import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Is your name really this short?",
    })
    .max(100, { message: "I'm pretty sure this is not your name." }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .transform((val) => val.toLowerCase()),
  subject: z.string().min(5, {
    message: "Please provide at least 5 characters for the subject.",
  }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(2000, {
      message:
        "Message is too long. Feel free to shoot me a direct email instead.",
    }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
