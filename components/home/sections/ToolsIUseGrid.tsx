"use client";

import Image from "next/image";
import { CgMenuGridO } from "react-icons/cg";
import { TbLocationFilled } from "react-icons/tb";
import Block from "@/components/home/block/Block";
import { Globe } from "@/components/ui/globe";
import India from "@/components/icons/India";
import CopyIconButton from "@/components/ui/CopyIconButton";
import { LuMonitor } from "react-icons/lu";
import { FiArrowUpRight } from "react-icons/fi";
import { SiBetterstack } from "react-icons/si";
import { BsWindowStack } from "react-icons/bs";
import { LuAppWindowMac } from "react-icons/lu";
import { Claude } from "@thesvg/react";
import { MdCandlestickChart } from "react-icons/md";
import { PiTerminalBold } from "react-icons/pi";
import ExpandableBlock from "@/components/ui/ExpandableBlock";
import ExpandableImage from "@/components/ui/ExpandableImage";
import { useDetailsStore } from "@/store/details.store";
import { DetailPanel } from "@/types/detail.type";

export default function ToolsIUseGrid() {
    const open = useDetailsStore((s) => s.open);

    return (
        <div className="@container grid grid-cols-4 max-md:grid-cols-2 gap-4 ">
            <Block
                left={
                    <SiBetterstack className="size-4.5 bg-[#6AFF38] p-0.75 text-blade rounded-[4px] " />
                }
                right={<FiArrowUpRight />}
                className="cursor-pointer"
                onClick={() => open(DetailPanel.Stack)}
            >
                <div className="absolute top-7.5 px-3.5 py-3 ">
                    <div className="text-neutral-100 ">Stack</div>
                    <div className="text-xs min-[480px]:max-md:text-base">2 tech</div>
                </div>
                <div className="bottom-0 px-3.5 pb-3 ">
                    <Image
                        src="/gallery/keyboard.avif"
                        alt="anjan"
                        width={130}
                        height={130}
                        className="scale-[1.30] relative -right-20 -top-1 group-hover:-translate-y-1 duration-300 "
                        unoptimized
                    />
                </div>
            </Block>

            <Block
                left={
                    <PiTerminalBold className="size-4.5 bg-neutral-100 p-0.75 text-blade rounded-[4px] " />
                }
                right={<FiArrowUpRight />}
                className="cursor-pointer"
                onClick={() => open(DetailPanel.Application)}
            >
                <div className="px-3.5 pb-3 ">
                    <div className="relative -top-2.5 ">
                        <div className="text-neutral-100 ">Application</div>
                        <div className="text-xs min-[480px]:max-md:text-base">5 tools</div>
                    </div>
                    <Claude className="size-25 relative -right-20 top-2 p-3 group-hover:-translate-y-1 duration-300" />
                </div>
            </Block>

            <ExpandableBlock className="col-span-2 row-span-2">
                <Block>
                    <Image
                        src="/gallery/img33.jpeg"
                        alt="landscape"
                        fill
                        className="rounded-3xl object-cover"
                        unoptimized
                    />
                </Block>
            </ExpandableBlock>

            <Block
                left={
                    <MdCandlestickChart className="size-4.5 p-.75 bg-neutral-100 text-blade rounded-[4px] " />
                }
                className="col-span-2 w-full aspect-auto h-[calc(25cqw-0.75rem)] max-md:h-[calc(50cqw-0.5rem)]"
            >
                <div className="px-3.5 py-3 text-xs min-[480px]:max-md:text-base">
                    <div className="text-neutral-100 ">Architecture</div>
                    <div>used at scale</div>
                </div>
                <ExpandableImage
                    src="/gallery/infrastructure.png"
                    alt="infrastructure"
                    width={2940}
                    height={1846}
                    className="absolute -right-12 bottom-0 h-44 w-80 rounded-tl-sm overflow-hidden"
                    imageClassName="object-cover -translate-x-3 "
                />
            </Block>
        </div>
    );
}
