"use client";

import Header from "@/app/components/sections/Header";
import MainContainer from "@/app/components/MainContainer";
import Experiences from "@/app/components/sections/Experiences";
import About from "@/app/components/sections/About";
import Education from "@/app/components/sections/Education";
import Awards from "@/app/components/sections/Awards";
import Footer from "@/app/components/sections/Footer";
import Projects from "@/app/components/sections/Projects";

export default function Home() {

    return (
        <div className="mx-auto max-w-screen-lg px-12 flex flex-col lg:flex-row gap-x-36">
            <Header/>
            <MainContainer>
                <About/>
                <Experiences/>
                <Education/>
                <Awards/>
                <Projects/>
                <Footer/>
            </MainContainer>
        </div>
    );
}
