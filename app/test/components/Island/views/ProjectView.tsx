"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import ToolTipComponent from "@/components/ui/TooltipComponent";
import Projects from "../../../data/project.data";
import user from "../../../data/user.data";
import { useIslandStore } from "../../../store/island.store";
import type { ProjectLinkKind } from "../../../types/project.type";
import ProjectIcon from "./ProjectIcon";

const linkIcons: Record<ProjectLinkKind, ComponentType<{ className?: string }>> = {
    live: Globe,
    repo: FaGithub,
};

const tooltipClass = "bg-cement/10 border border-cement";

const swapTransition = { duration: 0.3, ease: "easeOut" as const };
const shown = { opacity: 1, filter: "blur(0px)" };
const hidden = { opacity: 0, filter: "blur(4px)" };

// Project state: icon + name. Hovering keeps the icon, crossfades the name
// into the project's links, and mounts a preview image below; the island's
// auto height springs the pill open over it (no separate entrance animation,
// so it reads as the same state growing rather than a new one appearing). Name and links share one grid cell
// so the top row keeps its width while swapping.
// TODO: swap user.image for a per-project preview once those exist.
export default function ProjectView() {
    const index = useIslandStore((s) => s.projectIndex);
    const project = Projects[index] ?? Projects[0];
    const [hovered, setHovered] = useState(false);

    const links = project.links ?? [];
    const showLinks = hovered && links.length > 0;

    const icon = <ProjectIcon project={project} />;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex flex-col text-white"
        >
            <div className="flex h-11 items-center gap-2.5 pl-4 pr-5">
                {project.hero ? (
                    <ToolTipComponent content={project.name.toLowerCase()} className={tooltipClass}>
                        <Link href={`/projects/${project.slug}`} aria-label={project.name} className="shrink-0">
                            {icon}
                        </Link>
                    </ToolTipComponent>
                ) : (
                    icon
                )}

                <div className="grid items-center justify-items-center">
                    <motion.span
                        initial={false}
                        animate={showLinks ? hidden : shown}
                        transition={swapTransition}
                        className="col-start-1 row-start-1 truncate text-[12px] font-semibold tracking-tight"
                        style={{ pointerEvents: showLinks ? "none" : "auto" }}
                    >
                        {project.name}
                    </motion.span>
                    {links.length > 0 && (
                        <motion.div
                            initial={false}
                            animate={showLinks ? shown : hidden}
                            transition={swapTransition}
                            className="col-start-1 row-start-1 flex items-center gap-1"
                            style={{ pointerEvents: showLinks ? "auto" : "none" }}
                        >
                            {links.map(({ kind, href }) => {
                                const Icon = linkIcons[kind];
                                return (
                                    <ToolTipComponent key={kind} content={kind} className={tooltipClass}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={kind}
                                            className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                                        >
                                            <Icon className="h-4 w-4" />
                                        </a>
                                    </ToolTipComponent>
                                );
                            })}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* No entrance animation of its own: the pill's height spring reveals it. */}
            {hovered && (
                <div className="relative mx-2.5 mb-2.5 h-32 w-56 overflow-hidden rounded-2xl">
                    <Image src={user.image} alt={project.name} fill sizes="224px" className="object-cover" />
                </div>
            )}
        </div>
    );
}
