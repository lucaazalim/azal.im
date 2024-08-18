"use client";

import Experience from "@/app/components/Experience";
import NavItem from "@/app/components/NavItem";
import SocialItem from "@/app/components/SocialItem";
import {SiGithub, SiInstagram, SiLinkedin} from "@icons-pack/react-simple-icons";
import {Utensils} from "lucide-react";
import Image from "next/image";
import Honor from "@/app/components/Honor";

export default function Home() {

    return (
        <div className="mx-auto max-w-screen-lg px-12 flex flex-col lg:flex-row gap-x-36">
            <header className="lg:sticky lg:top-0 lg:max-h-screen pt-24 lg:pb-24 flex flex-col justify-between">
                <div className="space-y-12">
                    <Image src="/avatar.png" alt="" width={200} height={200} className="rounded-full hover:scale-110 transition-transform"/>
                    <div>
                        <h1 className="text-5xl font-bold text-nowrap">Luca Azalim</h1>
                        <h2 className="text-xl text-nowrap">Software Engineer</h2>
                    </div>
                    <nav>
                        <ul className="space-y-4 hidden lg:block">
                            <NavItem section="about" title="About"/>
                            <NavItem section="experience" title="Experience"/>
                            <NavItem section="education" title="Education"/>
                            <NavItem section="honors" title="Awards"/>
                        </ul>
                    </nav>
                </div>
                <div className="space-y-4">
                    <a href="mailto:luca@azal.im">luca@azal.im</a>
                    <ul className="flex gap-4">

                        <SocialItem
                            icon={SiLinkedin}
                            href="https://www.linkedin.com/in/lucaazalim"
                        />

                        <SocialItem
                            icon={SiGithub}
                            href="https://github.com/lucaazalim"/>

                        <SocialItem
                            icon={SiInstagram}
                            href="https://www.instagram.com/lucaazalim"/>

                        <SocialItem
                            icon={Utensils}
                            href="https://www.instagram.com/comidasdoluca"/>

                    </ul>
                </div>
            </header>
            <main className="py-24 space-y-24">
                <section id="about" className="scroll-mt-24 max-lg:space-y-10">
                    <h1 className="text-xl lg:hidden">About</h1>
                    <div className="space-y-4 text-foreground-faded">
                        <p>My journey in the digital world began in 2008, at the age of 8, when I created a blog about
                            Club Penguin and started experimenting with HTML and CSS. This sparked my passion for
                            technology and online communities.</p>

                        <p>In 2011, I discovered Minecraft, and by 2013, I had launched my first Minecraft server. By
                            2017, I owned and operated the <a href="https://redesky.com">largest Minecraft network in
                                Brazil</a>,
                            which peaked at over 8,000 concurrent players. Leading a talented team of developers and
                            game designers,
                            we provided an engaging platform for a thriving community of over 300,000 monthly players.
                        </p>

                        <p>In 2022, I transitioned away from Minecraft to fully focus on advancing my career as a
                            Software Engineer. I am now pursuing a degree in Software Engineering, channeling my skills
                            and experience into new challenges and projects.</p>
                    </div>
                </section>
                <section id="experience" className="scroll-mt-24 space-y-10">
                    <h1 className="text-xl">Experience</h1>
                    <Experience
                        fromYear={2024}
                        title="Software Engineer Intern"
                        institution="90 Information Technology"
                    >
                        <p>
                            I am currently leading the architecture and development of a comprehensive web platform
                            aimed at optimizing processes. I am building RESTful APIs using
                            .NET and C#, and front-end interfaces with TypeScript, Next.js, and TailwindCSS.
                        </p>
                    </Experience>
                    <Experience
                        fromYear={2015}
                        toYear={2022}
                        title="CEO and Lead Developer"
                        institution="Rede Sky"
                    >
                        <p>
                            Led the largest Minecraft server network and community in Brazil, with over 16 million
                            registered users and a peak of 300,000 active players per month. Achieved the national
                            record of 8,115 concurrent players.
                        </p>
                        <p>
                            Focused on strategic decision-making and IT management, overseeing company operations for
                            seven years. Recruited and led a team of 10 developers, game designers, and project
                            managers. Directed over 50 projects involving development, launch, marketing, and ongoing
                            support.
                        </p>
                    </Experience>
                    <Experience
                        fromYear={2014}
                        toYear={2015}
                        title="Founder and Lead Developer"
                        institution="Mineland Network"
                    >
                        <p>
                            Led a small team of three developers to build five different Minecraft game modes, peaking a
                            total of 500 concurrent players.
                        </p>
                    </Experience>
                </section>
                <section id="education" className="scroll-mt-24 space-y-10">
                    <h1 className="text-xl">Education</h1>
                    <Experience
                        fromYear={2023}
                        toYear={2026}
                        title="Bachelor's Degree in Software Engineering"
                        institution="Pontifical Catholic University of Minas Gerais"
                    >
                        <p>
                        </p>
                    </Experience>
                </section>
                <section id="honors" className="scroll-mt-24 space-y-10">
                    <h1 className="text-xl">Awards</h1>
                    <Honor
                        year={2024}
                        title="Academic Excellence Award"
                        institution="Pontifical Catholic University of Minas Gerais"
                        count={2}
                    >
                        <p>
                            I was awarded the Academic Excellence Award twice in a row. This award is given to a single student every semester.
                        </p>
                    </Honor>
                    <Honor
                        year={2024}
                        title="Outstanding Project Award"
                        institution="Pontifical Catholic University of Minas Gerais"
                        count={3}
                    >
                        <p>
                            The teams I led were awarded the Outstanding Project Award three times in a row. This award is given to a single team every semester.
                        </p>
                    </Honor>
                </section>
                <footer>
                    <p className="text-foreground-faded">Feel free to <a
                        href="https://github.com/lucaazalim/azal.im/fork">fork this on GitHub</a>.</p>
                </footer>
            </main>
        </div>
    );
}
