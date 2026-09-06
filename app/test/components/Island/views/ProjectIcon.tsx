"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ProjectType } from "../../../types/project.type";
import ProjectGlyph from "../../Projects/Hero/ProjectGlyph";

// A project's logo, or its hero glyph when there is no raster logo.
export default function ProjectIcon({ project, className }: { project: ProjectType; className?: string }) {
    return (
        <div className={cn("relative h-6 w-6 shrink-0", className)}>
            {project.logo ? (
                <Image src={project.logo} alt={project.name} fill className="object-contain" />
            ) : project.hero?.glyph ? (
                <ProjectGlyph
                    glyph={project.hero.glyph}
                    colored={project.hero.fill === "flat"}
                    className="absolute inset-0 h-full w-full text-white"
                />
            ) : null}
        </div>
    );
}
