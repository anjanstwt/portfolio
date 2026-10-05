import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Block from "@/components/home/block/Block";
import SVG from "@/components/icons/SVG";
import { MdCandlestickChart } from "react-icons/md";
import MarginNote from "@/components/home/annotations/MarginNote";
import CapsuleStack from "@/components/showcase/capsule-stack/CapsuleStack";
import FloatingDiscs from "@/components/showcase/floating-discs/FloatingDiscs";
import { satisfy } from "@/lib/fonts";

export default function AboutGrid() {
    return (
        <div className="@container relative grid grid-cols-4 max-md:grid-cols-2 gap-4 ">
            <Block
                left={
                    <Image
                        src="/images/pfp.png"
                        alt="profile"
                        height={16}
                        width={16}
                        className="rounded-xs "
                        unoptimized
                    />
                }
                className="col-span-2 w-full aspect-auto h-[calc(25cqw-0.75rem)] max-md:h-[calc(50cqw-0.5rem)]"
            >
                <div className="max-md:hidden contents">
                    <div className="px-3.5 py-3 text-xs min-[480px]:max-md:text-base">
                        <div className="text-fg ">Malshej Ghat</div>
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

                {/* Below md: Projects swaps in here instead. */}
                <div className="hidden max-md:contents">
                    <CapsuleStack label="Darwin" labelClassName={satisfy.className} />
                </div>
            </Block>

            <Block
                left={
                    <SVG
                        type="matcha"
                        className="bg-white rounded-[4px] p-[0.75px] "
                        color="black"
                    />
                }
                right={<FiArrowUpRight className="text-neutral-100 " />}
            >
                <Image
                    src="/gallery/lugia.jpeg"
                    alt="Winterfell"
                    fill
                    className="rounded-3xl object-cover"
                />
                <div
                    className={[
                        "relative z-10 min-w-full px-3.5 pb-3 ",
                        "backdrop-blur-[1px]",
                        "[mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                        "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                    ].join(" ")}
                >
                    <div className="text-neutral-100 ">Darwin</div>
                    <div className="text-steel text-xs min-[480px]:max-md:text-base">
                        agent collaborated kanban
                    </div>
                </div>
            </Block>

            <a href="https://github.com/anjanstwt/order-book" target="_blank" className="contents">
                <Block
                    left={
                        <MdCandlestickChart className="size-4.5 p-.75 bg-[#FF5900] text-neutral-100 rounded-[4px] " />
                    }
                    right={<FiArrowUpRight className="text-blade " />}
                    className="bg-[#e6e6e6]"
                >
                    <FloatingDiscs />
                    <div
                        className={[
                            "relative z-10 min-w-full px-3.5 pb-3 ",
                            "backdrop-blur-[1px]",
                            "[mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                            "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                        ].join(" ")}
                    >
                        <div className="text-blade ">OrderBook</div>
                        <div className="text-steel text-xs min-[480px]:max-md:text-base">
                            low latency engine in rust
                        </div>
                    </div>
                </Block>
            </a>
            <MarginNote label="shipped projects" className="-top-[calc(100%+1rem)] h-[calc(300%+2rem)]" />
        </div>
    );
}
