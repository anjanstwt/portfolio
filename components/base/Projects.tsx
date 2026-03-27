import { cn } from "@/lib/utils";
import { projects } from "../data/projects";
import ProjectType from "../types/project-type";

export default function Projects({ className }: { className?: string }) {
    return (
        <section className={cn("w-full flex flex-col gap-6", className)}>
            <div className="-mx-6 w-[calc(100%+3rem)] border-y border-neutral-800 bg-neutral-900/40 px-6 py-2">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Projects</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project, i) => (
                    <ProjectCard project={project} key={i} />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: ProjectType }) {
    return (
        <div className="group relative flex flex-col justify-between gap-y-3 rounded border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:bg-neutral-800/80 hover:border-neutral-700 cursor-pointer">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-neutral-200 group-hover:text-white transition-colors">
                        {project.title}
                    </h3>
                    <span className="text-xs text-neutral-500">{project.year}</span>
                </div>
                <p className="text-sm text-neutral-400 line-clamp-2">
                    {project.description}
                </p>
            </div>
            {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="text-xs text-neutral-300 hover:text-white mt-2 inline-flex items-center">
                    Visit project <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
            )}
        </div>
    );
}