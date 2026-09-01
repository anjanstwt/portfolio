'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import Skills from "../../data/skills.data";
import Block from "../../ui/Block";

export default function SkillsSection() {
    return (
        <section className="bg-ink min-h-screen w-full">
            <div
                className={cn(
                    "h-full w-full flex flex-col justify-center items-center",
                    "py-32 px-10"
                )}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
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
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl w-full">
                    {Skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.06,
                                duration: 0.4,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            viewport={{ once: true, margin: "-50px" }}
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
        <Block
            className={cn(
                "flex flex-col items-center justify-center gap-3 p-6",
                "hover:bg-cement/20 transition-all duration-300",
                "group cursor-default"
            )}
        >
            <div className="relative w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <Image
                    src={skill.logo}
                    alt={skill.name}
                    fill
                    className="object-contain"
                />
            </div>
            <span className="text-primary-light/60 group-hover:text-primary-light/90 text-sm font-medium transition-colors duration-300">
                {skill.name}
            </span>
        </Block>
    );
}
