'use client';

import { cn } from "@/lib/utils"
import Safari from "../../ui/Safari";
import { motion, useMotionValueEvent, useScroll, type Transition } from "framer-motion";
import { useRef, useState } from "react";
import Block from "../../ui/Block";
import Experience from "./Experience";

const SNAP_TRANSITION: Transition = {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 0.6,
};

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isShifted, setIsShifted] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsShifted(latest > 0.5);
    });

    return (
        <section ref={sectionRef} className="relative h-[200vh]">
            <div className="sticky top-0 h-screen w-full p-10 overflow-hidden">
                <div
                    className={cn(
                        "absolute top-1/2 left-1/2 -translate-1/2 ",
                        "h-full w-full ",
                        "flex justify-center items-center gap-x-4",
                        "text-cement/70 text-8xl font-black "
                    )}
                >
                    {Array.from(["Work", "Experience"]).map((e) => (
                        <div
                            key={e}
                            className={cn(
                                "w-[50%] flex justify-center items-cente text-shadow-md ",
                                "bg-linear-to-b from-primary-light/20 to-transparent bg-clip-text text-transparent ",
                            )}
                        >
                            {e}
                        </div>
                    ))}
                </div>
                <Experience
                    isShifted={isShifted}
                />
            </div>
        </section>
    )
}
