import Experience from "./components/Experience/Experience";
import ProjectPage from "./components/Projects/ProjectPage";
import SideScroll from "./components/SideScroll";
import Skills from "./components/Skills/Skills";
import Hands from "./ui/icons/Hands";
import Safari from "./ui/Safari";


export default function Page() {
    return (
        <div className=" ">
            <SideScroll />
            <ProjectPage />
            <Skills />
            <Experience />
            <div className="h-screen flex justify-center items-center ">
                <Hands
                    size={800}
                    color={"#0f0f1030"}
                />
            </div>
            <div className="h-screen bg-cement flex justify-center items-center ">
                <Safari
                    src={"/experience/wallpaper-heaven/landing.png"}
                    alt={"Wallpaper Heaven"}
                />
            </div>
        </div>
    )
}