"use client";

import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Block from "../Block/Block";
import { FaStar } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { PiMonitorFill } from "react-icons/pi";
import { useDetailsStore } from "@/store/details.store";
import { DetailPanel } from "@/types/detail.type";

export default function WhatIUseGrid() {
    const open = useDetailsStore((s) => s.open);

    return (
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 ">
            <Block
                left={<PiMonitorFill className="size-4.5 bg-[#FF5900] p-0.75 text-blade rounded-[4px] " />}
                right={<FiArrowUpRight />}
                className="cursor-pointer max-md:order-2"
                onClick={() => open(DetailPanel.Workspace)}
            >
                <div className="bottom-0 px-3.5 pb-3 ">
                    <div className="text-neutral-100 ">Workspace</div>
                    <div className="text-xs min-[480px]:max-md:text-base">2 accessories</div>
                    <Image
                        src="/gallery/macbook.webp"
                        alt="anjan"
                        width={130}
                        height={130}
                        className="scale-[1.30] relative -right-20 -top-1 group-hover:-translate-y-1 duration-300 "
                        unoptimized
                    />
                </div>
            </Block>

            <Block
                left={<GiThreeFriends className="size-4.5 bg-[#0119E1] p-0.75 text-neutral-100 rounded-[4px] " />}
                right={<FiArrowUpRight />}
                className="cursor-pointer max-md:order-3"
                onClick={() => open(DetailPanel.Teammates)}
            >
                <div className="bottom-0 px-3.5 pb-3 ">
                    <div className="relative -top-2.5">
                        <div className="text-neutral-100 ">Teammates</div>
                        <div className="text-xs min-[480px]:max-md:text-base">3 bros</div>
                    </div>
                    <div className="relative -right-23 -top-1 h-[100px] w-[100px] overflow-hidden rounded-xs group-hover:-translate-y-1 duration-300 ">
                        <Image
                            src="/gallery/bros.jpeg"
                            alt="anjan"
                            fill
                            className="object-cover object-center"
                            unoptimized
                        />
                    </div>
                </div>
            </Block>

            <Block className="col-span-2 w-full aspect-[2/1] max-md:order-1">
                <div className="absolute z-10 w-full h-full px-3.5 py-3 ">
                    <div className="w-full flex justify-between items-start">
                        <Image
                            src="/gallery/odyssey.jpeg"
                            alt="anjan"
                            width={42}
                            height={42}
                            className="rounded-xs"
                            unoptimized
                        />
                        <FiArrowUpRight className="text-neutral-100 " />
                    </div>
                    <div className="absolute bottom-3 left-3.5 space-y-2">
                        <div className="flex justify-center items-center gap-x-1">
                            {Array.from({ length: 4 }).map((_i, i) => (
                                <FaStar key={i} className="text-[#F5C518] " />
                            ))}
                            <FaStar className="text-steel " />
                        </div>
                        <div className="space-y-0">
                            <div className="text-xs min-[480px]:max-md:text-base">Recent Watch</div>
                            <div className="text-neutral-100 ">The Odyssey</div>
                        </div>
                    </div>
                </div>
                <video
                    src="/video/odyssey.mp4"
                    poster="/gallery/img24.jpeg"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </Block>
        </div>
    );
}
