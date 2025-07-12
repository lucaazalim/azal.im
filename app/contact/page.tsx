import { BASE_URL, routes } from "@/lib/constants";
import { Mail, MapPin } from "lucide-react";
import { Metadata } from "next";
import PageHeader from "../_components/header/PageHeader";
import PageHeaderDescription from "../_components/header/PageHeaderDescription";
import PageHeaderTag from "../_components/header/PageHeaderTag";
import PageHeaderTitle from "../_components/header/PageHeaderTitle";
import PageWrapper from "../_components/header/PageWrapper";
import OpenToWork from "../_components/socials/OpenToWork";
import Socials from "../_components/socials/Socials";
import { Separator } from "../_components/ui/separator";
import ContactCard from "./_components/ContactCard";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with me for collaborations, project discussions, or just to say hi. I'm open to new opportunities and interesting conversations.",
  openGraph: {
    title: "Contact - Luca Azalim",
    description:
      "Get in touch with me for collaborations, project discussions, or just to say hi. I'm open to new opportunities and interesting conversations.",
    url: BASE_URL + routes.contact,
    type: "website",
  },
  twitter: {
    title: "Contact - Luca Azalim",
    description:
      "Get in touch with me for collaborations, project discussions, or just to say hi. I'm open to new opportunities and interesting conversations.",
  },
};

export default function Page() {
  return (
    <PageWrapper className="mx-auto max-w-5xl">
      <PageHeader>
        <PageHeaderTag>Contact</PageHeaderTag>
        <PageHeaderTitle>Get in Touch</PageHeaderTitle>
        <PageHeaderDescription>
          I like to bring ideas to life and collaborate with others. If you have
          a project in mind, want to discuss ideas, or just want to say hi, feel
          free to reach out!
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.4fr_0.6fr]">
        <div className="animate-in max-md:slide-in-from-bottom-5 md:slide-in-from-left-[30px] fade-in flex flex-col gap-3 duration-1000 ease-in-out">
          <OpenToWork />
          <ContactCard
            icon={Mail}
            label="Email"
            text="luca@azal.im"
            href="mailto:luca@azal.im"
          />
          <ContactCard
            icon={MapPin}
            label="Location"
            text="Belo Horizonte, Brazil 🇧🇷"
          />
          <Socials className="gap-3" />
          <Separator className="max-md:hidden" />
          <p className="text-center text-sm max-md:hidden">
            You're welcome to write in English or Portuguese.
            <br />I usually reply within a day!
          </p>
        </div>
        <ContactForm />
      </div>
    </PageWrapper>
  );
}
