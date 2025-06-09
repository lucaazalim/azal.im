"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import SplitText from "@/app/_components/SplitText";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { routes } from "@/lib/constants";
import { ContactFormValues, contactSchema } from "@/lib/contact/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const router = useRouter();
  const [test, setTest] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const response = await fetch(routes.api.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      form.reset();
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      // You could add toast notification here
    },
  });

  function onSubmit(values: ContactFormValues) {
    submitMutation.mutate(values);
  }

  if (submitMutation.isSuccess || test) {
    return (
      <div className="animate-in fade-in flex grow flex-col items-center justify-center space-y-5 border p-5 duration-1000 ease-in-out max-md:min-h-100">
        <div className="space-y-5 text-center">
          <SplitText
            className="text-primary text-5xl font-black"
            text="Thank you!"
          />
          <p className="mb-4">I'll get back to you as soon as possible.</p>
          <Button
            onClick={() => {
              submitMutation.reset();
              setTest(false);
            }}
            variant="outline"
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="animate-in max-md:slide-in-from-bottom-5 md:slide-in-from-right-[30px] fade-in space-y-5 border p-5 duration-1000 ease-in-out"
      >
        <div className={"grid grid-cols-1 gap-5 md:grid-cols-2"}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="What is this about?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message..."
                  className="min-h-[150px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={submitMutation.isPending}
        >
          {submitMutation.isPending ? "Sending..." : "Send Message"}
        </Button>

        <Button
          onClick={() => setTest(true)}
          variant="secondary"
          className="w-full"
        >
          Test
        </Button>

        {submitMutation.isError && (
          <p className="text-destructive text-sm">
            {submitMutation.error?.message ||
              "Failed to send message. Please try again."}
          </p>
        )}
      </form>
    </Form>
  );
}
