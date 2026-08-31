'use client';

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Block from "../../ui/Block";
import Skills from "../../data/skills.data";
import Image from "next/image";

export default function SkillsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

    return (
        <section ref={sectionRef} className="relative min-h-screen py-20 px-10">
            <motion.div
                style={{ opacity, scale }}
                className="max-w-6xl mx-auto"
            >
                <div className="text-center mb-16">
                    <h2 className="text-6xl font-bold bg-linear-to-b from-primary-light/20 to-transparent bg-clip-text text-transparent">
                        Skills & Technologies
                    </h2>
                    <p className="mt-4 text-primary-light/40 text-lg">
                        Technologies I work with
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Skills.map((skill) => (
                        <SkillCard key={skill.name} skill={skill} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

function SkillCard({ skill }: { skill: { name: string; logo: string } }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Block className="p-6 h-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-16 h-16">
                        <Image
                            src={skill.logo}
                            alt={skill.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-primary-light/70 font-medium">
                        {skill.name}
                    </span>
                </div>
            </Block>
        </motion.div>
    );
}