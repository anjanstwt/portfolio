import { cn } from "@/lib/utils";
import { experiences } from "../data/experiences";
import ExperienceType from "../types/experience-type";

export default function Experience({ className }: { className?: string }) {
    return (
        <section className={cn("w-full flex flex-col gap-6", className)}>
            <div className="-mx-6 w-[calc(100%+3rem)] border-y border-neutral-800 bg-neutral-900/40 px-6 py-2">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Experience</h2>
            </div>
            <div className="flex flex-col gap-8">
                {experiences.map((exp, i) => (
                    <ExperienceCard experience={exp} key={i} />
                ))}
            </div>
        </section>
    );
}

function ExperienceCard({ experience }: { experience: ExperienceType }) {
    return (
        <div className="group relative flex flex-col gap-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                <h3 className="font-medium text-neutral-200">{experience.company} <span className="text-neutral-500 font-normal">— {experience.role}</span></h3>
                <span className="text-sm tabular-nums text-neutral-500">{experience.dates}</span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed text-justify sm:text-left">
                {experience.description}
            </p>

            {experience.tech && experience.tech.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {experience.tech.map((t) => (
                        <ExperienceTechCard key={t} tech={t} />
                    ))}
                </div>
            )}
        </div>
    );
}

function ExperienceTechCard({ tech }: { tech: string }) {
    return (
        <span className="inline-flex items-center rounded bg-neutral-800/50 px-2 py-0.5 text-xs font-medium text-neutral-300 ring-1 ring-inset ring-neutral-700/50">
            {tech}
        </span>
    );
}