"use client";

import { scrollSpeed } from "@/lib/lenisScrollSpeed";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import SideCapsule from "./SideCapsule";
import Project from "./Project";
import Projects from "../../data/project.data";


const MIN_SPEED_FACTOR = 0.19; // how slow scrolling gets right as a name crosses center
const CENTER_CAPTURE_RADIUS = 330; // px from viewport center where the slowdown starts to kick in
const SPEED_SMOOTHING = 0.36; // how gradually the multiplier eases toward its target each frame

export default function ProjectPage() {

    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const activeIndex = useCenterMagnetism(projectRefs);
    const lenis = useLenis();

    const scrollToProject = (index: number) => {
        const el = projectRefs.current[index];
        if (!el || !lenis) return;
        const offset = -(window.innerHeight - el.offsetHeight) / 2;
        lenis.scrollTo(el, { offset, duration: 1.2 });
    };

    return (
        <section className="relative min-h-screen">
            <SideCapsule activeIndex={activeIndex} onSelect={scrollToProject} />
            <div className="h-full w-full flex flex-col justify-center items-center pt-60 pb-90 ">
                {Projects.map((project, i) => (
                    <Project
                        key={project.name}
                        name={project.name}
                        summary={project.summary}
                        color={project.color}
                        logo={project.logo}
                        onRef={(el) => { projectRefs.current[i] = el; }}
                    />
                ))}
            </div>
        </section>
    )
}

// Slows the global Lenis scroll down as any project's name approaches the
// vertical center of the viewport, then eases back to normal speed past it.
// Also tracks which project is nearest center, for SideCapsule's active-item
// indicator.
function useCenterMagnetism(refs: React.RefObject<(HTMLDivElement | null)[]>) {
    const currentSpeedFactor = useRef(1);
    const activeIndexRef = useRef(0);
    const [activeIndex, setActiveIndex] = useState(0);

    useLenis(() => {
        const viewportCenter = window.innerHeight / 2;
        let minDistance = Infinity;
        let nearestIndex = activeIndexRef.current;

        refs.current.forEach((el, i) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - viewportCenter);
            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = i;
            }
        });
        if (minDistance === Infinity) return;

        if (nearestIndex !== activeIndexRef.current) {
            activeIndexRef.current = nearestIndex;
            setActiveIndex(nearestIndex);
        }

        const proximity = Math.min(1, minDistance / CENTER_CAPTURE_RADIUS);
        const eased = proximity * proximity * (3 - 2 * proximity); // smoothstep
        const targetSpeedFactor = MIN_SPEED_FACTOR + (1 - MIN_SPEED_FACTOR) * eased;

        // Ease the multiplier toward its target over time, rather than
        // snapping to it every frame — this is what keeps the deceleration
        // and reacceleration feeling gradual instead of jumpy.
        currentSpeedFactor.current += (targetSpeedFactor - currentSpeedFactor.current) * SPEED_SMOOTHING;

        // Lenis freezes wheelMultiplier/touchMultiplier internally at
        // construction time, so mutating lenis.options here has no effect —
        // scrollSpeed.factor is read directly inside LenisProvider's
        // virtualScroll hook instead, which is the only place that can still
        // influence scroll speed dynamically.
        scrollSpeed.factor = currentSpeedFactor.current;
    });

    useEffect(() => {
        return () => {
            scrollSpeed.factor = 1;
        };
    }, []);

    return activeIndex;
}
