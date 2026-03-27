

import { IconChevronCompactLeft, IconChevronCompactRight } from "@tabler/icons-react";
import { Gmail } from "../SVGs/Gmail";
import { HireMe } from "../SVGs/HireMe";
import { ExperienceCard } from "./ExperienceCard"
import { ExperienceDetails } from "./ExperienceDetails"
import { useRef, useState } from "react";
import gsap from "gsap";

interface ExperienceProps {
    ref?: React.Ref<HTMLDivElement>,
    className?: string
}

export const Experience = ({ ref, className }: ExperienceProps) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollLeftButtonRef = useRef<HTMLDivElement>(null);
    const scrollRightButtonRef = useRef<HTMLDivElement>(null);


    const allExperiences = ExperienceDetails.map((c) => c.company);

    const scrollLeft = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: -scrollRef.current.offsetWidth,
            behavior: "smooth"
        });
    }

    const scrollRight = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: scrollRef.current.offsetLeft,
            behavior: "smooth"
        });
    }

    const handleActiveAnimation = () => {
        const left = scrollLeftButtonRef.current;
        const right = scrollRightButtonRef.current;

        if (!left || !right) return;

        gsap.set([right, left], {
            y: 60,
            opacity: 0
        });

        gsap.to(right, {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
        });

        gsap.to(left, {
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
            delay: 0.1
        });
    }

    const handleDeactiveAnimation = () => {
        const left = scrollLeftButtonRef.current;
        const right = scrollRightButtonRef.current;

        if (!left || !right) return;

        gsap.to(left, {
            y: 60,
            opacity: 0,
            duration: 0.2,
            ease: "power2.out"
        });

        gsap.to(right, {
            y: 60,
            opacity: 0,
            duration: 0.1,
            ease: "power2.out",
            delay: 0.1
        });
    }

    return <div
        className={`relative bg-[#D8CFBC] rounded overflow-hidden p-4 2xl:p-5 flex flex-col gap-y-3 ${className} `}
        ref={ref}
        onMouseEnter={handleActiveAnimation}
        onMouseLeave={handleDeactiveAnimation}
    >
        <div className="text-2xl w-full border-b-2 border-[#0f0f0f] flex justify-between items-center pb-1 ">
            <div>
                Experience
            </div>
            <a
                className="flex items-center justify-center gap-x-1 py-1 px-2 transition-colors duration-200 ease-in-out cursor-pointer rounded hover:bg-[#ada592] "
                href={""}
            >
                <Gmail />
                <div className="text-[16px]  ">
                    Hire me
                </div>
            </a>
        </div>
        <div
            className="w-full h-full flex overflow-x-auto overflow-y-hidden gap-x-4 px-1 [::-webkit-scrollbar]:hidden [scrollbar-width:none] scroll-smooth snap-x snap-mandatory"
            ref={scrollRef}
        >
            {
                allExperiences.map((company, index) => (
                    <ExperienceCard
                        company={company}
                        key={index}
                        className="flex-shrink-0 snap-start "
                    />
                ))
            }
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4">
            <ScrollButton
                type="left"
                onClick={scrollLeft}
                ref={scrollLeftButtonRef}
            />
            <ScrollButton
                type="right"
                onClick={scrollRight}
                ref={scrollRightButtonRef}
            />
        </div>

    </div>
}

interface ScrollButtonProps {
    type: "left" | "right",
    onClick?: () => void,
    ref?: React.Ref<HTMLDivElement>
}

const ScrollButton = ({ type, onClick, ref }: ScrollButtonProps) => {
    return (
        <div
            className="p-2 rounded bg-[#0f0f0f] text-[#D8CFBC] border border-[#D8CFBC] cursor-pointer opacity-0 "
            onClick={onClick}
            ref={ref}
        >
            {type === "left" ? <IconChevronCompactLeft /> : <IconChevronCompactRight />}
        </div>
    );
};

