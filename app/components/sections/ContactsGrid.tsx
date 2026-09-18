import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Block from "../Block/Block";
import Cal from "../../icons/Cal";
import ParticleTemple from "@/components/Temple/ParticleTemple";
import { VscGithub } from "react-icons/vsc";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import GithubContribution from "@/components/Contact/GithubContribution";
import { RiTwitterXLine } from "react-icons/ri";

export default function ContactsGrid() {
    return (
        <div className="grid grid-cols-4 max-[894px]:grid-cols-2 gap-4 ">
            <a
                href="https://x.com/anjanstwt"
                target="_blank"
                rel="noopener noreferrer"
                className="contents"
            >
                <Block
                    left={
                        <RiTwitterXLine className="size-4.5 p-0.75 bg-blade text-neutral-100 rounded-[3px]" />
                    }
                    right={<FiArrowUpRight />}
                >
                    <div className="px-3.5 pb-3">
                        <div className="text-steel text-xs max-[894px]:text-base ">Twitter / X</div>
                        <div className="text-neutral-100">@anjanstwt</div>
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
                        <div className="text-steel text-xs max-[894px]:text-base ">Linkedin</div>
                        <div className="text-neutral-100">@anjanstwt</div>
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
                        <FaGithub className="size-4.5 text-blade bg-neutral-100 p-0.75 rounded-[4px] " />
                    }
                    right={<FiArrowUpRight />}
                    className="col-span-2 w-full aspect-[2/1]"
                >
                    <div className="px-3.5 py-3 ">
                        <GithubContribution className="relative -right-20" />
                        <div className="text-neutral-100">
                            <span className="text-steel text-xs max-[894px]:text-base">github.com/</span>
                            anjanstwt
                        </div>
                    </div>
                </Block>
            </a>
        </div>
    );
}
