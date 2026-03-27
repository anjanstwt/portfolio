'use client';

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { projects } from "../data/projects";
import ProjectType from "../types/project-type";
import SectionHeading from "../ui/SectionHeading";
import { Logos } from "../Logos/Logos";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Maximize2 } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io";
import Image from "next/image";
import { FaWifi } from "react-icons/fa";

export default function Projects({ className }: { className?: string }) {
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

    return (
        <section className={cn("w-full flex flex-col relative", className)}>
            <SectionHeading title="Projects" extra="I've built" />
            <div className="flex flex-col">
                {projects.map((project, i) => (
                    <ProjectCard project={project} key={i} onClick={() => setSelectedProject(project)} />
                ))}
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
}

function ProjectCard({ project, onClick }: { project: ProjectType, onClick: () => void }) {
    return (
        <div onClick={onClick} className="group flex flex-col justify-between gap-y-3 py-6 border-b border-neutral-800 last:border-0 hover:bg-neutral-900/40 -mx-6 px-6 transition-colors cursor-pointer">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {project.logo && (
                            <Image src={project.logo} alt={project.title} width={20} height={20} className="w-5 h-5 rounded-sm object-cover bg-white/10" unoptimized />
                        )}
                        <h3 className="font-semibold text-neutral-100 group-hover:text-white transition-colors">
                            {project.title}
                        </h3>
                    </div>
                    <span className="text-sm text-neutral-400 font-medium">{project.year}</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed line-clamp-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                    {project.tech.map((t) => {
                        const searchStr = t.toLowerCase().replace('.js', 'js');
                        const logoObj = Logos.find(l => l.name.toLowerCase() === searchStr || l.name.toLowerCase().startsWith(searchStr.split(' ')[0]) || l.name.toLowerCase().includes(t.toLowerCase()));

                        return (
                            <div key={t} className="flex items-center gap-x-1.5 px-2 py-1 rounded bg-neutral-900/50 border border-neutral-800">
                                {logoObj && typeof logoObj.url === 'string' ? (
                                    <Image src={logoObj.url} alt={t} width={14} height={14} className="w-3.5 h-3.5 opacity-90" unoptimized />
                                ) : logoObj && typeof logoObj.url !== 'string' ? (
                                    <div className="w-3.5 h-3.5 opacity-90">{logoObj.url}</div>
                                ) : null}
                                <span className="text-[10px] text-neutral-300 font-medium lowercase">{t}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            {project.live && (
                <div className="text-xs text-neutral-400 group-hover:text-neutral-300 mt-1 inline-flex items-center font-medium">
                    View Details <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
            )}
        </div>
    );
}

function ProjectModal({ project, onClose }: { project: ProjectType | null, onClose: () => void }) {
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (fullscreenImage) setFullscreenImage(null);
                else onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, fullscreenImage]);

    return (
        <AnimatePresence>
            {project && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-neutral-800 bg-[#09090b] shadow-2xl hide-scrollbar"
                        data-lenis-prevent
                    >
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-800 bg-[#09090b]/80 backdrop-blur-md px-6 py-4">
                            <div className="flex items-center gap-3">
                                {project.logo && (
                                    <Image src={project.logo} alt={project.title} width={24} height={24} className="w-6 h-6 rounded-sm object-cover bg-white/10" unoptimized />
                                )}
                                <h2 className="text-lg font-semibold text-white capitalize">{project.title}</h2>
                                {project.live && project.live !== 'https://' && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                                    >
                                        <FaWifi className="w-3 h-3" />
                                        live
                                    </a>
                                )}
                                {project.repo && (
                                    <a
                                        href={project.isPrivate ? "#" : project.repo}
                                        target={project.isPrivate ? "" : "_blank"}
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                                    >
                                        <IoLogoGithub className="w-3 h-3" />
                                        {project.isPrivate ? "private" : "open source"}
                                    </a>
                                )}
                                {project.x && (
                                    <a
                                        href={project.x}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                                    >
                                        <BsTwitterX className="w-2 h-2" />
                                        handle
                                    </a>
                                )}
                            </div>
                            <button onClick={onClose} className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-8">
                            {/* Images Carousel or Layout */}
                            {project.images && project.images.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Gallery</div>
                                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar" data-lenis-prevent>
                                        {project.images.map((img, idx) => (
                                            <div key={idx} className="relative w-[85%] sm:w-[70%] flex-shrink-0 snap-center rounded-lg border border-neutral-800 overflow-hidden shadow-sm bg-neutral-900 aspect-video group">
                                                <Image
                                                    src={img}
                                                    alt={`${project.title} - image ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                    width={1920}
                                                    height={1080}
                                                    unoptimized
                                                />
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setFullscreenImage(img); }}
                                                    className="absolute bottom-3 right-3 p-1.5 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur hover:bg-black/80 shadow-md"
                                                >
                                                    <Maximize2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Details */}
                            <div className="flex flex-col gap-3">
                                <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">About</div>
                                <p className="text-sm text-neutral-300 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="flex flex-col gap-3">
                                <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Tech Stack</div>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => {
                                        const searchStr = t.toLowerCase().replace('.js', 'js');
                                        const logoObj = Logos.find(l => l.name.toLowerCase() === searchStr || l.name.toLowerCase().startsWith(searchStr.split(' ')[0]) || l.name.toLowerCase().includes(t.toLowerCase()));

                                        return (
                                            <div key={t} className="flex items-center gap-x-2 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800">
                                                {logoObj && typeof logoObj.url === 'string' ? (
                                                    <Image src={logoObj.url} alt={t} width={16} height={16} className="w-4 h-4 opacity-90" unoptimized />
                                                ) : logoObj && typeof logoObj.url !== 'string' ? (
                                                    <div className="w-4 h-4 opacity-90">{logoObj.url}</div>
                                                ) : null}
                                                <span className="text-xs text-neutral-200 font-medium capitalize">{t}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {fullscreenImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md"
                                onClick={() => setFullscreenImage(null)}
                            >
                                <button
                                    onClick={() => setFullscreenImage(null)}
                                    className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors shadow-lg"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <Image
                                    src={fullscreenImage}
                                    alt="Fullscreen view"
                                    className="max-w-[95vw] max-h-[95vh] object-contain rounded-md shadow-2xl"
                                    width={1920}
                                    height={1080}
                                    unoptimized
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    );
}