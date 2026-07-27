"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

interface ProjectType {
    name: string,
    summary: string,
    color?: string,
}

const Projects: ProjectType[] = [
    { name: "Winterfell", summary: "AI and Kubernetes orchestrated Solana Smart Contract generator, builder, tester, and deployer.", color: "#6c44fc" },
    { name: "OrderBook", summary: "RustLang based extreme low latency orderbook, with O(1) next best price finder." },
    { name: "HighGarden", summary: "Prediction Marketplace based on Solana chain, with prefilled liquidity and market makers from Polymarket", color: "#ff4000" },
];

// Matches the base values configured in LenisProvider — kept in sync so the
// slowdown always eases back to the site's normal scroll feel, not a guess.
const BASE_WHEEL_MULTIPLIER = 1.15;
const BASE_TOUCH_MULTIPLIER = 1.4;
const MIN_SPEED_FACTOR = 0.28; // how slow scrolling gets right as a name crosses center
const CENTER_CAPTURE_RADIUS = 260; // px from viewport center where the slowdown starts to kick in

export default function ProjectPage() {
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    useCenterMagnetism(projectRefs);

    return (
        <section className="relative min-h-screen overflow-y-scroll">
            <div className="h-full w-full flex flex-col justify-center items-center pt-60 pb-90 ">
                {Projects.map((project, i) => (
                    <Project
                        key={project.name}
                        name={project.name}
                        summary={project.summary}
                        color={project.color}
                        onRef={(el) => { projectRefs.current[i] = el; }}
                    />
                ))}
            </div>
        </section>
    )
}

// Slows the global Lenis scroll down as any project's name approaches the
// vertical center of the viewport, then eases back to normal speed past it.
function useCenterMagnetism(refs: React.RefObject<(HTMLDivElement | null)[]>) {
    const lenis = useLenis((lenisInstance) => {
        const viewportCenter = window.innerHeight / 2;
        let minDistance = Infinity;

        for (const el of refs.current) {
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            minDistance = Math.min(minDistance, Math.abs(elementCenter - viewportCenter));
        }
        if (minDistance === Infinity) return;

        const proximity = Math.min(1, minDistance / CENTER_CAPTURE_RADIUS);
        const eased = proximity * proximity * (3 - 2 * proximity); // smoothstep
        const speedFactor = MIN_SPEED_FACTOR + (1 - MIN_SPEED_FACTOR) * eased;

        lenisInstance.options.wheelMultiplier = BASE_WHEEL_MULTIPLIER * speedFactor;
        lenisInstance.options.touchMultiplier = BASE_TOUCH_MULTIPLIER * speedFactor;
    });

    useEffect(() => {
        return () => {
            if (!lenis) return;
            lenis.options.wheelMultiplier = BASE_WHEEL_MULTIPLIER;
            lenis.options.touchMultiplier = BASE_TOUCH_MULTIPLIER;
        };
    }, [lenis]);
}

function Project({ name, summary, color, onRef }: ProjectType & { onRef: (el: HTMLDivElement | null) => void }) {

    const projectRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: projectRef,
        offset: ["start end", "end start"],
    });

    const opacityContent = useTransform(scrollYProgress, [0.35, 0.40, 0.60, 0.65], [0, 1, 1, 0]);
    const sizeContent = useTransform(scrollYProgress, [0.35, 0.47, 0.53, 0.65], [0.75, 1, 1, 0.75]);

    return (
        <motion.div
            ref={(el) => {
                projectRef.current = el;
                onRef(el);
            }}
            className={cn(
                "text-center py-10 px-10 ",
                "bg-transparent transition-colors duration-500 ease-in-out "
            )}
            style={{
                opacity: opacityContent,
                scale: sizeContent,
            }}
            whileHover={{
                backgroundColor: color ?? "white"
            }}
            transition={{
                backgroundColor: {
                    duration: 500,
                    ease: "easeInOut",
                }
            }}
        >
            <div className={cn("text-white text-9xl font-black ")}>
                {name}
            </div>
            <div className={cn("text-white text-lg ")} >
                {summary}
            </div>
        </motion.div>
    )
}