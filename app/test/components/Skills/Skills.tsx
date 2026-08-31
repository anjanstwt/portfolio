'use client';

import { cn } from "@/lib/utils";
import SkillsSection from "./SkillsSection";

export default function Skills() {
    return (
        <section className="bg-ink min-h-screen w-full ">
            <DottedBorder />
            <SkillsSection />
        </section>
    );
}

function DottedBorder() {
    return (
        <div
            className="h-screen absolute inset-0 pointer-events-none"
            style={{
                backgroundImage:
                    "radial-gradient(circle, #e4e4e440 0.5px, transparent 0.5px)",
                backgroundSize: "40px 40px",
            }}
        >
            <div className="h-full w-full absolute bg-linear-to-b from-ink via-transparent to-ink ">
            </div>
        </div>
    );
}