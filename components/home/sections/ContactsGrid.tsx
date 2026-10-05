import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Block from "@/components/home/block/Block";
import Cal from "@/components/icons/Cal";
import ParticleTemple from "@/components/showcase/particles/ParticleTemple";
import { VscGithub } from "react-icons/vsc";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import GithubContribution from "@/components/showcase/GithubContribution";
import { RiTwitterXLine } from "react-icons/ri";

export default function ContactsGrid() {
    return (
        <div className="@container grid grid-cols-4 max-md:grid-cols-2 gap-4 ">
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
                    <div className="px-3.5 pb-3">
                        <div className="text-mute text-xs min-[480px]:max-md:text-base ">Twitter / X</div>
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
                        <FaLinkedinIn className="size-4.5 p-0.75 bg-[#0A66C2] text-neutral-100 rounded-[3px] " />
                    }
                    right={<FiArrowUpRight />}
                >
                    <div className="px-3.5 pb-3">
                        <div className="text-mute text-xs min-[480px]:max-md:text-base ">Linkedin</div>
                        <div className="text-fg">@anjanstwt</div>
                    </div>
                </Block>
            </a>

            <a
                href="https://github.com/anjanstwt"
                target="_blank"
                rel="noopener noreferrer"
                className="contents"
            >
                <Block
                    left={
                        <FaGithub className="size-4.5 text-page bg-fg p-0.75 rounded-[4px] " />
                    }
                    right={<FiArrowUpRight />}
                    className="col-span-2 w-full aspect-auto h-[calc(25cqw-0.75rem)] max-md:h-[calc(50cqw-0.5rem)]"
                >
                    <div className="px-3.5 py-3 ">
                        <GithubContribution className="relative -right-20" />
                        <div className="text-fg">
                            <span className="text-mute text-xs min-[480px]:max-md:text-base">github.com/</span>
                            anjanstwt
                        </div>
                    </div>
                </Block>
            </a>
        </div>
    );
}
