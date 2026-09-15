"use client";

import Image from "next/image";
import { CgMenuGridO } from "react-icons/cg";
import { TbLocationFilled } from "react-icons/tb";
import Block from "../Block/Block";
import { Globe } from "../ui/globe";
import India from "../../icons/India";
import CopyIconButton from "../CopyIconButton";
import EqualizerBars from "../EqualizerBars";
import { FaSpotify } from "react-icons/fa";
import { useHoverAudio } from "../audio/useHoverAudio";
import SkylineSection from "@/components/Skyline/SkylineSection";

const NOW_PLAYING_SRC = "/audio/my-ordinary-life.mp3";

export default function WhatIDoGrid() {
    const { audioRef, onMouseEnter, onMouseLeave } = useHoverAudio();

    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-4 ">
            <audio ref={audioRef} src={NOW_PLAYING_SRC} preload="none" loop />

            <Block className="col-span-2 row-span-2">
                <Image
                    src="/gallery/cow.jpeg"
                    alt="landscape"
                    fill
                    className="rounded-3xl object-cover"
                />
            </Block>

            <Block
                left={<FaSpotify className="size-4.5 text-[#1ed760] bg-blade rounded-[4px] p-0.75 " />}
                right={<EqualizerBars className="text-[#1ed760] size-3" />}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className="absolute top-10 px-3.5 pb-3 text-xs ">
                    <div className="text-steel">The Living Tombstone</div>
                    <div className="text-neutral-100">My Ordinary Life</div>
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
                        <div className="border border-steel rounded-full size-10 ">
                            
                        </div>
                    </div>
                </div>
            </Block>

            <Block
                left={<TbLocationFilled />}
                right={<India className="size-4 " />}
            >
                <Globe className="top-40 left-1/2 -translate-x-1/2 -translate-y-1/2 w-70 h-70 z-0" />
                <div
                    className={[
                        "relative z-10 min-w-full px-3.5 pb-3",
                        "backdrop-blur-[1px]",
                        "[mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)]",
                        "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)]",
                    ].join(" ")}
                >
                    <div className="text-neutral-100">Kolkata, India</div>
                    <div>15° Patchy rain nearby</div>
                </div>
            </Block>

            <Block className="h-50 flex justify-center items-center ">
                <SkylineSection className="size-90 scale-150 relative top-6 " />
            </Block>

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
