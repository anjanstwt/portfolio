import Image from "next/image";
import { CgMenuGridO } from "react-icons/cg";
import { TbLocationFilled } from "react-icons/tb";
import Block from "../Block/Block";
import { Globe } from "../ui/globe";
import India from "../../icons/India";
import CopyIconButton from "../CopyIconButton";
import {
    RiArchiveDrawerFill,
    RiDraftFill,
    RiTwitterXLine,
} from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { satisfy } from "@/lib/fonts";
import { cn } from "cn";
import ExpandableBlock from "../ExpandableBlock";
import { RiQuillPenFill } from "react-icons/ri";
import { PiLampPendantFill } from "react-icons/pi";

export default function PagesGrid() {
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-4 ">
            <ExpandableBlock className="col-span-2 row-span-2">
                <Block>
                    <Image
                        src="/gallery/scratchingcat.jpeg"
                        alt="landscape"
                        fill
                        className="rounded-3xl object-cover"
                    />
                </Block>
            </ExpandableBlock>
            <a href="/assets" rel="noopener noreferrer" className="contents">
                <Block
                    left={
                        <PiLampPendantFill className="size-4.5 p-0.75 bg-neutral-100 text-blade rounded-[3px]" />
                    }
                    right={<FiArrowUpRight />}
                >
                    <div className="px-3.5 pb-3 w-full flex justify-end items-end ">
                        <div
                            className={cn(
                                "text-neutral-100 text-[40px] ",
                                satisfy.className,
                            )}
                        >
                            Assets
                        </div>
                    </div>
                </Block>
            </a>

            <a href="/blogs" rel="noopener noreferrer" className="contents">
                <Block
                    left={
                        <RiQuillPenFill className="size-4.5 p-0.75 bg-neutral-100 text-blade rounded-[3px] " />
                    }
                    right={<FiArrowUpRight />}
                >
                    <div className="px-3.5 pb-3 w-full flex justify-end items-end ">
                        <div
                            className={cn(
                                "text-neutral-100 text-[40px] ",
                                satisfy.className,
                            )}
                        >
                            Blogs
                        </div>
                    </div>
                </Block>
            </a>

            <ExpandableBlock>
                <Block>
                    <Image
                        src="/gallery/xdcat.jpeg"
                        alt="landscape"
                        fill
                        className="rounded-3xl object-cover"
                    />
                </Block>
            </ExpandableBlock>

            <Block
                left={<CgMenuGridO />}
                right={<CopyIconButton text="@anjanstwt" />}
            >
                <div className="px-3.5 pb-3">
                    <div className="text-steel">Twitter / X</div>
                    <div className="text-neutral-100">@anjanstwt</div>
                </div>
            </Block>
        </div>
    );
}
