import { cn } from "@/lib/utils";
import { projects } from "../data/projects";
import ProjectType from "../types/project-type";
import Heading from "../ui/Heading";
import { HorizontalGap, VerticalGap } from "../ui/Gap";

export default function Projects({ className }: { className?: string }) {
    return (
        <div className={cn(
            "w-full",
            className
        )}
        >
            <Heading heading={'projects'} tag={"I've built"} />
            <div className="relative flex flex-col gap-y-2 ">
                <VerticalGap className="h-full absolute border-y-0 border-l-0 " />
                <HorizontalGap className="border-x-0 border-t-0 " />
                {projects.map((project, i) => (
                    <>
                        <ProjectCard project={project} />
                        {i < projects.length - 1 && (
                            <HorizontalGap className="border-x-0" />
                        )}
                    </>
                ))}
                <HorizontalGap className="border-x-0 border-b-0" />
                <VerticalGap className="h-full absolute right-0 border-y-0 border-r-0 " />
            </div>
        </div>
    );
}

function ProjectCard({ project }: { project: ProjectType }) {

    function truncate(str: string) {
        if (str.length > 20) return str.substring(0, 60) + '...';
        else str;
    }

    return (
        <div className="w-full flex flex-col gap-y-2 text-sm text-neutral-500 cursor-pointer ">
            <Heading
                logo={project.logo}
                heading={project.title}
                tag2={project.year}
                size={'xs'}
                className="px-3"
            />
            <div className="text-xs layout-double-padding">
                {truncate(project.description)}
            </div>
        </div>
    );
}