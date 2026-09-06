import ExperienceSection from "@/components/Experience/ExperienceSection";
import HeroSection from "@/components/Hero/HeroSection";
import ProjectPage from "@/components/Projects/ProjectPage";
import Skills from "@/components/Skills/Skills";
import Footer from "@/components/Footer/Footer";
import OrbitSection from "@/components/Orbit/OrbitSection";
import ContactSection from "@/components/Contact/ContactSection";
import IslandBar from "@/components/Island/IslandBar";
import IslandSection from "@/components/Island/IslandSection";

import { Satisfy } from "next/font/google";

export default function Page() {
    return (
        <div className=" ">
            <IslandBar />
            <IslandSection id="intro" state="navbar">
                <HeroSection />
            </IslandSection>
            <IslandSection id="projects" state="project">
                <ProjectPage />
            </IslandSection>
            <IslandSection id="skills" state="navbar">
                <Skills />
            </IslandSection>
            <IslandSection id="experience" state="experience">
                <ExperienceSection />
            </IslandSection>
            <IslandSection id="orbit" state="navbar">
                <OrbitSection />
            </IslandSection>
            <IslandSection id="contact" state="contact">
                <ContactSection />
            </IslandSection>
            <IslandSection id="end" state="navbar">
                <Footer />
            </IslandSection>
        </div>
    )
}
