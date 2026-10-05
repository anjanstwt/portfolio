"use client";

import Image from "next/image";
import { CgMenuGridO } from "react-icons/cg";
import { TbLocationFilled } from "react-icons/tb";
import Block from "@/components/home/block/Block";
import { Globe } from "@/components/ui/globe";
import India from "@/components/icons/India";
import CopyIconButton from "@/components/ui/CopyIconButton";
import EqualizerBars from "@/components/ui/EqualizerBars";
import { FaSpotify } from "react-icons/fa";
import { useHoverAudio } from "@/hooks/useHoverAudio";
import SkylineSection from "@/components/showcase/particles/SkylineSection";
import ExpandableBlock from "@/components/ui/ExpandableBlock";
import SVG from "@/components/icons/SVG";
import { FiArrowUpRight } from "react-icons/fi";
import HeightNote from "@/components/home/annotations/HeightNote";
import CircleSlash from "@/components/showcase/circle-slash/CircleSlash";

const NOW_PLAYING_SRC = "/audio/my-ordinary-life.mp3";

export default function WhatIDoGrid() {
    const { audioRef, onMouseEnter, onMouseLeave } = useHoverAudio();

    return (
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 ">
            <audio ref={audioRef} src={NOW_PLAYING_SRC} preload="none" loop />

            <HeightNote className="col-span-2 row-span-2 max-md:order-3">
                <ExpandableBlock className="h-full">
                    <Block>
                        <Image
                            src="/gallery/cow.jpeg"
                            alt="landscape"
                            fill
                            className="rounded-3xl object-cover"
                        />
                    </Block>
                </ExpandableBlock>
            </HeightNote>

            <a href="https://winterfell.dev" className="contents">
                <Block
                    left={
                        <SVG
                            type="winterfell"
                            className="bg-[#6c44fc] rounded-[4px] p-[0.75px] "
                            color="white"
                        />
                    }
                    right={<FiArrowUpRight className="text-fg " />}
                    className="max-md:order-1"
                >
                    <CircleSlash />
                    <div
                        className={[
                            "relative z-10 min-w-full px-3.5 pb-3 ",
                            "backdrop-blur-[1px]",
                            "[mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                            "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                        ].join(" ")}
                    >
                        <div className="text-fg ">Winterfell</div>
                        <div className="text-steel text-xs ">
                            AI-built Solana contracts
                        </div>
                    </div>
                </Block>
            </a>
            <a href="https://nocturn.anjan.site" target="_blank" className="contents">
                <Block
                    left={
                        <SVG
                            type="nocturn"
                            className="bg-blade rounded-[4px] p-0.5 "
                            color="white"
                        />
                    }
                    right={<FiArrowUpRight className="text-blade " />}
                    className="max-md:order-2"
                >
                    <Image
                        src="/gallery/blackcat.jpeg"
                        alt="Winterfell"
                        fill
                        className="rounded-3xl object-cover object-[center_5%]"
                    />
                    <div
                        className={[
                            "relative z-10 min-w-full px-3.5 pb-3 ",
                            "backdrop-blur-[1px]",
                            "[mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                            "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                        ].join(" ")}
                    >
                        <div className="text-blade ">Nocturn</div>
                        <div className="text-steel text-xs ">
                            zero trust quiz platform
                        </div>
                    </div>
                </Block>
            </a>

            <Block
                left={
                    <FaSpotify className="size-4.5 text-[#1ed760] bg-blade rounded-[4px] p-0.75 " />
                }
                right={<EqualizerBars className="text-[#1ed760] size-3" />}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="max-md:order-4"
            >
                <div className="absolute top-10 px-3.5 pb-3 text-xs min-[480px]:max-md:text-base ">
                    <div className="text-mute">The Living Tombstone</div>
                    <div className="text-fg">My Ordinary Life</div>
                </div>
                <div className="absolute -bottom-24">
                    <Image
                        src="/gallery/img34.jpeg"
                        alt="landscape"
                        className="rounded-full [animation:spin_35s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]"
                        height={270}
                        width={270}
                    />
                    <div className="absolute z-10 size-20 top-1/2 left-1/2 -translate-1/2 rounded-full bg-blade border-2 border-blade/50 p-2 flex justify-center items-center ">
                        <div className="border border-steel rounded-full size-10 "></div>
                    </div>
                </div>
            </Block>

            <Block className="flex justify-center items-center max-md:order-5">
                <SkylineSection className="size-90 scale-150 relative top-6 light:invert" />
            </Block>
        </div>
    );
}
