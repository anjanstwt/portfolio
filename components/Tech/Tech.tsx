import { Logos } from "../Logos/Logos";
import ToolTip from "../ToolTip";
import { Logo } from "./Logo";
import gsap from "gsap";

interface TechProps {
    ref?: React.Ref<HTMLDivElement>,
    className?: string
}

export const Tech = ({ ref, className }: TechProps) => {

    const LogoNames = Logos.map((l) => (l.name));

    const handleAnimation = (el: HTMLDivElement | null) => {
        if (!el) return;
        const logos = el.querySelectorAll(".logo");

        const tl = gsap.timeline();

        tl.from([], {
            duration: 1.5
        });

        tl.fromTo(
            logos,
            {
                opacity: 0,
                y: 20,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.07,
                ease: "power2.out",
                duration: 0.4,
                delay: 0.3,
            }
        );
    }

    return <div
        className={`p-4 lg:p-5 bg-[#D8CFBC] rounded flex flex-col gap-y-3 overflow-hidden ${className}`}
        ref={ref}
    >
        <div className="text-2xl w-full border-b-2 border-[#0f0f0f] pb-1 ">
            Tech-stack
        </div>
        {/* tech stack */}
        <div
            className="w-full flex flex-wrap justify-start items-start gap-[5px] lg:gap-2 "
            ref={(el) => handleAnimation(el)}
        >
            {
                LogoNames.map((name: string, index: number) => (
                    <ToolTip text={name} key={index} className="flex-shrink-0 " >
                        <Logo name={name} />
                    </ToolTip>
                ))
            }
        </div>
    </div>
}