"use client";

import { useState } from "react";
import ToolTip from "./ToolTip";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ["latin"]
});

interface ContactProps {
    ref?: React.Ref<HTMLDivElement>,
    className?: string
}

export const Contact = ({ ref, className }: ContactProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState<null | "twitter" | "linkedin" | "github" | "resume">(null);

    const handleMouseEnter = (
        e: React.MouseEvent<HTMLAnchorElement>,
        type: "twitter" | "linkedin" | "github" | "resume"
    ) => {
        setPosition({
            x: e.clientX,
            y: e.clientY,
        });
        setHovered(type);
    };

    return (
        <div
            className={`h-full w-full p-5 flex justify-center items-center gap-x-6 sm:gap-x-9 2xl:gap-x-12 text-xs sm:text-[16px] 2xl:text-lg relative bg-[#D8CFBC] rounded overflow-hidden opacity-0 ${className} ${roboto.className}`}
            ref={ref}
        >
            <a
                target="_blank"
                href="https://x.com/AnjanSuman8"
                className="cursor-pointer"
                onMouseEnter={(e) => handleMouseEnter(e, "twitter")}
                onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHovered(null)}
            >
                TWITTER
            </a>
            <a
                target="_blank"
                href="https://www.linkedin.com/in/anjansuman"
                className="cursor-pointer"
                onMouseEnter={(e) => handleMouseEnter(e, "linkedin")}
                onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHovered(null)}
            >
                LINKEDIN
            </a>
            <a
                target="_blank"
                href="https://github.com/Anjansuman"
                className="cursor-pointer"
                onMouseEnter={(e) => handleMouseEnter(e, "github")}
                onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHovered(null)}
            >
                GITHUB
            </a>
            <a
                target="_blank"
                href="https://drive.google.com/file/d/1tiMKLVbUUM6WfgVFRVZuQ5YMeupmLu_r/view?usp=drivesdk"
                className="cursor-pointer"
                onMouseEnter={(e) => handleMouseEnter(e, "resume")}
                onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHovered(null)}
            >
                RESUME
            </a>

        </div>
    );
};
