import { cn } from "@/lib/utils";
import { experiences } from "../data/experiences";
import ExperienceType from "../types/experience-type";
import Heading from "../ui/Heading";
import { HorizontalGap, VerticalGap } from "../ui/Gap";

export default function Experience({ className }: { className?: string }) {
    return (
        <div className={cn(
            "w-full h-full ",
            className
        )}
        >
            <Heading heading={'experiences'} tag={'I had'} />
            <div className="w-full h-full relative flex items-center justify-between gap-4">
                <VerticalGap className="h-full absolute border-y-0 border-l-0 " />
                <div className="w-full flex flex-wrap gap-2">
                    <HorizontalGap className="border-x-0 border-t-0 " />
                    {experiences.map((exp, i) => (
                        <>
                            <ExperienceCard
                                experience={exp}
                                key={i}
                            />
                            {i < experiences.length - 1 && (
                                <HorizontalGap className="border-x-0" />
                            )}
                        </>
                    ))}
                    <HorizontalGap className="border-x-0 border-b-0" />
                </div>
                <VerticalGap className="h-full absolute right-0 border-y-0 border-r-0 " />
            </div>
        </div>
    );
}

function ExperienceCard({ experience }: { experience: ExperienceType }) {
    return (
        <div className="w-full flex flex-col text-sm text-neutral-500 ">
            <div className="flex justify-between items-center">
                <Heading
                    heading={experience.company}
                    tag={experience.role}
                    tag2={experience.dates}
                    size={'sm'}
                    className="px-3"
                />
            </div>

            <div className="flex flex-col layout-double-padding">

            <div className="mt-2 text-justify">
                {experience.description}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
                {experience.tech.map((t) => (
                    <ExperienceTechCard key={t} tech={t} />
                ))}
            </div>
            </div>
        </div>
    );
}


function ExperienceTechCard({ tech }: { tech: string }) {
    return (
        <div className={cn(
            "w-fit px-2 py-1 rounded-md bg-[#101010] border border-neutral-700 text-neutral-200 text-xs",
            "cursor-pointer",
        )}>
            {tech}
        </div>
    );
}