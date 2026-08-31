import ExperienceSection from "./components/Experience/ExperienceSection";
import HeroSection from "./components/Hero/HeroSection";
import ProjectPage from "./components/Projects/ProjectPage";
import SkillsSection from "./components/Skills/SkillsSection";
import Footer from "./components/Footer/Footer";


export default function Page() {
    return (
        <div className=" ">
            <HeroSection />
            <ProjectPage />
            <SkillsSection />
            <ExperienceSection />
            <Footer />
        </div>
    )
}