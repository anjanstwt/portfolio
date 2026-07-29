import ProjectPage from "./components/Projects/ProjectPage";
import SideScroll from "./components/SideScroll";
import Skills from "./components/Skills/Skills";
import SVG from "./components/SVG";


export default function Page() {
    return (
        <div className=" ">
            <SideScroll />
            <ProjectPage />
            <Skills />
            <div className="h-screen bg-ink ">
                <SVG
                    size={200}
                    color={"#ff4000"}
                />
            </div>
        </div>
    )
}