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
        <div className="grid grid-cols-4 max-[894px]:grid-cols-2 gap-4 ">
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
                    <div className="text-neutral-100 flex justify-center items-center gap-x-1 text-xs max-[894px]:text-base ">
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
                <div className="px-3.5 pb-3 w-full flex justify-end items-end ">
                    <div className={cn("text-neutral-100 text-[40px] max-[894px]:text-[64px] flex justify-center items-center gap-x-2 ", satisfy.className)}>
                        <span>Projects</span>
                        <HiArrowSmallDown className="size-6 transition-transform group-hover:translate-y-1 "/>
                    </div>
                </div>
            </Block>
        </div>
    );
}
