import ExperienceSection from "./components/Experience/ExperienceSection";
import Hero from "./components/Hero/Hero";
import HeroSection from "./components/Hero/HeroSection";
import ProjectPage from "./components/Projects/ProjectPage";
import SkillsSection from "./components/Skills/Skills";
import Hands from "./ui/icons/Hands";
import Clock from "./ui/icons/Clock";
import Footer from "./components/Footer/Footer";


export default function Page() {
    return (
        <div className=" ">
            <Hero />
            <HeroSection />
            <ProjectPage />
            <SkillsSection />
            <ExperienceSection />
            <Footer />
            {/* <div className="h-screen flex justify-center items-center ">
                <Hands
                    size={800}
                    color={"#0f0f1030"}
                />
            </div> */}
        </div>
    )
}