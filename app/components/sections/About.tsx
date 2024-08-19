import SectionTitle from "@/app/components/SectionTitle";

export default function About() {
    return (
        <section id="about" className="scroll-mt-24 max-lg:space-y-10">

            <SectionTitle className="lg:hidden">About</SectionTitle>

            <div className="lg:px-5 space-y-4 text-foreground-faded">
                <p>My journey in the digital world began in 2008, at the age of 8, when I created a blog about
                    Club Penguin and started experimenting with HTML and CSS. This sparked my passion for
                    technology and online communities.</p>

                <p>In 2011, I discovered Minecraft, and by 2013, I had launched my first Minecraft server. By
                    2017, I owned and operated the <a className="link" href="https://redesky.com">largest Minecraft network in
                        Brazil</a>,
                    which peaked at over 8,000 concurrent players. Leading a talented team of developers and
                    game designers,
                    we provided an engaging platform for a thriving community of over 300,000 monthly players.
                </p>

                <p>In 2022, I transitioned away from Minecraft to fully focus on advancing my career as a
                    Software Engineer. I am now pursuing a degree in Software Engineering at PUC Minas, channeling my skills
                    and experience into new challenges and projects.</p>
            </div>
        </section>

    );
}