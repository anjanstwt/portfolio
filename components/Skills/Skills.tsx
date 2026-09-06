'use client';

import { cn } from "@/lib/utils";
export default function Skills() {
    return (
        <section className="bg-ink min-h-screen w-full ">
            <div
                className={cn(
                    "transform-3d h-full w-full flex justify-center items-center",
                    "bg-linear-to-b from-ink via-transparent to-ink "
                )}
            >
                <DottedBorder />
            </div>


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