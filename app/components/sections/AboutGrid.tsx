import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Block from "../Block/Block";
import SVG from "../../icons/SVG";
import { MdCandlestickChart } from "react-icons/md";

export default function AboutGrid() {
    return (
        <div className="grid grid-cols-4 max-[894px]:grid-cols-2 gap-4 ">
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
                className="col-span-2 w-full aspect-[2/1]"
            >
                <div className="px-3.5 py-3 text-xs max-[894px]:text-base">
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
                    <div className="text-steel text-xs max-[894px]:text-base">
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
                >
                    <Image
                        src="/gallery/swimmingcat.jpeg"
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
                        <div className="text-blade ">OrderBook</div>
                        <div className="text-steel text-xs max-[894px]:text-base">
                            low latency engine in rust
                        </div>
                    </div>
                </Block>
            </a>
        </div>
    );
}
