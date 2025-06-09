import SectionTitle from "@/app/(home)/_components/SectionTitle";
import * as motion from "@/app/_components/Motion";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 max-lg:space-y-10">
      <SectionTitle className="sr-only">About</SectionTitle>

      <div className="text-muted-foreground space-y-4 lg:px-5">
        <p className="text-foreground font-serif text-2xl font-bold">
          Hi there! I'm Luca.
          <motion.span
            animate={{
              rotateZ: [0, 5, -15, 10, -10, 10, -15, 0],
              transition: {
                repeat: Infinity,
                repeatDelay: 3,
                duration: 1.5,
              },
            }}
            style={{ transformOrigin: "bottom right" }}
            className="ml-2 inline-block"
          >
            👋
          </motion.span>
        </p>
        <p>
          My journey in the digital world began in 2008, at the age of 8, when I
          created a blog about Club Penguin and started experimenting with web
          development. This sparked my passion for technology and online
          communities.
        </p>

        <p>
          A few years later, in 2011, I discovered Minecraft, and by 2013, I had
          launched my first Minecraft server. By 2017, I owned and operated the{" "}
          <a className="link" href="https://redesky.com">
            largest Minecraft network in Brazil
          </a>
          , which peaked at 8,115 concurrent players. Leading a talented team of
          developers and game designers, we provided an engaging platform for a
          thriving community of over 300K monthly players.
        </p>

        <p>
          In 2022, I transitioned away from Minecraft to fully focus on
          advancing my career as a Software Engineer. I am now pursuing a degree
          in Software Engineering at PUC Minas, channeling my skills and
          experience into new challenges and projects.
        </p>
      </div>
    </section>
  );
}
