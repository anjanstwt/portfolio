import ProjectPage from "./components/Projects/ProjectPage";
import SideScroll from "./components/SideScroll";


export default function Page() {
    return (
        <div className=" ">
            <SideScroll />
            <ProjectPage />
            <div className="h-screen bg-cement "></div>
        </div>
    )
}