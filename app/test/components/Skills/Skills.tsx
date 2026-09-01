'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import Skills from "../../data/skills.data";

export default function SkillsSection() {
    return (
        <section className="bg-ink min-h-screen w-full">
            <div
                className={cn(
                    "h-full w-full flex flex-col justify-center items-center",
                    "py-32 px-10"
                )}
            >
                <div className="mb-16 text-center">
                    <h2
                        className={cn(
                            "text-6xl font-black bg-linear-to-b from-primary-light/60 to-transparent bg-clip-text text-transparent"
                        )}
                    >
                        Skills
                    </h2>
                    <p className="text-primary-light/40 text-lg mt-4">
                        Technologies I work with
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl w-full">
                    {Skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <SkillCard skill={skill} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SkillCard({ skill }: { skill: { name: string; logo: string } }) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 p-6 rounded-2xl",
                "bg-cement/10 backdrop-blur-md border border-primary-light/10",
                "hover:bg-cement/20 hover:border-primary-light/20 transition-all duration-300",
                "group"
            )}
        >
            <div className="relative w-12 h-12">
                <Image
                    src={skill.logo}
                    alt={skill.name}
                    fill
                    className="object-contain"
                />
            </div>
            <span className="text-primary-light/70 text-sm font-medium">
                {skill.name}
            </span>
        </div>
    );
}