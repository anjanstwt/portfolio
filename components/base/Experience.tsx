import { cn } from "@/lib/utils";
import { experiences } from "../data/experiences";
import ExperienceType from "../types/experience-type";
import SectionHeading from "../ui/SectionHeading";

export default function Experience({ className }: { className?: string }) {
    return (
        <section className={cn("w-full flex flex-col gap-4", className)}>
            <SectionHeading title="Experience" />
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
                <h3 className="font-medium text-neutral-100">{experience.company} <span className="text-neutral-400 font-normal">— {experience.role}</span></h3>
                <span className="text-sm tabular-nums text-neutral-400">{experience.dates}</span>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed text-justify sm:text-left">
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