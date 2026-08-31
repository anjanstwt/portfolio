'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Safari from "../../ui/Safari";
import Block from "../../ui/Block";
import Skills from "../../data/skills.data";
import SkillCard from "./SkillCard";

export default function SkillsSection() {
    return (
        <section className="relative min-h-screen w-full py-32 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <DottedBackground />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className={cn(
                        "text-6xl md:text-7xl font-bold",
                        "bg-linear-to-b from-primary-light/60 to-transparent bg-clip-text text-transparent",
                    )}>
                        Technical Skills
                    </h2>
                    <p className="mt-4 text-primary-light/50 text-lg">
                        Technologies I work with
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Safari
                            url="skills.dev"
                            size="360"
                            className="w-full"
                        >
                            <div className="h-full w-full bg-ink/90 p-6 flex flex-col">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    <span className="ml-2 text-xs text-primary-light/40 font-mono">
                                        ~/skills
                                    </span>
                                </div>
                                <div className="flex-1 grid grid-cols-3 gap-3">
                                    {Skills.slice(0, 6).map((skill) => (
                                        <SkillIcon key={skill.name} {...skill} />
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-primary-light/10">
                                    <div className="flex items-center gap-2 text-xs text-primary-light/30">
                                        <span className="w-2 h-2 rounded-full bg-green-500/60 animate-pulse" />
                                        <span>6 technologies loaded</span>
                                    </div>
                                </div>
                            </div>
                        </Safari>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    >
                        {Skills.map((skill, index) => (
                            <SkillCard
                                key={skill.name}
                                name={skill.name}
                                logo={skill.logo}
                                index={index}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function SkillIcon({ name, logo }: { name: string; logo: string }) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center gap-2 p-3 rounded-xl",
            "bg-cement/10 border border-primary-light/5",
            "hover:bg-cement/20 hover:border-primary-light/15",
            "transition-all duration-200",
        )}>
            <div className="w-10 h-10 rounded-lg bg-ink/60 p-2 flex items-center justify-center">
                <img
                    src={logo}
                    alt={name}
                    className="w-full h-full object-contain"
                />
            </div>
            <span className="text-[10px] text-primary-light/50 text-center leading-tight">
                {name}
            </span>
        </div>
    );
}

function DottedBackground() {
    return (
        <div
            className="absolute inset-0"
            style={{
                backgroundImage:
                    "radial-gradient(circle, #e4e4e440 0.5px, transparent 0.5px)",
                backgroundSize: "40px 40px",
            }}
        >
            <div className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />
        </div>
    );
}
