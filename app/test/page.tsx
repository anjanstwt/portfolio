import ExperienceSection from "./components/Experience/ExperienceSection";
import HeroSection from "./components/Hero/HeroSection";
import NewHeroSection from "./components/Hero/NewHeroSection";
import ProjectPage from "./components/Projects/ProjectPage";
import SkillsSection from "./components/Skills/Skills";
import Hands from "./ui/icons/Hands";
import Clock from "./ui/icons/Clock";
import Footer from "./components/Footer/Footer";


export default function Page() {
    return (
        <div className=" ">
            <NewHeroSection />
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