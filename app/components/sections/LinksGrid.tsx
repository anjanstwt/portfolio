import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Block from "../Block/Block";
import ParticleTemple from "@/components/Temple/ParticleTemple";
import SVG from "../../icons/SVG";
import Safari from "@/components/ui/Safari";
import { HiArrowSmallDown } from "react-icons/hi2";
import GithubActivityLine from "../github/GithubActivityLine";
import { cn } from "cn";
import { satisfy } from "@/lib/fonts";

export default function LinksGrid() {
    
    return (
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 ">
            <a
                href="https://cal.com/anjanstwt"
                target="_blank"
                rel="noopener noreferrer"
                className="contents"
            >
                <Block
                    left={
                        <SVG type="cal" className="rounded-[4px] p-[0.5px]" />
                    }
                    right={<FiArrowUpRight />}
                >
                    <div className="px-3.5 pb-3 text-neutral-100">
                        <span className="text-steel">cal.com/</span>anjanstwt
                    </div>
                </Block>
            </a>

            <Block>
                <ParticleTemple className="size-full " />
            </Block>

            <Block
                left={
                    <Image
                        src="/images/pfp.png"
                        alt="profile"
                        height={18}
                        width={18}
                        className="rounded-xs "
                        unoptimized
                    />
                }
                className="col-span-2 w-full aspect-[2/1]"
            >
                {/*<div className="px-3.5 py-3 ">
                    <div className="text-neutral-100 flex justify-center items-center gap-x-1 text-xs min-[480px]:max-md:text-base ">
                        <span>Projects</span>
                        <HiArrowSmallDown className="size-3.5 transition-transform group-hover:translate-y-1 "/>
                    </div>
                </div>*/}
                {/*<Safari
                    size="210"
                    className="absolute -bottom-9 -right-8 border-[0.5px] transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 "
                    url={"anjan.site"}
                >
                    <div className="flex justify-center items-baseline ">
                        <ParticleTemple className="size-180 " />
                    </div>
                </Safari>*/}
                {/*<GithubActivityLine username="anjanstwt" className="absolute bottom-10 -right-50 " />*/}

                {/* Desktop: Projects. Swaps with AboutGrid's Malshej Ghat block below md. */}
                <div className="max-md:hidden contents">
                    <div className="px-3.5 pb-3 w-full flex justify-end items-end ">
                        <div className={cn("text-neutral-100 text-[40px] min-[480px]:max-md:text-[64px] flex justify-center items-center gap-x-2 ", satisfy.className)}>
                            <span>Projects</span>
                            <HiArrowSmallDown className="size-6 transition-transform group-hover:translate-y-1 "/>
                        </div>
                    </div>
                </div>

                {/* Below md: Malshej Ghat swaps in here instead. */}
                <div className="hidden max-md:contents">
                    <div className="px-3.5 py-3 text-xs min-[480px]:max-md:text-base">
                        <div className="text-neutral-100 ">Malshej Ghat</div>
                        <div>Pune, India</div>
                    </div>
                    <div className="absolute -right-12 bottom-0 h-44 w-80 rounded-tl-sm overflow-hidden">
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <video
                            src="/video/video1.mp4"
                            poster="/gallery/img24.jpeg"
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </div>
                </div>
            </Block>
        </div>
    );
}
