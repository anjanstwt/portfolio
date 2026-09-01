'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import Block from "../../ui/Block";
import Skills from "../../data/skills.data";

export default function SkillsSection() {
    return (
        <section className="w-full py-24 px-10">
            <div className="flex flex-col items-center gap-10 max-w-2xl mx-auto">
                <div className="text-center">
                    <h2
                        className={cn(
                            "text-4xl font-black bg-linear-to-b from-primary-light/60 to-transparent bg-clip-text text-transparent"
                        )}
                    >
                        Skills
                    </h2>
                    <p className="text-primary-light/40 text-sm mt-2">
                        Technologies I work with
                    </p>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 w-full">
                    {Skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
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
        <Block
            className={cn(
                "flex-col gap-2 aspect-square rounded-2xl p-3",
                "hover:bg-cement/20 hover:border-primary-light/20 transition-all duration-300"
            )}
        >
            <div className="relative w-6 h-6">
                <Image
                    src={skill.logo}
                    alt={skill.name}
                    fill
                    className="object-contain"
                />
            </div>
            <span className="text-primary-light/70 text-[11px] font-medium text-center leading-tight">
                {skill.name}
            </span>
        </Block>
    );
}