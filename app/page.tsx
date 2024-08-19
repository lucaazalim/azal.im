import Header from "@/app/components/sections/Header";
import Experiences from "@/app/components/sections/Experiences";
import About from "@/app/components/sections/About";
import Education from "@/app/components/sections/Education";
import Awards from "@/app/components/sections/Awards";
import Footer from "@/app/components/sections/Footer";
import Projects from "@/app/components/sections/Projects";

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
