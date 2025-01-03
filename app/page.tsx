import Header from "@/app/_components/sections/Header";
import Experiences from "@/app/_components/sections/Experiences";
import About from "@/app/_components/sections/About";
import Education from "@/app/_components/sections/Education";
import Awards from "@/app/_components/sections/Awards";
import Footer from "@/app/_components/sections/Footer";
import Projects from "@/app/_components/sections/Projects";

export default function Home() {

    return (
        <div className="mx-auto max-w-screen-lg px-12 flex flex-col lg:flex-row gap-x-28">
            <Header/>
            <main className="py-12 lg:py-24 space-y-24">
                <About/>
                <Experiences/>
                <Education/>
                <Awards/>
                <Projects/>
                <Footer/>
            </main>
        </div>
    );
}
