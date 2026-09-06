import { cn } from "@/lib/utils"
import Image from "next/image"
import Projects from "../../data/project.data"
import ToolTipComponent from "@/components/ui/TooltipComponent"
import ProjectGlyph from "./Hero/ProjectGlyph"

export default function SideCapsule({
    activeIndex = 0,
    onSelect,
}: {
    activeIndex?: number,
    onSelect?: (index: number) => void,
}) {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <div className="sticky top-[50vh] -translate-y-1/2 w-fit ml-auto mr-6 z-10 pointer-events-auto">
                <div className="border border-cement p-1.5 rounded-lg flex flex-col gap-2.5 bg-cement/10 backdrop-blur-md">
                    {Projects.map((project, i) => (
                        <ToolTipComponent
                            key={project.slug}
                            side="left"
                            className="bg-cement/10 border border-cement "
                            content={project.name.toLowerCase()}
                        >
                            <button
                                type="button"
                                onClick={() => onSelect?.(i)}
                                aria-label={`Scroll to ${project.name}`}
                                className={cn(
                                    "relative h-9 w-9 rounded-md p-1.5 overflow-hidden transition-colors duration-300",
                                    i === activeIndex ? "bg-cement " : "bg-transparent hover:bg-cement ",
                                    "cursor-pointer",
                                )}
                            >
                                {project.logo ? (
                                    <Image
                                        src={project.logo}
                                        alt={project.name}
                                        fill
                                        className="object-contain p-1"
                                    />
                                ) : project.hero?.glyph ? (
                                    <ProjectGlyph
                                        glyph={project.hero.glyph}
                                        colored={project.hero.fill === "flat"}
                                        className="absolute inset-0 h-full w-full p-1 text-white"
                                    />
                                ) : null}
                            </button>
                        </ToolTipComponent>
                    ))}
                </div>
            </div>
        </div>
    )
}
