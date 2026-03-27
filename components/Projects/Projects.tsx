
import { ProjectCard } from "./ProjectCard";
import { ProjectDetails } from "./ProjectDetails";

interface ProjectsProps {
    ref?: React.Ref<HTMLDivElement>,
    className?: string
}

export const Projects = ({ ref, className }: ProjectsProps) => {

    

    return <div className={`h-full w-full p-5 relative bg-[#D8CFBC] rounded flex flex-col justify-start gap-y-3 overflow-hidden opacity-0 ${className} `}
        ref={ref}
    >
        <div className="text-2xl w-full border-b-2 border-[#0f0f0f] pb-1 ">
            Projects
        </div>
        <div className="flex flex-col gap-y-4 overflow-x-hidden overflow-y-auto [::-webkit-scrollbar]:hidden [scrollbar-width:none] ">
            {
                ProjectDetails.map((project, index) => (
                    <div
                        className="flex flex-col gap-y-4 "
                        key={index}
                    >
                        {
                            index !== 0 ? <div className="h-[0.5px] w-full rounded bg-[#0f0f0f] "></div> : ""
                        }
                        <ProjectCard
                            className="project "
                            name={project.name}
                            description={project.description}
                            img={project.img}
                            skills={project.skills}
                            github={project.github}
                            live={project.live}
                            positionCount={index}
                        />
                    </div>
                ))
            }
        </div>
    </div>
}