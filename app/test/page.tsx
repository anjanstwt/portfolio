import ExperienceSection from "./components/Experience/ExperienceSection";
import ProjectPage from "./components/Projects/ProjectPage";
import SideScroll from "./components/SideScroll";
import Skills from "./components/Skills/Skills";
import Hands from "./ui/icons/Hands";


export default function Page() {
    return (
        <div className=" ">
            <SideScroll />
            <ProjectPage />
            <Skills />
            <ExperienceSection />
            <div className="h-screen flex justify-center items-center ">
                <Hands
                    size={800}
                    color={"#0f0f1030"}
                />
            </div>
        </div>
    )
}