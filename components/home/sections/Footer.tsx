"use client";

import { FiArrowUpRight } from "react-icons/fi";
import Block from "@/components/home/block/Block";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 mt-8">
            <Block
                left={
                    <div className="size-4.5 p-0.75 bg-fg text-page rounded-[3px] font-bold text-xs flex items-center justify-center">
                        ©
                    </div>
                }
            >
                <div className="px-3.5 pb-3 flex flex-col justify-end h-full">
                    <div className="text-mute text-xs min-[480px]:max-md:text-base">Copyright</div>
                    <div className="text-fg">{currentYear}</div>
                </div>
            </Block>

            <a
                href="https://github.com/anjanstwt"
                target="_blank"
                rel="noopener noreferrer"
                className="contents"
            >
                <Block
                    left={
                        <FaGithub className="size-4.5 text-page bg-fg p-0.75 rounded-[4px]" />
                    }
                    right={<FiArrowUpRight />}
                >
                    <div className="px-3.5 pb-3 flex flex-col justify-end h-full">
                        <div className="text-mute text-xs min-[480px]:max-md:text-base">GitHub</div>
                        <div className="text-fg">@anjanstwt</div>
                    </div>
                </Block>
            </a>

            <a
                href="https://linkedin.com/in/anjanstwt"
                target="_blank"
                rel="noopener noreferrer"
                className="contents"
            >
                <Block
                    left={
                        <FaLinkedinIn className="size-4.5 p-0.75 bg-[#0A66C2] text-neutral-100 rounded-[3px]" />
                    }
                    right={<FiArrowUpRight />}
                >
                    <div className="px-3.5 pb-3 flex flex-col justify-end h-full">
                        <div className="text-mute text-xs min-[480px]:max-md:text-base">LinkedIn</div>
                        <div className="text-fg">@anjanstwt</div>
                    </div>
                </Block>
            </a>

            <a
                href="https://x.com/anjanstwt"
                target="_blank"
                rel="noopener noreferrer"
                className="contents"
            >
                <Block
                    left={
                        <RiTwitterXLine className="size-4.5 p-0.75 bg-fg text-page rounded-[3px]" />
                    }
                    right={<FiArrowUpRight />}
                >
                    <div className="px-3.5 pb-3 flex flex-col justify-end h-full">
                        <div className="text-mute text-xs min-[480px]:max-md:text-base">Twitter / X</div>
                        <div className="text-fg">@anjanstwt</div>
                    </div>
                </Block>
            </a>

            <Block className="col-span-2 max-md:col-span-2">
                <div className="px-3.5 pb-3 flex flex-col justify-end h-full">
                    <div className="text-mute text-xs min-[480px]:max-md:text-base mb-1">Built with</div>
                    <div className="text-fg text-sm">Next.js, Tailwind CSS, and shadcn/ui</div>
                </div>
            </Block>

            <Block className="col-span-2 max-md:col-span-2">
                <div className="px-3.5 pb-3 flex flex-col justify-end h-full">
                    <div className="text-mute text-xs min-[480px]:max-md:text-base mb-1">Design</div>
                    <div className="text-fg text-sm">Pixelated scroll-driven theme</div>
                </div>
            </Block>
        </div>
    );
}
